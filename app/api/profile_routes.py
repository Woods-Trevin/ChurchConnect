from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import Profile, db
from app.forms import ProfileForm
from app.awsupload import (
    upload_file_to_s3, allowed_file, get_unique_filename)

profile_routes = Blueprint('profiles', __name__)

@profile_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_profile(id):

    if request.method == 'GET':
        currentUserProfile = Profile.query.get(id)
        return {"profile": currentUserProfile.to_dict()}
    return jsonify("Bad Data")


@profile_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def edit_profile(id):
    form = ProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']

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

    if request.method == 'PATCH':
        if form.validate_on_submit():
            pass



