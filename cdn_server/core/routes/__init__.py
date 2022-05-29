'''
Copyright 2021, Supratik Chatterjee, Conceivilize(Unregistered)
Base routes file for routing storage server module information.
'''
import base64
from datetime import datetime, timedelta

from flask import session, request, render_template, abort, jsonify, flash, redirect, url_for, Blueprint
# from flask_login import login_required, current_user

#from cdn_server import server
#from cdn_server.core.models import *
#from cdn_server.core.forms import WordAddForm
#application = server.application
#orm = server.orm

# login_manager = server.login_manager
# import cdn_server.core.routes.login


#@application.route('/', methods=['GET'])
#def index():
    #'''
    #Home page logic.
    #@author Supratik Chatterjee
    #'''
    #return render_template('home.html')


#@application.route('/words', methods=['GET', 'POST', 'PUT', 'DELETE'])
#def crud_word():
    #'''
    #REST endpoint for operating on words
    #@author Supratik Chatterjee
    #'''
    #response = None
    #if request.method == 'GET':
        #json = Words.read_all()
        #response = application.response_class(
            #response = json,
            #status = 200,
            #mimetype = 'application/json'
        #)
    #elif request.method == 'POST':
        #json = request.get_json()
        #print(json)
        #Words.create(json['word'])
        #response = application.response_class(status = 200)
    #elif request.method == 'PUT' :
        #json =  request.get_json()
        #Words.update(json['word'], json['changed'])
        #response = application.response_class(status = 200)
    #elif request.method == 'DELETE':
        #json =  request.get_json()
        #Words.delete(json['word'])
        #response = application.response_class(status = 200)
    #return response
#print('Routes loaded')
main = Blueprint('main', __name__, template_folder='templates')
@main.get('/<script>')
def serve_script(script : str= ''):
    if script == None or script == '':
        abort(404)
    #base_url = 'https://raw.githubusercontent.com/supratikchatterjee16/js/master/jsbuilds/'
    script_filename = script +'.min.js'
    
    return send_from_directory('jsbuilds', script_filename)
    #return ''
