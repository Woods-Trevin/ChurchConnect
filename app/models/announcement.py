from .db import db
from datetime import datetime

class Announcement(db.Model):
    __tablename__ = 'announcements'

    id = db.Column(db.Integer, primary_key=True)
    imageURL = db.Column(db.String(500), default='')
    title = db.Column(db.String(300), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    #Foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    #Relationships
    user = db.relationship('User', back_populates='announcements')
    comments = db.relationship('Comment', back_populates='announcements')

    def to_dict(self):
        return {
            'id': self.id,
            'imageURL':self.imageURL,
            'title':self.description,
            'description':self.description,
            'userId':self.user_id,
        }