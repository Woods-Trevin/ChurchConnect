from .db import db
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(400), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    #Foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=True)

    #relationship
    user = db.relationship('User', back_populates='comments')
    events = db.relationship('Event', back_populates='comments')
    replies = db.relationship('Reply', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'text': self.text,
            'userId': self.user_id,
            'eventId': self.event_id,
            'announcementId': self.announcement_id,
            'replies': [reply.to_dict() for reply in self.replies],
            'username': self.user.username,
        }