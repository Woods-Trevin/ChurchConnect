from flask import Blueprint, request
from flask_login import login_required
from app.models import Prayer, db
# form app.forms import PrayerForm

prayer_routes = Blueprint('prayers', __name__)


@prayer_routes.route('/', methods=['GET', 'POST'])
def prayers():
    if request.method == "GET":
        # print("GET method triggered----------------------------------------")
        prayers = Prayer.query.all()
        # print([prayer.to_dict() for prayer in prayers], "PRAYERs----------------------------------------------")
        return {'prayers': [prayer.to_dict() for prayer in prayers]}
    if request.method =="POST":
        # print("POST method triggered---------------------------------------")
        newPrayer = Prayer(
            user_id=request.json['user_id'],
            prayer_request_id=request.json['pr_id']
        )
        db.session.add(newPrayer)
        db.session.commit()
        prayers = Prayer.query.all()
        return {'prayers': [prayer.to_dict() for prayer in prayers]}
        # pass
    return "checking route"


@prayer_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_prayer(id):
    # prayer = Prayer.query.filter(Prayer.id == id)
    # print(prayer, "CURRENT PRAYER--------------------------------------------------------")
    # prayer_to_delete = Prayer.query.get(id).delete()
    prayer_to_delete = Prayer.query.filter(Prayer.id == id).delete()
    db.session.commit()
    allPrayers = Prayer.query.all()
    return {"prayers": [prayer.to_dict() for prayer in allPrayers]}
    # return {"Test": id}
    
