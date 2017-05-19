#! /bin/bash

emerge -av dev-python/pip
emerge -av dev-python/virtualenv

pip3 install virtualenv virtualenvwrapper

cd /home/
mkvirtualenv S7Hack
source S7Hack/bin/activate

pip install Django django-adminlte2 psycopg2