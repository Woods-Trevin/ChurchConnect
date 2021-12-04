from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class PrayerRequestForm(FlaskForm):
    description = StringField('description', validators=[DataRequired()])