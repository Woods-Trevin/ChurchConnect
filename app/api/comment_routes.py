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


@comment_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if request.method == 'PATCH':
        comment_to_change = Comment.query.get(id)
        if form.validate_on_submit():
            comment_to_change.text = form.data['text']
            db.session.commit()
            return jsonify("Updated Comment")


@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment_to_delete = Comment.query.filter(Comment.id == id).delete()
    db.session.commit()
    print('----------------------------------------------------------------', request.json['eventId'])
    comments = Comment.query.filter(Comment.event_id == request.json['eventId']).all()
    print([comment.to_dict() for comment in comments])
    return {'comments': [comment.to_dict() for comment in comments]}
    # return jsonify('Delete comments')

