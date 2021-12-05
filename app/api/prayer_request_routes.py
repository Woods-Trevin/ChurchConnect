from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import PrayerRequest, Reply, Comment, db
from app.forms import PrayerRequestForm
from app.awsupload import (
    upload_file_to_s3, allowed_file, get_unique_filename)

prayer_request_routes = Blueprint('announcements', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@prayer_request_routes.route('/', methods=['GET'])
def get_prayer_requests():
    if request.method == "GET":
        allPrayerRequests = PrayerRequest.query.all()
        # print([announcement.to_dict() for announcement in allAnnouncements])
        return {'prayer_requests':[prayer_request.to_dict() for prayer_request in allPrayerRequests]}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@prayer_request_routes.route('/', methods=['POST'])
@login_required
def post_prayer_request():
    form = PrayerRequestForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # print(request.files['image'], "IMAGE------------------------------------")
    # print(form.data['title'], "TITLE--------------------------------")
    print(form.data['description'], "DESCRIPTION--------------------------------")
    print(request.form['idx'], "IDX--------------------------------")

    # soloImage = " "
    # if "image" in request.files:
    #     image = request.files["image"]
    #     if not allowed_file(image.filename):
    #         return {"errors": "file type not permitted"}, 400
    #     image.filename = get_unique_filename(image.filename)
    #     upload = upload_file_to_s3(image)
    #     if "url" not in upload:
    #         # if the dictionary doesn't have a url key
    #         # it means that there was an error when we tried to upload
    #         # so we send back that error message
    #         return upload, 400
    #     url = upload["url"]
    #     soloImage = url
    #     # print(url)
    #     # print(upload["url"])
    #     # firstImage = urlOne

    # awsImage = soloImage if soloImage else None
    # print(awsImage)

    if request.method == 'POST':
        if form.validate_on_submit():
            print('Form validated!!')
            created_prayer_request = PrayerRequest(
                description=form.data['description'],
                user_id=request.form['idx']
            )
            db.session.add(created_prayer_request)
            db.session.commit()
            prayer_requests = PrayerRequest.query.all()
            return {'prayer_requests': [prayer_request.to_dict() for prayer_request in prayer_requests]}
        else:
            return jsonify('Bad Data')
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@prayer_request_routes.route('/<int:id>', methods=['GET'])
def get_one_prayer_request(id):
    current_prayer_request = PrayerRequest.query.get(id)
    print(current_prayer_request.to_dict())
    return {'prayer_request': current_prayer_request.to_dict()}





@prayer_request_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_prayer_request(id):
    form = PrayerRequestForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # print(request.files['image'],'--------------------------')
    # print(form.data['title'],'--------------------------')
    # print(form.data['description'],'--------------------------')

    prayer_request_to_patch = PrayerRequest.query.get(id)
    if request.method == 'PATCH':
        if form.validate_on_submit():
            prayer_request_to_patch.description = form.data['description']
            db.session.commit()
            prayer_requests = PrayerRequest.query.all()
            return {"prayer_requests": [prayer_request.to_dict() for prayer_request in prayer_requests]}
    else:
        return jsonify('Bad Data')
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@prayer_request_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_prayer_request(id):
    # print('current comments for event-------------------', request.json['comments'])
    # print('current replies for event comments-------------------', request.json['replies'])
    # replies = request.json['replies']
    # comments = request.json['comments']

    current_prayer_request = PrayerRequest.query.filter(PrayerRequest.id == id).delete()
    db.session.commit()
    
    if current_announcement:
        return jsonify('Successfully Deleted Announcement')
    else:
        return jsonify('Invalid ID')

        