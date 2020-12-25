#!/bin/sh
if [ ! -d "venv" ]; then
    echo -------------------
    echo Creating virtualenv
    echo -------------------
    python3 -m venv venv

fi

export PIP_USER=no
source venv/bin/activate

echo -------------------
echo Installing Requirements
echo -------------------
pip3 install -r requirements.txt

export FLASK_APP=start_flask.py

echo -------------------
echo Running Flask server
echo -------------------
flask run
