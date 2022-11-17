from app.database.models import Message, Conversation, User
from ariadne import convert_kwargs_to_snake_case


def create_message_resolver(obj, info, timestamp, text, author, conversation):
    """ Creates a new message

    Args:
        obj: The parent object, which in this case is the root value
        info (ResolveInfo): Information about the execution state of the query
        timestamp: The timestamp of the message
        text: The text of the message
        author: The author of the message
        conversation: The conversation the message belongs to

    Returns:
        dict: The response payload
    """
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


def getMessages_resolver(obj, info, conversation, us_email):
    """ Gets all messages in a conversation, and the participants

    Args:
        obj: The parent object, which in this case is the root value
        info (ResolveInfo): Information about the execution state of the query
        conversation: The conversation to get messages from

    Returns:
        dict: The response payload
    """
    try:
        messages = [message.to_json() for message in Message.query.filter_by(
            conversation=conversation)]

        us = User.query.filter_by(email=us_email).first()
        them_email = conversation.replace(us_email, "").replace("-", "")
        them = User.query.filter_by(email=them_email).first()

        payload = {
            "success": True,
            "messages": messages,
            "us": us,
            "them": them
        }
    except Exception as error:
        print(f"exception {str(error)}")
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload


@convert_kwargs_to_snake_case
def createConversation_resolver(obj, info, **kwargs):
    """ Creates a new conversation

    Args:
        obj: The parent object, which in this case is the root value
        info (ResolveInfo): Information about the execution state of the query
        kwargs: The arguments for the conversation

    Returns:
        dict: The response payload
    """
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
    """ Updates a conversation

    Args:
        obj: The parent object, which in this case is the root value
        info (ResolveInfo): Information about the execution state of the query
        conversation: The conversation to update
        last_read_first: the last message read for the first participant
        last_read_second: the last message read for the second participant

    Returns:
        dict: The response payload
    """
    try:
        conversation_object = Conversation.query.filter_by(
            conversation=conversation).first()
        print(
            f"updating conversation with {conversation} {last_read_first} {last_read_second} {conversation_object}")
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
    """ Gets all conversations involving a user

    Args:
        obj: The parent object, which in this case is the root value
        info (ResolveInfo): Information about the execution state of the query
        involving: The user to get conversations for

    Returns:
        dict: The response payload
    """
    try:
        #  valid since emails can't contain other emails
        conversations = Conversation.query.filter(
            Conversation.conversation.contains(involving))

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


@convert_kwargs_to_snake_case
def getConversationsForOverview_resolver(obj, info, involving):
    """ Gets all conversations involving a user for overview

    Args:
        obj: The parent object, which in this case is the root value
        info (ResolveInfo): Information about the execution state of the query
        involving: The user to get conversations for

    Returns:
        dict: The response payload
    """
    try:
        #  valid since emails can't contain other emails
        conversations = Conversation.query.filter(
            Conversation.conversation.contains(involving))
        overview = []
        for conversation in conversations:
            them = conversation.conversation.replace(
                involving, "").replace("-", "")
            user = User.query.filter_by(email=them).first()
            seen = None
            if conversation.conversation.startswith(involving) and conversation.last_read_first != None:
                seen = Message.query.get(conversation.last_read_first)
            elif conversation.last_read_second != None:
                seen = Message.query.get(conversation.last_read_second)
            messages = Message.query.filter_by(
                conversation=conversation.conversation).all()
            if seen:
                messages = [
                    message for message in messages if message.id > seen.id]
            unread = 1 if len(messages) > 0 else 0
            overview.append({
                "id": conversation.id,
                "conversation": conversation.conversation,
                "username": user.username,
                "email": them,
                "display_img": user.display_img,
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


def countUnseenMessages_resolver(obj, info, email):
    """ Counts the number of unseen messages for a user

    Args:
        obj: The parent object, which in this case is the root value
        info (ResolveInfo): Information about the execution state of the query
        email: The user email to count unseen messages for

    Returns:
        dict: The response payload
    """
    try:
        conversations = Conversation.query.filter(
            Conversation.conversation.contains(email))
        count = 0
        for conversation in conversations:
            seen = None
            if conversation.conversation.startswith(email) and conversation.last_read_first != None:
                seen = Message.query.get(conversation.last_read_first)
            elif conversation.last_read_second != None:
                seen = Message.query.get(conversation.last_read_second)
            messages = Message.query.filter_by(
                conversation=conversation.conversation).all()

            if seen:
                messages = [
                    message for message in messages if message.id > seen.id]
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
    """ Deletes a conversation

    Args:
        obj: The parent object, which in this case is the root value
        info (ResolveInfo): Information about the execution state of the query
        conversation: The conversation to delete

    Returns:
        dict: The response payload
    """
    try:
        conversation_object = Conversation.query.filter_by(
            conversation=conversation).first()
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
