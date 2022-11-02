from app import db
from app.models import Message, Conversation, User

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
def updateConversation_resolver(obj, info, conversation, last_read_first=None, last_read_second=None):
    try:
        conversation_object = Conversation.query.filter_by(conversation=conversation).first()
        print(f"updating conversation with {conversation} {last_read_first} {last_read_second} {conversation_object}")
        if last_read_first is not None:
            conversation_object.last_read_first = last_read_first
        if last_read_second is not None:
            conversation_object.last_read_second = last_read_second
        conversation_object.save()
        payload = {
            "success": True,
            "conversation": conversation_object.to_json()
        }
    except Exception as error:
        print(repr(error))
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload

@convert_kwargs_to_snake_case
def getConversations_resolver(obj, info, involving):
    try:
        # think this might be potentially fragile, but emails can't have more than 1 @ right?
        conversations = Conversation.query.filter(Conversation.conversation.contains(involving))

        payload = {
            "success": True,
            "conversations": [conversation.to_json() for conversation in conversations]
        }
    except Exception as error:
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload

def getConversationsForOverview_resolver(obj, info, involving):
    try:
        # think this might be potentially fragile, but emails can't have more than 1 @ right?
        conversations = Conversation.query.filter(Conversation.conversation.contains(involving))
        overview = []
        for conversation in conversations:
            them = conversation.conversation.replace(involving, "").replace("-", "")
            user = User.query.filter_by(email=them).first()
            seen = None
            if conversation.conversation.startswith(involving) and conversation.last_read_first != None:
                seen = Message.query.get(conversation.last_read_first)
            elif conversation.last_read_second != None:
                seen = Message.query.get(conversation.last_read_second)
            messages = Message.query.filter_by(conversation=conversation.conversation).all()
            if seen:
                messages = [message for message in messages if message.id > seen.id]
            unread = 1 if len(messages) > 0 else 0
            overview.append({
                "id": conversation.id,
                "conversation": conversation.conversation,
                "username": user.username,
                "email": them,
                "displayImg": user.display_img,
                "latest": Message.query.get(conversation.latest) if conversation.latest else None,
                "unread": unread,
            })
        payload = {
            "success": True,
            "conversations": overview
        }
    except Exception as error:
        print(f'getCoversationsForOverview {repr(error)}')
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload

'''
counts the number of conversations which have messages the user hasn't seen
'''
def countUnseenMessages_resolver(obj, info, email):
    try:
        conversations = Conversation.query.filter(Conversation.conversation.contains(email))
        count = 0
        for conversation in conversations:
            seen = None
            if conversation.conversation.startswith(email) and conversation.last_read_first != None:
                seen = Message.query.get(conversation.last_read_first)
            elif conversation.last_read_second != None:
                seen = Message.query.get(conversation.last_read_second)
            messages = Message.query.filter_by(conversation=conversation.conversation).all()

            if seen:
                messages = [message for message in messages if message.id > seen.id]
            count += 1 if len(messages) > 0 else 0
        payload = {
            "success": True,
            "count": count
        }
    except Exception as error:
        print(f'countUnseenMessages - {error}')
        payload = {
            "success": False,
            "errors": [repr(error)]
        }
    return payload

def deleteConversation_resolver(obj, info, conversation):
    try:
        conversation_object = Conversation.query.filter_by(conversation=conversation).first()
        conversation_object.delete()
        messages = Message.query.filter_by(conversation=conversation).all()
        for message in messages:
            message.delete()
        payload = {
            "success": True,
        }
    except Exception as error:
        print(f"deleteConversation - {repr(error)}")
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload