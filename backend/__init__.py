import os,sys
from flask import Flask,escape,request,Response,g,make_response
from flask_cors import CORS
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
CORS(app)

# Temporary image storage directory.
tmp_folder = os.path.join(app.static_folder, "images", 'tmp')
if not os.path.exists(tmp_folder):
    os.mkdir(tmp_folder)

# Initialize firebase application.
cred = credentials.Certificate(os.path.join(app.root_path, 'keyfiles', 'cred.json'))
initialize_app(cred, {'storageBucket': 'mlh-neuro-art.appspot.com'})
firestore_client = firestore.client()
image_collection = firestore_client.collection('images')

# def root_path():
#     '''root directory'''
#     real_path = os.path.dirname(os.path.realpath(__file__))
#     sub_path = "\\".join(real_path.split("\\")[:-1])
#     return os.chdir(sub_path)


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
        # root_path()

        # Create a reference to the cloud storage bucket and a reference to the document in firestore.
        bucket = storage.bucket()
        doc_ref = image_collection.document()

        # Reference Image
        refer_img = request.form['selected_artist']
        refer_img_path = os.path.join(tmp_folder, "nst_get", f'nst_reference{refer_img}.JPG')

        # User Image
        user_img = request.files['target_image']
        image_extension = os.path.splitext(user_img.filename)[1]
        working_filename = doc_ref.id + image_extension
        user_img_path = os.path.join(tmp_folder, working_filename) 
        user_img.save(user_img_path)

        # Create and upload the blob containing the user image.
        blob = bucket.blob(working_filename)
        blob.upload_from_filename(user_img_path)
        blob.make_public()

        # Neural Style Transfer
        transfer_img_path = nst.main(refer_img_path, user_img_path, tmp_folder)

        # Save the result to firebase storage.
        result_blob = bucket.blob(f'result_{working_filename}')
        result_blob.upload_from_filename(transfer_img_path)
        result_blob.make_public()

        # Construct and upload the data for this transaction.
        db_data = {
            'target_image': blob.public_url,
            'result_image': result_blob.public_url,
            'style_image' : refer_img
        }
        doc_ref.set(db_data)

        # Collate and send the data to the front end.
        fe_data = {
            'doc_id': doc_ref.id,
            'target_image': blob.public_url,
            'result_image': result_blob.public_url
        }

        os.remove(transfer_img_path)
        os.remove(user_img_path)
        return fe_data
