from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Event

event_routes = Blueprint('events', __name__)


@event_routes.route('/', methods=['GET', 'POST'])
@login_required
def get_all_events():
    if request.method == 'GET':
        events = Event.query.all()
        return {'events': [event.to_dict() for event in events]}
    if request.method == 'POST':
        created_event = Event(
            
        )


