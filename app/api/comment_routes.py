from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Comment, Reply, db
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@comment_routes.route('/', methods=['GET', 'POST'])
@login_required
def create_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # print(form.data['text'], '--------------------------')
    # print(request.json['eventId'], '--------------------------')
    # print(request.json['announcementId'], '--------------------------')
    # print(request.json['userId'], '--------------------------')


    if request.method == "GET":
        comments = Comment.query.all()
        return {'comments': [comment.to_dict() for comment in comments]}
    
    elif request.method == "POST":
        if form.validate_on_submit():
            created_comment = Comment(
                text=form.data['text'],
                user_id=request.json['userId'],
                event_id=request.json['eventId']
            )
            db.session.add(created_comment)
            db.session.commit()
            comments = Comment.query.all()
            return {'comments': [comment.to_dict() for comment in comments]}
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


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
            comments = Comment.query.all()
            return {'comments': [comment.to_dict() for comment in comments]}
            
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    print('--------------------------------', request.json['replies'])
    replies = request.json['replies']

    for reply in replies:
        Reply.query.filter(Reply.id == reply['id']).delete()
    db.session.commit()

    comment_to_delete = Comment.query.filter(Comment.id == id).delete()
    db.session.commit()
    
    comments = Comment.query.all()
    print([comment.to_dict() for comment in comments])
    return {'comments': [comment.to_dict() for comment in comments]}
    # return jsonify('Delete comments')

