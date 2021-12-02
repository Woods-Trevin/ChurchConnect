from .db import db
from datetime import datetime

class PrayerRequest(db.Model):
    __tablename__ = 'prayer_requests'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    #Foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))


    #Relationships
    user = db.relationship('User', back_populates='prayer_request')
    prayer = db.relationship('Prayer', back_populates='prayer_request')


    def to_dict(self):
        return {
            'id': self.id,
            'description':self.description,
            'userId':self.user_id,
        }