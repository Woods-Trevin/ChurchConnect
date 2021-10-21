from .db import db

class Announcement(db.Model):
    __tablename__ = 'announcements'

    id = db.Column(db.Integer, primary_key=True)
    imageURL = db.Column(db.String(500), default='')
    title = db.Column(db.String(300), nullable=False)
    description = db.Column(db.String(1000), nullable=False)


    #Foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    #Relationships
    user = db.relationship('User', back_populates='announcements')
    comments = db.relationship('Comments', back_populates='comments')