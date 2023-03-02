import argparse
from sys import argv, stderr, exit
from os import path 

from app import app
from consts import *

def main():
    args = parse_args()
    try:
        port = int(vars(args)['port'])
    except Exception:
        print('Port must be an integer.', file=stderr)
        exit(1)

    database = vars(args)['database']
    if not path.isfile(database):
        print('Not a valid database.', file=stderr)
        exit(1)

    try:
        print("Port: " + str(port))
        print("Database: " + database)
        app.config.update({"DATABASE": database})
        app.run(host='0.0.0.0', port=port, debug=True)
    except Exception as ex:
        print(ex, file=stderr)
        exit(1)

def parse_args():
    '''
    parses arguments and returns a dict
    '''
    parser = argparse.ArgumentParser(allow_abbrev=False)
    parser.add_argument('--port', required = False, default=8080, 
        help='the port at which the server should listen')
    parser.add_argument('--database', required = False, default= DATABASE_URL, 
        help='database our app should be connected to')
    return parser.parse_args()

if __name__ == '__main__':
    main()
