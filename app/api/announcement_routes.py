from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import PrayerRequest, Reply, Comment, db
from app.forms import AnnouncementForm
from app.awsupload import (
    upload_file_to_s3, allowed_file, get_unique_filename)

announcement_routes = Blueprint('announcements', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@announcement_routes.route('/', methods=['GET'])
def get_announcements():
    if request.method == "GET":
        allAnnouncements = Announcement.query.all()
        # print([announcement.to_dict() for announcement in allAnnouncements])
        return {'announcements':[announcement.to_dict() for announcement in allAnnouncements]}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@announcement_routes.route('/', methods=['POST'])
@login_required
def post_announcements():
    form = AnnouncementForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # print(request.files['image'], "IMAGE------------------------------------")
    print(form.data['title'], "TITLE--------------------------------")
    print(form.data['description'], "DESCRIPTION--------------------------------")
    print(request.form['idx'], "IDX--------------------------------")

    soloImage = " "
    if "image" in request.files:
        image = request.files["image"]
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400
        url = upload["url"]
        soloImage = url
        # print(url)
        # print(upload["url"])
        # firstImage = urlOne

    awsImage = soloImage if soloImage else None
    print(awsImage)

    if request.method == 'POST':
        if form.validate_on_submit():
            created_announcement = Announcement(
                imageURL=awsImage,
                title=form.data['title'],
                description=form.data['description'],
                user_id=request.form['idx']
            )
            db.session.add(created_announcement)
            db.session.commit()
            announcements = Announcement.query.all()
            return {'announcements': [announcement.to_dict() for announcement in announcements]}
        else:
            return jsonify('Bad Data')
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@announcement_routes.route('/<int:id>', methods=['GET'])
def get_one_announcement(id):
    current_announcement = Announcement.query.get(id)
    print(current_announcement.to_dict())
    return {'announcement': current_announcement.to_dict()}





@announcement_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_announcement(id):
    form = AnnouncementForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # print(request.files['image'],'--------------------------')
    # print(form.data['title'],'--------------------------')
    # print(form.data['description'],'--------------------------')

    updateImage = " "
    if "image" in request.files:
        image = request.files["image"]
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400
        url = upload["url"]
        updateImage = url
        # print(url)
        # print(upload["url"])
        # firstImage = urlOne

    awsImage = updateImage if updateImage else None
    print(awsImage)

    announcement_to_patch = Announcement.query.get(id)
    if request.method == 'PATCH':
        if form.validate_on_submit():
            announcement_to_patch.imageURL = awsImage
            announcement_to_patch.title = form.data['title']
            announcement_to_patch.description = form.data['description']
            db.session.commit()
            announcements = Announcement.query.all()
            return {"announcements": [announcement.to_dict() for announcement in announcements]}
    else:
        return jsonify('Bad Data')
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@announcement_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_announcement(id):
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

    current_announcement = Announcement.query.filter(Announcement.id == id).delete()
    db.session.commit()
    
    if current_announcement:
        return jsonify('Successfully Deleted Announcement')
    else:
        return jsonify('Invalid ID')

        