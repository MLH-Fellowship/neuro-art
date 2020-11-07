import numpy as np
from tensorflow.keras.preprocessing.image import load_img,img_to_array,save_img
from tensorflow.keras.applications import vgg19
from tensorflow.keras import backend as K 
from scipy.optimize import fmin_l_bfgs_b
import time
import os



print(os.getcwd())

def preprocess_image(image_path):
	img = load_img(image_path, target_size=(img_height, img_width)) # (400, 381)
	# The img_to_array() function adds channels: x.shape = (224, 224, 3) for RGB and (224, 224, 1) for gray imag
	img = img_to_array(img) 			# (400, 381, 3)
	# expand_dims() is used to add the number of images: x.shape = (1, 224, 224, 3)
	img = np.expand_dims(img, axis=0) 	# (1, 400, 381, 3)
	#preprocess_input() subtracts the mean RGB channels of the imagenet dataset. 
	# This is because the model you are using has been trained on a different dataset: x.shape is still (1, 224, 224, 3)
	img = vgg19.preprocess_input(img)

	return img 

def deprocess_image(x):
	'''vgg19.preprocess_input()'''

	x[:, :, 0] += 103.939
	x[:, :, 1] += 116.779
	x[:, :, 2] += 123.68
	# BGR -> RGB( )
	x = x[:, :, ::-1]
	x = np.clip(x, 0, 255).astype('uint8')

	return x 

def content_loss(base, combination):

	return K.sum(K.square(combination - base))

def gram_matrix(x):

	features = K.batch_flatten(K.permute_dimensions(x,(2,0,1)))
	gram = K.dot(features, K.transpose(features))

	return gram

def style_loss(style, combination):

	S = gram_matrix(style)
	C = gram_matrix(combination)
	channels = 3
	size = img_height * img_width

	return K.sum(K.square(S-C))/(4.*(channels**2)*(size**2))

def total_variation_loss(x):

	a = K.square(x[:, :img_height - 1, :img_width - 1, :] - x[:, 1:, :img_width - 1, :])
	b = K.square(x[:, :img_height - 1, :img_width - 1, :] - x[:, :img_height - 1, 1:, :])
	return K.sum(K.pow(a + b, 1.25))

class Evaluator(object):

	def __init__(self):
		self.loss_value = None
		self.grads_values = None

	def loss(self, x):
		assert self.loss_value is None
		x = x.reshape((1, img_height, img_width, 3))
		outs = fetch_loss_and_grads([x])
		loss_value = outs[0]
		grad_values = outs[1].flatten().astype('float64')
		self.loss_value = loss_value
		self.grad_values = grad_values
		return self.loss_value

	def grads(self, x):
		assert self.loss_value is not None
		grad_values = np.copy(self.grad_values)
		self.loss_value = None
		self.grad_values = None
		return grad_values





def main(refer_img_path, target_img_path):
    refer_img_path = refer_img_path.split('/')[-1]
    target_img_path = target_img_path.split('/')[-1]
    
    style_reference_image_path = 'static/images/nst_get/' + refer_img_path
    target_image_path = 'static/images/' + target_img_path

    width, height = load_img(target_image_path).size
    global img_height
    global img_width
    image_height = 400
    image_width = int(width*img_height/height)

    target_image = K.constant(preprocess_image(target_image_path)) # creates image to a constant tensor
    style_reference_image = K.constant(preprocess_image(style_reference_image_path))
    combination_image = K.placeholder((1,img_height,img_width,3))

    input_tensor = K.concatenate([target_image,style_reference_image,combination_iamge],axis=0)

    model = vgg19.VGG19(input_tensor = input_tensor,
    weights = 'imagenet',
    include_top = False)


    outputs_dict = dict([(layer.name,layer.output) for layer in model.layers])

    content_layer = 'block5_conv2'
    style_layers = ['block1_conv1',
                    'block3_conv1',
                    'block4_conv1',
                    'block5_conv1']


    total_variation_weight = 1e-4
    style_weight = 1e-4
    style_weight = 1.
    content_weight = 0.025


    loss = K.variable(0.)
    layer_features = outputs_dict[content_layer]
    target_image_features = layer_features[0,:,:,:]
    combination_features = layer_features[2,:,:,:]

    loss = loss + (content_weight * content_loss(target_image_features, combination_features))


    for layer_name in style_layers:
        layer_features = outputs_dict[layer_name]
        style_reference_features = layer_features[1,:,:,:]
        combination_features = layer_features[2,:,:,:]
        sl = style_loss(style_reference_features,combination_features)
        loss = loss + ((style_weight / len(style_layers))*s1)

    loss = loss + (total_variation_weight * total_variation_loss(combination_image))

    grads = K.gradients(loss,combination_image)[0]

    global fetch_loss_and_grads

    fetch_loss_and_grads = K.function([combination_image],[loss,grads])

    evaluator = Evaluator()
    refer_img_name = refer_img_path.split(',')[0].split('/')[-1]
    result_prefix = 'static/images/nst_get' + refer_img_name
    iterations = 20

    x = preprocess_image(target_image_path)
    x = x.flatten()
    for i in range(iterations):
        print('Number of Iterations: ',i)
        x,min_val,info = fmin_l_bfgs_b(evaluator.loss,x,fprime=evaluator.grads, maxfun=20)

        print('Current Loss value',min_val)

        img = x.copy().reshape((img_height, img_width,3))
        img = deprocess_image(img)
        fname = result_prefix + '.jpg'
    
    save_img(fname,img)
    return fname


if __name__ == "__main__":
    main()