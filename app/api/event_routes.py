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


@event_routes.route('/<int:id>', methods=['GET'])
def get_one_event(id):
    currentEvent = Event.query.get(id)
    print(currentEvent.to_dict())
    return {'event': currentEvent.to_dict()}


@event_routes.route('/<int:id>', methods=['PATCH'])
def update_event(id):
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    print(form.data['imageURL'], '--------------------------')
    print(form.data['imageURLTwo'], '--------------------------')
    print(form.data['imageURLThree'], '--------------------------')
    print(form.data['title'], '--------------------------')
    print(form.data['description'], '--------------------------')
    print(form.data['startDate'], '--------------------------')
    print(form.data['endDate'], '--------------------------')
    print(request.json['startTime'], '--------------------------')
    print(request.json['endTime'], '--------------------------')

    event_to_change = Event.query.get(id)

    if request.method == 'PATCH':
        event_to_change.imageURL = form.data['imageURL']
        event_to_change.imageURLTwo = form.data['imageURLTwo']
        event_to_change.imageURLThree = form.data['imageURLThree']
        event_to_change.title = form.data['title']
        event_to_change.description = form.data['description']
        event_to_change.startDate = form.data['startDate']
        event_to_change.endDate = form.data['endDate']
        event_to_change.startTime = request.json['startTime']
        event_to_change.endTime = request.json['endTime']
        db.session.commit()

    return jsonify('Updated Event')


@event_routes.route('/<int:id>', methods=['DELETE'])
def delete_event(id):
    currentEvent = Event.query.filter(Event.id == id).delete()
    db.session.commit()
    # print(currentEvent.to_dict())
    return jsonify('Deleted event')
