from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Event, db
from app.forms import EventForm

event_routes = Blueprint('events', __name__)


@event_routes.route('/', methods=['GET', 'POST'])
@login_required
def events():
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print(form.data['imageURL'], '----------------------------------------------------------------')
    # print(form.data['imageURLTwo'], '----------------------------------------------------------------')
    # print(form.data['imageURLThree'], '----------------------------------------------------------------')
    # print(form.data['title'], '----------------------------------------------------------------')
    # print(form.data['description'], '----------------------------------------------------------------')
    # print(form.data['startDate'], '----------------------------------------------------------------')
    # print(form.data['endDate'], '----------------------------------------------------------------')
    # print(form.data['startTime'], '----------------------------------------------------------------')
    # print(form.data['endTime'], '----------------------------------------------------------------')
    # print(request.json['idx'], '----------------------------------------------------------------')
    if request.method == 'GET':
        events = Event.query.all()
        return {'events': [event.to_dict() for event in events]}
    if request.method == 'POST':
        if form.validate_on_submit():
            created_event = Event(
                imageURL=form.data['imageURL'],
                imageURLTwo = form.data['imageURLTwo'],
                imageURLThree = form.data['imageURLThree'],
                title=form.data['title'],
                description=form.data['description'],
                startDate=form.data['startDate'],
                endDate=form.data['endDate'],
                startTime=form.data['startTime'],
                endTime=form.data['endTime'],
                user_id=request.json['idx']
            )
            db.session.add(created_event)
            db.session.commit()
            return jsonify('Created New Event')
        else:
            return jsonify('Bad Data')