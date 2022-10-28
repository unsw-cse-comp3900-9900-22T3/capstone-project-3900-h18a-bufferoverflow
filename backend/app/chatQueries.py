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