from .db import db

class Event(db.Model):
    __tablename__ ='events'

    id = db.Column(db.Integer, primary_key=True)
    imageURL = db.Column(db.String(700), default='')
    imageURLTwo = db.Column(db.String(700), default='')
    imageURLThree = db.Column(db.String(700), default='')
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    startDate = db.Column(db.DateTime, nullable=False)
    endDate = db.Column(db.DateTime, nullable=False)
    startTime = db.Column(db.DateTime, nullable=False)
    endTime = db.Column(db.DateTime, nullable=False)


    #Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    #Relationships
    user = db.relationship('User', back_populates='events')
    comments = db.relationship('Comments', back_populates='events')

