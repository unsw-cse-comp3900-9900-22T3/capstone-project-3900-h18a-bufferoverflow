import app.api as api
import app.database.models as models
from app import app, socketio
from flask import request, jsonify
from ariadne import graphql_sync
from ariadne.constants import PLAYGROUND_HTML
from flask_socketio import emit, join_room
from app.database.models import *


@app.route("/graphql", methods=["GET"])
def graphql_playground():
    """ Server GraphQL Playground

    Args:
        None

    Returns:
        str: The GraphQL Playground HTML
    """
    return PLAYGROUND_HTML, 200


@app.route("/graphql", methods=["POST"])
def graphql_server():
    """ Create GraphQL endpoint

    Args:
        None

    Returns:
        dict: The response payload
    """
    data = request.get_json()
    success, result = graphql_sync(
        api.schema,
        data,
        context_value=request,
        debug=app.debug
    )
    status_code = 200 if success else 400
    return jsonify(result), status_code


@socketio.on('send_message')
def send_message(data):
    """ Send message to room

    Args:
        data (dict): The message data

    Returns:
        None
    """
    if 'author' in data.keys():
        print(f'received message and sent back: {data}')
        message = models.Message(data['timestamp'], data['text'], data['author'], data['conversation'])
        message.save()
        conversation_object = models.Conversation.query.filter_by(conversation=data['conversation']).first()
        conversation_object.latest = message.id
        conversation_object.save()
        emit("to_client", message.to_json(), to=data['conversation'])


@socketio.on('join')
def on_join(data):
    """ Join room

    Args:
        data (dict): The room data

    Returns:
        None
    """
    conversation = data['conversation']
    print(f"joining room: [{conversation}]")
    if len(models.Conversation.query.filter_by(conversation=conversation).all()) == 0:
        models.Conversation(conversation).save()
    join_room(conversation)
