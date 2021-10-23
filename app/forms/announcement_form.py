from flask_wtf import FlaskForm
from wtforms import StringField, DateField, TimeField
from wtforms.validators import DataRequired

class AnnouncementForm(FlaskForm):
    imageURL = StringField('imageURL')
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])