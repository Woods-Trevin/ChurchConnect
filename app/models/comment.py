from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(400), nullable=False)


    #Foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    announcement_id = db.Column(db.Integer, db.ForeignKey('announcements.id'), nullable=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=True)

    #relationship
    user = db.relationship('User', back_populates='comments')
    announcements = db.relationship('Announcement', back_populates='comments')
    events = db.relationship('Event', back_populates='comments')
    replies = db.relationship('Reply', back_populates='comments')