from flask import Blueprint, request
from flask_login import login_required
from app.models import Prayer, db
# form app.forms import PrayerForm

prayer_routes = Blueprint('prayers', __name__)


@prayer_routes.route('/', methods=['GET', 'POST'])
def prayers():

    # print('USERID----------------', request.json['user_id'])
    # print('PRAYER_REQUEST_ID----------------', request.json['pr_id'])
    if request.method == "GET":
        prayers = Prayer.query.all()
        return {'prayers': [prayer.to_dict() for prayer in prayers]}
    if request.method =="POST":
        newPrayer = Prayer(
            user_id=request.json['user_id'],
            prayer_request_id=request.json['pr_id']
        )
        db.session.add(newPrayer)
        db.session.commit()
        prayers = Prayer.query.all()
        return {'prayers': [prayer.to_dict() for prayer in prayers]}
        # pass
    
