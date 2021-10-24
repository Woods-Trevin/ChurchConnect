from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    text = StringField('text', validators=[DataRequired()])
    