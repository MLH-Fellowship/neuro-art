import os,sys
from flask import Flask,escape,request,Response,g,make_response
from flask.templating import render_template
from firebase_admin import credentials, initialize_app, storage, firestore
from backend.model import nst

# real_path = os.path.dirname(os.path.realpath(__file__))
# sub_path = "/".join(real_path.split("/")[:-1])
#
# os.chdir(sub_path)

# Initialize Flask application.
app=Flask(__name__)
app.debug=True

# Initialize firebase application.
cred = credentials.Certificate(os.path.join(app.root_path, 'keyfiles', 'cred.json'))
initialize_app(cred, {'storageBucket': 'mlh-neuro-art.appspot.com'})
firestore_client = firestore.client()
image_collection = firestore_client.collection('images')

def root_path():
    '''root directory'''
    real_path = os.path.dirname(os.path.realpath(__file__))
    sub_path = "/".join(real_path.split("/")[:-1])
    return os.chdir(sub_path)


@app.route('/')
def index():
    return render_template('index.html')

''' Neural Style Transfer '''
@app.route('/nst_get')
def nst_get():
	return render_template('nst_get.html')

@app.route('/nst_post',methods=['GET','POST'])
def nst_post():
    if request.method =='POST':
        # Reset the current working directory.
        root_path()

        # Create a reference to the cloud storage bucket.
        bucket = storage.bucket()

        # Reference Image
        refer_img = request.form['refer_img']
        refer_img_path = '/images/nst_get/' +str(refer_img)

        # User Image
        user_img = request.files['user_img']
        user_img.save('./backend/static/images/'+ str(user_img.filename))
        user_img_path = '/images/'+str(user_img.filename)
        user_img_abs_path = f'{app.root_path}/static/images/{user_img.filename}' 

        # Create and upload the blob containing the user image.
        blob = bucket.blob(user_img.filename)
        blob.upload_from_filename(user_img_abs_path)
        blob.make_public()

        # Neural Style Transfer
        transfer_img = nst.main(refer_img_path,user_img_path)
        transfer_img_path = '/images/__nst_results/' +str(transfer_img.split('/')[-1])
        transfer_img_abs_path = f'{app.root_path}/static{transfer_img_path}'

        # Save the result to firebase storage.
        result_blob = bucket.blob(f'result_{user_img.filename}')
        result_blob.upload_from_filename(transfer_img_abs_path)
        result_blob.make_public()

        # Construct and upload the data for this transaction.
        data = {
            'target_image': blob.public_url,
            'result_image': result_blob.public_url,
            'style_image' : refer_img
        }
        doc_ref = image_collection.document()
        doc_ref.set(data)
        print(doc_ref.id)

        render_template('nst_post.html',
                        refer_img = refer_img_path,
                        user_img  = user_img_path,
                        transfer_img = transfer_img_path)