from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Event, Comment, Reply, db
from app.forms import EventForm
from app.awsupload import (
    upload_file_to_s3, allowed_file, get_unique_filename)

event_routes = Blueprint('events', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@event_routes.route('/', methods=['GET'])
def get_events():
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if request.method == 'GET':
        events = Event.query.all()
        return {'events': [event.to_dict() for event in events]}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@event_routes.route('/', methods=['POST'])
@login_required
def post_events():
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    firstImage = " "
    secondImage = " "
    thirdImage = " "
    if len(request.files) > 0:
        if "imageOne" in request.files:
            imageOne = request.files["imageOne"]
            if not allowed_file(imageOne.filename):
                return {"errors": "file type not permitted"}, 400
            imageOne.filename = get_unique_filename(imageOne.filename)
            uploadOne = upload_file_to_s3(imageOne)
            if "url" not in uploadOne:
                # if the dictionary doesn't have a url key
                # it means that there was an error when we tried to upload
                # so we send back that error message
                return uploadOne, 400
            urlOne = uploadOne["url"]
            # print(uploadOne["url"])
            firstImage = urlOne
        
        
        if "imageTwo" in request.files:
            imageTwo = request.files["imageTwo"]
            if not allowed_file(imageTwo.filename):
                return {"errors": "file type not permitted"}, 400
            imageTwo.filename = get_unique_filename(imageTwo.filename)
            uploadTwo = upload_file_to_s3(imageTwo)
            if "url" not in uploadTwo:
                # if the dictionary doesn't have a url key
                # it means that there was an error when we tried to upload
                # so we send back that error message
                return uploadTwo, 400
            urlTwo = uploadTwo["url"]
            # print(uploadTwo["url"])
            secondImage = urlTwo
        
        if "imageThree" in request.files:
            imageThree = request.files["imageThree"]
            if not allowed_file(imageThree.filename):
                return {"errors": "file type not permitted"}, 400
            imageThree.filename = get_unique_filename(imageThree.filename)
            uploadThree = upload_file_to_s3(imageThree)
            if "url" not in uploadThree:
                # if the dictionary doesn't have a url key
                # it means that there was an error when we tried to upload
                # so we send back that error message
                return uploadThree, 400
            urlThree = uploadThree["url"]
            # print(uploadThree["url"])
            thirdImage = urlThree
            
   
    awsOne = firstImage if firstImage else None
    print(awsOne)
    awsTwo = secondImage if secondImage else None
    print(awsTwo)
    awsThree = thirdImage if thirdImage else None
    print(awsThree)

    
    if request.method == 'POST':
        if form.validate_on_submit():
            created_event = Event(
                imageURL= awsOne,
                imageURLTwo = awsTwo,
                imageURLThree = awsThree,
                title=form.data['title'],
                description=form.data['description'],
                startDate=form.data['startDate'],
                endDate=form.data['endDate'],
                startTime=form.data['startTime'],
                endTime=form.data['endTime'],
                user_id=request.form['id']
            )
            db.session.add(created_event)
            db.session.commit()
            events = Event.query.all()
            return {'events': [event.to_dict() for event in events]}
        else:
            return jsonify('Bad Data')
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@event_routes.route('/<int:id>', methods=['GET'])
def get_one_event(id):
    currentEvent = Event.query.get(id)
    print(currentEvent.to_dict())
    return {'event': currentEvent.to_dict()}


@event_routes.route('/<int:id>', methods=['PATCH'])
def update_event(id):
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if len(request.files) > 0:
        if "imageOne" in request.files:
            imageOne = request.files["imageOne"]
            if not allowed_file(imageOne.filename):
                return {"errors": "file type not permitted"}, 400
            imageOne.filename = get_unique_filename(imageOne.filename)
            uploadOne = upload_file_to_s3(imageOne)
            if "url" not in uploadOne:
                # if the dictionary doesn't have a url key
                # it means that there was an error when we tried to upload
                # so we send back that error message
                return uploadOne, 400
            urlOne = uploadOne["url"]
            # print(uploadOne["url"])
        
        
        if "imageTwo" in request.files:
            imageTwo = request.files["imageTwo"]
            if not allowed_file(imageTwo.filename):
                return {"errors": "file type not permitted"}, 400
            imageTwo.filename = get_unique_filename(imageTwo.filename)
            uploadTwo = upload_file_to_s3(imageTwo)
            if "url" not in uploadTwo:
                # if the dictionary doesn't have a url key
                # it means that there was an error when we tried to upload
                # so we send back that error message
                return uploadTwo, 400
            urlTwo = uploadTwo["url"]
            # print(uploadTwo["url"])
        
        if "imageThree" in request.files:
            imageThree = request.files["imageThree"]
            if not allowed_file(imageThree.filename):
                return {"errors": "file type not permitted"}, 400
            imageThree.filename = get_unique_filename(imageThree.filename)
            uploadThree = upload_file_to_s3(imageThree)
            if "url" not in uploadThree:
                # if the dictionary doesn't have a url key
                # it means that there was an error when we tried to upload
                # so we send back that error message
                return uploadThree, 400
            urlThree = uploadThree["url"]
            # print(uploadThree["url"])


    event_to_change = Event.query.get(id)

    if request.method == 'PATCH':
        if len(request.files) > 0:
            if "imageOne" in request.files:
                event_to_change.imageURL = urlOne
            if "imageTwo" in request.files:
                event_to_change.imageURLTwo = urlTwo
            if "imageThree" in request.files:
                event_to_change.imageURLThree = urlThree
        event_to_change.title = form.data['title']
        event_to_change.description = form.data['description']
        event_to_change.startDate = form.data['startDate']
        event_to_change.endDate = form.data['endDate']
        event_to_change.startTime = request.form['startTime']
        event_to_change.endTime = request.form['endTime']
        db.session.commit()
        currentEvents = Event.query.all()
        return {"events": [event.to_dict() for event in currentEvents]}



@event_routes.route('/<int:id>', methods=['DELETE'])
def delete_event(id):
    print('current comments for event-------------------', request.json['comments'])
    print('current replies for event comments-------------------', request.json['replies'])
    replies = request.json['replies']
    comments = request.json['comments']

    for reply in replies:
        Reply.query.filter(Reply.id == reply['id']).delete()
    db.session.commit()

    for comment in comments:
        Comment.query.filter(Comment.id == comment['id']).delete()
    db.session.commit()

    currentEvent = Event.query.filter(Event.id == id).delete()
    db.session.commit()

    currentEvents = Event.query.all()
    return {"events": [event.to_dict() for event in currentEvents]}
