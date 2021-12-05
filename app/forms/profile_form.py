from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class ProfileForm(FlaskForm):
    profilePicture = StringField('profilePicture')
    location = StringField('location')
    home_church = StringField('home_church')
    bio = StringField('bio')
     
