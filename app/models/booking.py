from .db import db
from datetime import datetime

class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.column(db.Integer, primary_key=True)
    ceremony_type = db.column(db.String(100), nullable=False)
    firstName = db.column(db.String(100), nullable=False)
    lastName = db.column(db.String(100), nullable=False)
    home_church = db.column(db.String(255), nullable=False)
    bookingDay = db.column(db.Date, nullable=False)
    bookingTime = db.column(db.Time, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    

    #foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    priest_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    #Relationships
    user = db.relationship('User', back_populates='booking')

    def to_dict(self):
        return {
            'id': self.id,
            'ceremony_type': self.ceremony_type,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'home_church': self.home_church,
            'bookingDay': self.bookingDay,
            'bookingTime': self.bookingTime,
        }