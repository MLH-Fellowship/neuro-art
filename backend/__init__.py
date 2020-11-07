import os,sys
from flask import Flask,escape,request,Response,g,make_response
from flask.templating import render_template


real_path = os.path.dirname(os.path.realpath(__file__))
sub_path = "/".join(real_path.split("/")[:-1])

os.chdir(sub_path)

from .model import nst

app=Flask(__name__)
app.debug=True

def root_path():
    ''' root directory'''
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
        root_path()

        # Reference Image
        refer_img = request.form['refer_img']
        refer_img_path = '/images/nst_get/' +str(refer_img)

        # User Image
        user_img = request.files['user_img']
        user_img.save('./backend/static/images/'+ str(user_img.filename))
        user_img_path = '/images/'+str(user_img.filename)

        # Neural Style Transfer
        transfer_img = nst.main(refer_img_path,user_img_path)
        transfer_img_path = '/images/__nst_result/' +str(transfer_img.split('/')[-1])

        render_template('nst_post.html',
                        refer_img = refer_img_path,
                        user_img  = user_img_path,
                        transfer_img = transfer_img_path)