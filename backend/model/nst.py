import tensorflow as tf
from tensorflow.keras.preprocessing.image import load_img,img_to_array,save_img
from tensorflow.keras.applications import vgg19
from os import path
import numpy as np
import PIL.Image
import time
import functools
import time

gpus = tf.config.experimental.list_physical_devices('GPU')
if gpus:
  try:
    for gpu in gpus:
      tf.config.experimental.set_memory_growth(gpu, True)
    logical_gpus = tf.config.experimental.list_logical_devices('GPU')
    print(len(gpus), "Physical GPUs, ", len(logical_gpus), "Logical GPUs")
  except RuntimeError as e:
    print(e)

def tensor_to_image(tf_input):
  '''
  Converts a numerical input into an RGB image.

  :params:
  tf_input : A numerical array

  :returns: 
  Numerical array converted to an RGB image

  '''
  tf_input = tf_input*255
  tf_input = np.array(tf_input,dtype=np.uint8)
  if np.ndim(tf_input)>3:
    assert tf_input.shape[0] ==1
    tf_input = tf_input[0]
  return PIL.Image.fromarray(tf_input)


def load_img(image_path):
  '''
  Loads an image from the given image path. Image is resized to match the scale (max_dim/long_dim).

  :params:
  image_path : the path to an image we want to load

  :returns:
  A resized image
  '''

  max_dim = 512
  img = tf.io.read_file(image_path)
  img = tf.image.decode_image(img,channels=3) # Detects the image to perform apropriate opertions
  img = tf.image.convert_image_dtype(img,tf.float32) # Convert image to tensor dtype

  shape = tf.cast(tf.shape(img)[:-1], tf.float32)

  long_dim = max(shape)
  scale = max_dim/long_dim
  new_shape = tf.cast(shape*scale,tf.int32)

  img = tf.image.resize(img,new_shape)
  return img[tf.newaxis,:]

def vgg_layers(layer_names):
  ''' 
  Loading a pre-trained VGG 19 model from Keras. We will be using a custom input for the model therefore
  include_top is set as 'False'. We are also using weights from 'imagenet'.
  Lastly we are not retraining the pretrained layers of our model, therefore vgg.trainable is set to 'False'
  
  :params:
  layer_names : list of layers we want to cherry pick from the VGG model. (for e.g ['block1_conv1', 'block2_conv1', 'block3_conv1', 'block4_conv1', 'block5_conv1'])

  returns:
  A keras model wtih the selected inputs and ouputs.
  '''
  vgg = tf.keras.applications.VGG19(include_top = False,weights = 'imagenet')
  vgg.trainable = False
  tf_outs = [vgg.get_layer(layer).output for layer in layer_names]

  model = tf.keras.Model([vgg.input],tf_outs)
  return model

def gram_matrix(input_tensor):
  '''
  Uses the stylish features are present in image weights, textures, and shapes.
  The Gram Matrix G is the set of vectors in a matrix of dot products. 
  For a particular layer, the diagonal elements of the matrix will find how active the filter is. 
  An active filter will help the model find wether it contains more horizontal lines, vertical lines, or textures.

  To get the results, the matrix is multiplied by its transposed matrix. 
  
  :params:
  input_tensor : tensor form of our image in order to identify the the features.
  
  :returns:
  Einstein Summation / number of locations
  '''
  result = tf.linalg.einsum('bijc,bijd->bcd',input_tensor,input_tensor) # Einstein summation
  input_shape = tf.shape(input_tensor) # get the shape of the tensor [x,y]
  num_locations = tf.cast(input_shape[1]*input_shape[2],tf.float32) # Casting the input shape to num_locations as float32
  return result/(num_locations) 

class StyleContentModel(tf.keras.models.Model): 
  '''
  A model that returns the style and content loss values when called.
  '''
  def __init__(self,style_layers,content_layers):
    '''
    Intializes the following parameters:
    vgg : selected layers from the pretrained vgg model
    style_layers : layers used for for the style image
    content_layers: single layer used for the content image
    num_style_layers : length of style_layers list.
    vgg.trainable : Set to False, we are not retraining the previous model.
    '''
    super(StyleContentModel,self).__init__()
    self.vgg = vgg_layers(style_layers+content_layers)
    self.style_layers = style_layers
    self.content_layers = content_layers
    self.num_style_layers = len(style_layers)
    self.vgg.trainanble = False


  def call(self,inputs):
    "Expects float input in [0,1]"
    inputs = inputs*(255.0)
    preprocessed_input = tf.keras.applications.vgg19.preprocess_input(inputs)
    outputs = self.vgg(preprocessed_input)
    style_outputs, content_outputs = (outputs[:self.num_style_layers],
                                     outputs[self.num_style_layers:])
    style_outputs = [gram_matrix(style_output)
                    for style_output in style_outputs]

    content_dict = {content_name : value
                    for content_name,value
                    in zip(self.content_layers,content_outputs)}

    style_dict = {style_name:value
                  for style_name,value
                  in zip(self.style_layers,style_outputs)}
    return {'content': content_dict,'style': style_dict}



def clip_0_1(image):
  '''
  Limit our image between 0 and 1
  '''
  return tf.clip_by_value(image,clip_value_min=0.0,clip_value_max=1.0)


def style_content_loss(outputs):
  '''
  Computes the main loss function using the values from the style and content loss values.
  
  :params:
  outputs: a dict with keys 'style' and 'content'
  
  :returns:
  loss : loss function which is the sum of the style loss and content loss
  '''
  style_outputs = outputs['style']
  content_outputs = outputs['content']
  style_loss = tf.add_n([tf.reduce_mean((style_outputs[name]-style_targets[name])**2)
                        for name in style_outputs.keys()])
  style_loss *= style_weight/num_style_layers

  content_loss = tf.add_n([tf.reduce_mean((content_outputs[name]-content_targets[name])**2)
                          for name in content_outputs.keys()])

  content_loss *=content_weight/num_content_layers
  loss = style_loss + content_loss
  return loss
  

# @tf.function()
def train_step(image):
  ''' 
  Calculating the loss function and applyinbg it to our image to transfer the style.
  
  :params:
  image : input image for style transfer 
  '''
  with tf.GradientTape() as tape:
      outputs = extractor(image)
      loss = style_content_loss(outputs)
      loss += total_variation_weight*tf.image.total_variation(image)

  grad = tape.gradient(loss, image)
  opt.apply_gradients([(grad, image)])
  image.assign(clip_0_1(image))

def high_pass_x_y(image):
  ''' 
  Adds total variation loss to reduce the high frequency artifacts. 
  Applies high frequency explicit regularization term on the high 
  frequency components of the image.'''
  
  x_var = image[:,:,1:,:] - image[:,:,:-1,:]
  y_var = image[:,1:,:,:] - image[:,:-1,:,:]
  return x_var, y_var


def total_variation_loss(image):
  '''
  Optimizes the squared value by finding the rate of change of edges with high_pass_x_y.
  '''
  x_deltas, y_deltas = high_pass_x_y(image)
  return tf.reduce_sum(tf.abs(x_deltas)) + tf.reduce_sum(tf.abs(y_deltas))


def main(refer_img_path, target_img_path, result_folder):

    global num_content_layers 
    global num_style_layers 

    global style_targets
    global content_targets

    global style_weight 
    global content_weight 

    global extractor 

    global total_variation_weight
    global opt
   
    target_img = load_img(target_img_path)
    style_reference_image_path = load_img(refer_img_path)

    # Most Commonly used layers for Neural Style Transfer
    content_layers = ['block5_conv2']
    style_layers = ['block1_conv1','block2_conv1','block3_conv1','block4_conv1','block5_conv1']

    num_content_layers=len(content_layers)    
    num_style_layers= len(style_layers)

    style_extractor = vgg_layers(style_layers)
    style_outputs = style_extractor(style_reference_image_path*255)


    extractor = StyleContentModel(style_layers,content_layers)
    results = extractor(tf.constant(target_img))
    
    style_targets = extractor(style_reference_image_path)['style']
    content_targets = extractor(target_img)['content']
    
    total_variation_weight=30

    # The tf.variables are used to assign biases and weights throughout the training session. 
    image = tf.Variable(target_img)
    
    # Use Adam as an optimizer, can also use 'L-BFGS-B' optimizer which is available as part of the scipy library
    opt = tf.optimizers.Adam(learning_rate = 0.02, # hyper paramter (learning rate alpha)
                             beta_1=0.99,
                             epsilon=1e-1)
    
    style_weight =1e-2 # Hyper paramter 
    content_weight= 1e4 # Hyper paramter

    epochs = 5 # Hyper parameter
    steps_per_epoch = 10 # Hyper paramter
    # number of iterations = 5*10

    for n in range(epochs):
      for m in range(steps_per_epoch):
        train_step(image)

    img = tensor_to_image(image)
    result_path = path.join(result_folder, 'result_' + path.basename(target_img_path))
    save_img(result_path, img)

    return result_path


if __name__ == "__main__":
    main()
