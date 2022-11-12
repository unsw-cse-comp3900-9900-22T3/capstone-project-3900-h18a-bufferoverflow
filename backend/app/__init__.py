from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
import os

app = Flask(__name__)
CORS(app)

socketio = SocketIO(app, cors_allowed_origins=[f'http://localhost:{os.environ["NEXT_PUBLIC_FRONTEND_PORT"]}'])
if __name__ == '__main__':
    socketio.run(app)

