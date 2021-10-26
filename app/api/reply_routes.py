from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Reply, db
from app.forms import ReplyForm


reply_routes = Blueprint('replies', __name__)

@reply_routes.route('/', methods=['GET', 'POST'])
@login_required
def replies():
    form = ReplyForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if request.method == 'GET':
        replies = Reply.query.all()
        return {'replies': [reply.to_dict() for reply in replies]}
    elif request.method == 'POST':
        if form.validate_on_submit():
            created_reply = Reply(
                text=form.data['text'],
                user_id=request.json['userId'],
                comment_id = request.json['commentId']
            )
            db.session.add(created_reply)
            db.session.commit()
            replies = Reply.query.all()
            return {'replies': [reply.to_dict() for reply in replies]}


@reply_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def patch_reply(id):
    form = ReplyForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if request.method == 'PATCH':
        if form.validate_on_submit():
            reply_to_change = Reply.query.get(id)
