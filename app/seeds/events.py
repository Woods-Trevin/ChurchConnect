from app.models import db, Event
from datetime import time, date



# Adds a demo user, you can add other users here if you want
def seed_events():
    eventOne = Event(
        imageURL='https://donorbox.org/nonprofit-blog/wp-content/uploads/2017/11/Auction-fundraising.jpg',
        imageURLTwo='https://images.template.net/wp-content/uploads/2019/08/church-event-planning-checklist-image.jpg',
        imageURLThree='https://www.churchplaza.com/wp-content/uploads/2019/10/Webp.net-resizeimage-19-1200x900.jpg',
        title="New Church Building Fundraiser",
        description="We welcome everyone to come to our church on the date described below. We are holding yet another fundraising event for our new building fund. Please bring your friends and family so we can make up as much of the difference as possible. Food will be available so bring your kids if necessary!",
        startDate=date(2022, 1, 20),
        endDate= date(2022, 1, 23),
        startTime= time(6, 30, 00),
        endTime= time(9,30,00),
        user_id= 1,
        
    )
    eventTwo = Event(
        imageURL='https://eventective-media.azureedge.net/1885556_lg.jpg',
        imageURLTwo='https://www.nathanwalkerphotography.co.uk/wp-content/uploads/2020/06/Walled-Garden-Wedding-Nottingham-91.jpg',
        imageURLThree='https://i.pinimg.com/originals/1f/56/9b/1f569b403c24bbc04544c92d76d8e479.jpg',
        title="Jeremiah & Amanda Wedding Reception",
        description="We would like to invite all of our church friends and family to participate in our wedding. This will be a 3 day event like most weddings so please join us for the whole time. The best part... bottomless drinks at the bar!!!",
        startDate=date(2022, 6, 15),
        endDate= date(2022, 6, 17),
        startTime= time(6, 30, 00),
        endTime= time(9,30,00),
        user_id= 1,
        
    )
    eventThree = Event(
        imageURL='https://behope.church/wp-content/uploads/2021/05/MovieNight-graphic.jpg',
        imageURLTwo='https://thumbs.dreamstime.com/b/young-people-watching-movie-cinema-theatre-space-text-142248963.jpg',
        imageURLThree='https://cdn.theatlantic.com/thumbor/lj7L_JybhyzTfKkbBfgqoRdKFyI=/0x52:3500x2021/960x540/media/img/mt/2018/04/RTR4VEM7/original.jpg',
        title="Movie Night",
        description="Bring your family and friends!! We are holding a movie night. Dont worry this will not be a christian film but it will be a movie chosen for all ages. We will hold a raffle at our church to choose between a few options so everyone is satisfied with the pick.",
        startDate=date(2022, 5, 12),
        endDate= date(2022, 5, 12),
        startTime= time(6, 30, 00),
        endTime= time(9,30,00),
        user_id= 1,
        
    )
    eventFour = Event(
        imageURL='https://cdn.pixabay.com/photo/2016/03/04/11/10/church-1235843_960_720.jpg',
        imageURLTwo='https://cdn.pixabay.com/photo/2016/03/04/11/10/church-1235844_960_720.jpg',
        imageURLThree='https://i.ytimg.com/vi/R9q5lBy2w1E/maxresdefault.jpg',
        title="Teen Mental Awareness Concert",
        description="We will be holding a momentous event where tiesto, marshmello, and Steve Aoki will perform their musical artistry for all the teens in our community that may be struggling with depression or any mental illnesses. You do not need to have a mental illness to attend. Dont worry but if you are having issues please see one of our on site counselors so they can talk you through this troubled period of your life. ",
        startDate=date(2022, 3, 15),
        endDate= date(2022, 3, 15),
        startTime= time(6, 30, 00),
        endTime= time(10,30,00),
        user_id= 1,
        
    )
    eventFive = Event(
        imageURL='https://donorbox.org/nonprofit-blog/wp-content/uploads/2017/11/Auction-fundraising.jpg',
        imageURLTwo='https://images.template.net/wp-content/uploads/2019/08/church-event-planning-checklist-image.jpg',
        imageURLThree='https://www.churchplaza.com/wp-content/uploads/2019/10/Webp.net-resizeimage-19-1200x900.jpg',
        title="New Covenant Fellowship Canned Food Drive",
        description="As we do twice a year we will be holding our bi-annual 3 day canned food drive. Please come by and spare any canned food that you can so we can feed those in need. ",
        startDate=date(2021, 12, 20),
        endDate= date(2021, 12, 23),
        startTime= time(6, 30, 00),
        endTime= time(9,30,00),
        user_id= 1,
        
    )
    

    db.session.add(eventOne)
    db.session.add(eventTwo)
    db.session.add(eventThree)
    db.session.add(eventFour)
    db.session.add(eventFive)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()
