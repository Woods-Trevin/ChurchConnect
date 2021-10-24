from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Comment, db
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/', methods=['GET', 'POST'])
@login_required
def create_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    print(form.data['text'], '--------------------------')
    print(request.json['eventId'], '--------------------------')
    print(request.json['announcementId'], '--------------------------')
    print(request.json['userId'], '--------------------------')


    if request.method == "GET":
        return jsonify('GET COMMENTS')
    
    elif request.method == "POST":
        if form.validate_on_submit():
            created_comment = Comment(
                text=form.data['text'],
                user_id=request.json['userId'],
                announcement_id=request.json['announcementId'],
                event_id=request.json['eventId']
            )
            db.session.add(created_comment)
            db.session.commit()
            return jsonify("COMMENT POST VALID")
