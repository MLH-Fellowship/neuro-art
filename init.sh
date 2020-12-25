#!/bin/sh
if [ ! -d "venv" ]; then
    echo -------------------
    echo Creating virtualenv
    echo -------------------
    python -m venv venv

fi

export PIP_USER=no
source venv/bin/activate

echo -------------------
echo Installing Requirements
echo -------------------
pip install -r requirements.txt

export FLASK_APP=start_flask.py

echo -------------------
echo Running Flask server
echo -------------------
flask run