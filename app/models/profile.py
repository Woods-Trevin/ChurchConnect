from .db import db
from datetime import datetime

class Profile(db.Model):
    __tablename__ ='profiles'

    id = db.Column(db.Integer, primary_key=True)
    profilePicture = db.Column(db.String(500), default='')
    location = db.Column(db.String(100), nullable=False)
    home_church = db.Column(db.String(100), nullable=False)
    bio = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    #Foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    #Relationships
    user = db.relationship('User', back_populates='profile')

    def to_dict(self):
        return {
            'id': self.id,
            'profilePicture':self.profilePicture,
            'location':self.location,
            'homeChurch':self.home_church,
            'bio':self.bio,
            'userId':self.user_id,
            'user': self.user.to_dict()
        }

