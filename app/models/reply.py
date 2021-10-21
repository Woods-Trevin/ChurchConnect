from .db import db

class Reply(db.Model):
    __tablename__ = 'replies'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(400), nullable=False)


    #Foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'))

    #Relationships
    user = db.relationship('User', back_populates='replies')
    comments = db.relationship('Comments', back_populates='replies')