from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Announcement, db
from app.forms import AnnouncementForm

announcement_routes = Blueprint('announcements', __name__)

@announcement_routes.route('/', methods=['GET', 'POST'])
@login_required
def announcements():
    form = AnnouncementForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if request.method == "GET":
        allAnnouncements = Announcement.query.all()
        # print([announcement.to_dict() for announcement in allAnnouncements])
        return {'announcements':[announcement.to_dict() for announcement in allAnnouncements]}

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


@announcement_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_announcement(id):
    current_announcement = Announcement.query.filter(Announcement.id == id).delete()
    db.session.commit()
    if current_announcement:
        return jsonify('Successfully Deleted Announcement')
    else:
        return jsonify('Invalid ID')

        