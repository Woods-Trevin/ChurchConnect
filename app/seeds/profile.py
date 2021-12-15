from app.models import db, Profile
from datetime import datetime



def seed_profiles():
    demoProfile = Profile(
        profilePicture='https://cdn.cnn.com/cnnnext/dam/assets/200127110655-kobe-bryant-4-profile-shot-large-169.jpg', 
        location='1123 hallmark Ln., Houston, Texas, 77002', 
        home_church='Grace and Truth Ministries',
        bio="As a child I always went to church with my mother. The love of christ has helped me through many dark periods in my life. I hope to connect with other faithfuls around the world. If you need prayer please come to me!",
        created_at=datetime.utcnow(),
        user_id=1
    )
    marnie = Profile(
        profilePicture='https://mobirise.com/bootstrap-template/profile-template/assets/images/timothy-paul-smith-256424-1200x800.jpg', 
        location='1123 hallmark Ln., Houston, Texas, 77002', 
        home_church='The Church of Jesus Christ of Latter-day Saints',
        bio="As a child I always went to church with my mother. The love of christ has helped me through many dark periods in my life. I hope to connect with other faithfuls around the world. If you need prayer please come to me!",
        created_at=datetime.utcnow(),
        user_id=2
    )
    bobbie = Profile(
        profilePicture='https://cdn.pixabay.com/photo/2016/12/07/21/01/cartoon-1890438_1280.jpg', 
        location='1123 hallmark Ln., Houston, Texas, 77002', 
        home_church='Synagogue',
        bio="As a child I always went to church with my mother. The love of christ has helped me through many dark periods in my life. I hope to connect with other faithfuls around the world. If you need prayer please come to me!",
        created_at=datetime.utcnow(),
        user_id=3
    )

    db.session.add(demoProfile)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


def undo_profiles():
    db.session.execute('TRUNCATE profiles RESTART IDENTITY CASCADE;')
    db.session.commit()