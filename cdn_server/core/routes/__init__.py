'''
Copyright 2021, Supratik Chatterjee, Conceivilize(Unregistered)
Base routes file for routing storage server module information.
'''
import base64
from datetime import datetime, timedelta

from flask import session, request, render_template, abort, jsonify, flash, redirect, url_for
# from flask_login import login_required, current_user

from incubyte_crud import server
from incubyte_crud.core.models import *
# from incubyte_crud.core.forms import WordAddForm
application = server.application
orm = server.orm

# login_manager = server.login_manager
# import incubyte_crud.core.routes.login


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

@application.route('/<script>', methods=['GET'])
def serve_script(script=None):
    if script == None:
        abort(404)
    return redirect('https://raw.githubusercontent.com/supratikchatterjee16/js/master/jsbuilds/'+  script +'.min.js)
