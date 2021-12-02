from .db import db
from datetime import datetime

class Priest(db.Model):
    __tablename__ ='priests'

    id = db.Column(db.Integer, primary_key=True)

    #Foreign Keys
    priest_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    booking_id = db.Column(db.Integer, db.ForeignKey('bookings.id'))


    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)


    #Relationships
    user = db.relationship('User', back_populates='priest')
    booking = db.relationship('Booking', back_populates='priest')

    def to_dict(self):
        return {
            'id': self.id,
            
        }
