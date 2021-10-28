from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Announcement, Reply, Comment, db
from app.forms import AnnouncementForm

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
    if request.method == 'POST':
        if form.validate_on_submit():
            created_announcement = Announcement(
                imageURL=form.data['imageURL'],
                title=form.data['title'],
                description=form.data['description'],
                user_id=request.json['idx']
            )
            db.session.add(created_announcement)
            db.session.commit()
            return jsonify('Created Announcement')
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

    # print(form.data['imageURL'],'--------------------------')
    # print(form.data['title'],'--------------------------')
    # print(form.data['description'],'--------------------------')

    announcement_to_patch = Announcement.query.get(id)
    if request.method == 'PATCH':
        if form.validate_on_submit():
            announcement_to_patch.imageURL = form.data['imageURL']
            announcement_to_patch.title = form.data['title']
            announcement_to_patch.description = form.data['description']
            db.session.commit()
            return jsonify('announcement patched')
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

        