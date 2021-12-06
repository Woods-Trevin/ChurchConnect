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

    # print(request.files['image'], "CURRENT IMAGE FOR AWS UPLOAD-------------------")
    # print(form.data['location'], "DATA----------------------------------------------------")
    # print(form.data['bio'], "DATA----------------------------------------------------")
    # print(request.form["homeChurch"], "DATA----------------------------------------------------")

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

    profile_to_change = Profile.query.get(id)
    if request.method == 'PATCH':
        if form.validate_on_submit():
            if len(request.files) > 0:
                if "image" in request.files:
                    profile_to_change.profilePicture = awsImage
            profile_to_change.location = form.data['location']
            profile_to_change.home_church = request.form["homeChurch"]
            profile_to_change.bio = form.data['bio']
            db.session.commit()
            updatedProfile = Profile.query.get(id)
            return {"profile": updatedProfile.to_dict()}



