from app.models import db, PrayerRequest



# Adds a demo user, you can add other users here if you want
def seed_prayer_requests():
    prayer_request_one = PrayerRequest(
        description="Please pray for my family and friends around the world that are dealing with covid."
        user_id=1 
    )
    prayer_request_two = PrayerRequest(
        description="My friends child has fallen ill will cancer. Please pray for a speedy recovery"
        user_id=2 
    )
    prayer_request_three = PrayerRequest(
        description="There was an attack on a US Embassy in Afghanistan. Please pray for our sons and daughter keeping the peace in these foreign countries"
        user_id=1 
    )
    prayer_request_four = PrayerRequest(
        description="Pray for me during this exam period. I have put in alot of time into studying"
        user_id=3 
    )
    prayer_request_five = PrayerRequest(
        description="My husband is just finished the AppAcademy Bootcamp and he is actively looking for a new opportunity. Please pray for our family in this transition period "
        user_id=1 
    )
    prayer_request_six = PrayerRequest(
        description="Please pray for the people around the world with nothing to eat or no shelter over their heads."
        user_id=1 
    )
    prayer_request_seven = PrayerRequest(
        description="I am currently quiting my job to be an entrepreneur. Please pray for my family and I in this transition period."
        user_id=3 
    )
    prayer_request_eight = PrayerRequest(
        description="My son is 26 and does nothing but play games. Please pray for him so that he would get serious and focus on being responsible."
        user_id=2 
    )
    
    

    db.session.add(prayer_request_one)
    db.session.add(prayer_request_two)
    db.session.add(prayer_request_three)
    db.session.add(prayer_request_four)
    db.session.add(prayer_request_five)
    db.session.add(prayer_request_six)
    db.session.add(prayer_request_seven)
    db.session.add(prayer_request_eight)

    db.session.commit()



def undo_prayer_requests():
    db.session.execute('TRUNCATE prayer_requests RESTART IDENTITY CASCADE;')
    db.session.commit()