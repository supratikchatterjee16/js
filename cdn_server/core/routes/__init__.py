'''
Copyright 2021, Supratik Chatterjee, Conceivilize(Unregistered)
Base routes file for routing storage server module information.
'''

from flask import Blueprint, send_from_directory, abort

import os
main = Blueprint('main', __name__, template_folder='templates')


@main.get('/')
def send_welcome():
    return 'This is a simple CDN for increasing visibility of JS scripts prepared by Conceivilize as a FOSS'


@main.get('/<script>')
def serve_script(script: str = ''):
    if script == None or script == '':
        abort(404)
    #base_url = 'https://raw.githubusercontent.com/supratikchatterjee16/js/master/jsbuilds/'
    script_filename = script + '.min.js'
    print(os.getcwd())
    return send_from_directory(os.path.join(os.getcwd(), 'jsbuilds'), script_filename)
