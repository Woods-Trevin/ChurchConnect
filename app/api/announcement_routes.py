from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Announcement, db
from app.forms import AnnouncementForm

announcement_routes = Blueprint('annoucements', __name__)

@announcement_routes.route('/', methods=['GET', 'POST'])
@login_required
def announcements():
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
