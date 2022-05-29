# Storage Server CLI script
# @author Supratik Chatterjee
#
# Copyright : Supratik Chatterjee, 2021

import argparse
import logging
from .core import Server
from .config import config

# initiate logger
logger = logging.getLogger(__name__)
server = Server(config)

open_files = {}
key_size = 64
parser = argparse.ArgumentParser(description='Process some integers.')

parser.add_argument('-d', '--debug', action='store_true',
                    help='Start it with the flask debugger. Deault is a Bjeorn server.')
parser.add_argument('-p', '--port', nargs=1,
                    help="Port number to start the server at. Default : 1500 ")


def run():
    global server
    args = parser.parse_args()
    if args.port:
        server.port = int(args.port[0])
    if args.debug is True:
        server.debug()
    else:
        server.start()


if __name__ == '__main__':
    run()
