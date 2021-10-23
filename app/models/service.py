from .db import db

class Service(db.Model):
    __tablename__ = 'services'

    id = db.Column(db.Integer, primary_key=True)
    videoURL = db.Column(db.String(500), nullable=False)
    serviceDay = db.Column(db.String(25), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'videoURL': self.videoURL,
            'serviceDay': self.serviceDay,
        }
