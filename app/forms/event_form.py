from flask_wtf import FlaskForm
from wtforms import StringField, DateField, TimeField
from wtforms.validators import DataRequired

class EventForm(FlaskForm):
    imageURL = StringField('imageURL')
    imageURLTwo = StringField('imageURLTwo')
    imageURLThree = StringField('imageURLThree')
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    startDate = DateField('startDate', validators=[DataRequired()])
    endDate = DateField('endDate', validators=[DataRequired()])
    startTime = TimeField('startTime', validators=[DataRequired()])
    endTime = TimeField('endTime', validators=[DataRequired()])