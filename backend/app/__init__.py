from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO

app = Flask(__name__)
CORS(app)
app.config.from_object("app.config.Config")
db = SQLAlchemy(app)
app.config['SECRET_KEY'] = 'secret!'

socketio = SocketIO(app, cors_allowed_origins=['http://localhost:5002'])
if __name__ == '__main__':
    socketio.run(app)

