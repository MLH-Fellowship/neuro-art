import os,sys
from flask import Flask,escape,request,Response,g,make_response
from flask_cors import CORS
from flask.templating import render_template
from firebase_admin import credentials, initialize_app, storage, firestore
from backend.model import nst

# Initialize Flask application.
app=Flask(__name__)
app.debug=True
CORS(app)
image_folder = os.path.join(app.static_folder, "images")

# Temporary image storage directory.
tmp_folder = os.path.join(image_folder, "tmp")
if not os.path.exists(tmp_folder):
    os.mkdir(tmp_folder)
keep_local_img = False    # Set this True to keep images in the tmp folder.

# Initialize firebase application.
cred = credentials.Certificate(os.path.join(app.root_path, 'keyfiles', 'cred.json'))
storage_url = 'mlh-neuro-art.appspot.com'
initialize_app(cred, {'storageBucket': storage_url})
firestore_client = firestore.client()
image_collection = firestore_client.collection('images')


@app.route('/nst_post',methods=['POST'])
def nst_post():
    if request.method =='POST':

        # Create a reference to the cloud storage bucket and a reference to the document in firestore.
        bucket = storage.bucket()
        doc_ref = image_collection.document()

        # Reference Image
        refer_img = request.form['selected_artist']
        refer_img_path = os.path.join(image_folder, "nst_get", f'nst_reference{refer_img}.JPG')

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
            'timestamp': firestore.SERVER_TIMESTAMP,
            'style_image' : refer_img
        }
        doc_ref.set(db_data)

        # Collate and send the data to the front end.
        fe_data = {
            'doc_id': doc_ref.id,
            'target_image': blob.public_url,
            'result_image': result_blob.public_url
        }

        # Clean up the images stored locally.
        if not keep_local_img:
            os.remove(transfer_img_path)
            os.remove(user_img_path)

        return fe_data

@app.route('/rate', methods=('PUT', 'POST'))
def rate():
    # Extract the json data.
    data = request.json
    rating = data['rating']
    doc_id = data['doc_id']

    # Update the Firestore document.
    image_collection.document(doc_id).update({'rating': rating})

    # Return a success message.
    return {'success': 'true'}