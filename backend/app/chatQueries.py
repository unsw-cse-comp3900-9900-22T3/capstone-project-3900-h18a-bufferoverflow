from app import db
from app.models import Message

from ariadne import convert_kwargs_to_snake_case

def create_message_resolver(obj, info, timestamp, text, author, conversation):
    try:
        message = Message(timestamp, text, author, conversation)
        message.save()
        payload = {
            "success": True,
            "message": message.to_json()
        }
    except Exception as error:
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload

def getMessages_resolver(obj, info, conversation=None):
    try:
        if conversation is not None:
            messages = Message.query.filter_by(conversation=conversation)
        else:
            messages = Message.query.all()
        messages = [message.to_json() for message in messages]
        payload = {
            "success": True,
            "messages": messages
        }
    except Exception as error:
        print(f"exception {str(error)}")
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload

# todo: delete conversation
# todo: is_inactive

@convert_kwargs_to_snake_case
def createConversation_resolver(obj, info, **kwargs):
    try:
        conversation = Conversation(**kwargs)
        conversation.save()
        payload = {
            "success": True,
            "conversation": conversation.to_json()
        }
    except Exception as error:
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload

@convert_kwargs_to_snake_case
def updateConversation_resolver(obj, info, id, last_read_first=None, last_read_second=None):
    try:
        conversation = Conversation.query.get(id)
        if last_read_first is not None:
            conversation.last_read_first = last_read_first
        if last_read_second is not None:
            conversation.last_read_second = last_read_second
        payload = {
            "success": True,
            "conversation": conversation.to_json() if conversation else None
        }
    except Exception as error:
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload

@convert_kwargs_to_snake_case
def getConversation_resolver(obj, info, id):
    try:
        conversation = Conversation.query.get(id)
        payload = {
            "success": True,
            "conversation": conversation.to_json() if conversation else None
        }
    except Exception as error:
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload
