from .db import db
from datetime import datetime

class Prayer(db.Model):
    __tablename__ = 'prayers'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    #Foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    prayer_request_id = db.Column(db.Integer, db.ForeignKey('prayer_requests.id'))


    #Relationships
    user = db.relationship('User', back_populates='prayer')
    prayer_request = db.relationship('PrayerRequest', back_populates='prayer')


    def to_dict(self):
        return {
            'id': self.id,
            'userId':self.user_id,
            'prayer_request_id': self.prayer_request_id,
        }