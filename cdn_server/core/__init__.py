''' Provides the main flask server handler and WebSockets server handler class.

Copyright 2021, Supratik Chatterjee, as extension, Conceivilize
'''

import os
import socket
import atexit
import asyncio

# The main flask components
from flask import Flask
# from flask_login import LoginManager
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect
from flask_sqlalchemy import SQLAlchemy
# The background scheduler that will be used to schedule jobs
# from apscheduler.schedulers.background import BackgroundScheduler
# from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore

# Threading libraries
# from queue import Queue
# from multiprocessing import Process, Pool

import logging
logger = logging.getLogger(__name__)


class Server:
    ''' Single Sign On Server Object
    This object encapsultaes all activities related to the single sign on server.
    When deployed, this automatically serves to 
    @author Supratik Chatterjee
    '''

    def __init__(self, config, port=2500):
        frontend_filepath_temp = os.path.dirname(
            os.path.realpath(__file__)).split(os.path.sep)
        root_filepath = frontend_filepath_temp[1: -1]
        del frontend_filepath_temp
        self.port = port
        if os.getenv('PORT'):
            self.port = int(os.getenv('PORT'))
        self.application = Flask(__name__,
                                 template_folder=os.path.join(
                                     '/', *root_filepath, 'frontend', 'templates'),
                                 static_folder=os.path.join(
                                     '/', *root_filepath, 'frontend', 'static'),
                                 )
        self.application.config.update(config)
        self.application.config.update(SECRET_KEY=os.urandom(32))
        self.orm = SQLAlchemy(self.application)
        self.migrate = Migrate(self.application)
        # self.login_manager = LoginManager(self.application)
        # self.csrf = CSRFProtect(self.application)
        

    def debug(self):
        #from .routes import *
        logger.info('Starting server in debug mode.')
        self.application.config['SERVER_NAME'] = 'conceivilize.local:' + str(self.port)
        from . import models
        with self.application.app_context():
            self.orm.create_all(bind=None)  # Only the main connection
        from cdn_server.core.routes import main
        self.application.register_blueprint(main)
        #self.application.url_map = routes.get_routes()
        print(self.application.url_map)
        from cdn_server import server
        print(server.application.url_map)
        self.application.run(host='0.0.0.0', port=self.port, threaded=True, debug=True)

    def start(self):
        from . import routes
        import bjoern
        self.application.config['SERVER_NAME'] = self.application.config['SERVER_NAME']
        from . import models
        with self.application.app_context():
            self.orm.create_all(bind=None)  # Only the main connection
        logger.info('Starting server at port : ', self.port)
        print(self.port, 'Server', self.application.config['SERVER_NAME'])
        bjoern.run(self.application, "0.0.0.0", self.port, reuse_port=True)

# ws_server = WSUServer()
# ws_thread = threading.Thread(target=ws_server.start)
# ws_thread.start()
# self.ws_server = ws_server
# ws_thread.join()
