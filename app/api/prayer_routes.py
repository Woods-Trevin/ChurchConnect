from flask import Blueprint, prayer_request_routes
from flask_login import login_required
from app.models import Prayer, db
# form app.forms import PrayerForm

prayer_routes = Blueprint('prayers', __name__)


@prayer_routes.route('/', methods=['GET', 'POST'])
def prayers():
    if request.method == "GET":

    if request.method =="POST":
