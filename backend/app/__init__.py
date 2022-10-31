from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
import os

app = Flask(__name__)
CORS(app)
app.config.from_object("app.config.Config")
db = SQLAlchemy(app)
app.config['SECRET_KEY'] = 'secret!'

print(os.environ)
print(f'hello - http://localhost:{os.environ["NEXT_PUBLIC_FRONTEND_PORT"]}')
socketio = SocketIO(app, cors_allowed_origins=[f'http://localhost:{os.environ["NEXT_PUBLIC_FRONTEND_PORT"]}'])
if __name__ == '__main__':
    socketio.run(app)

