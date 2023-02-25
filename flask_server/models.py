from .extensions import db

class TestSportScores(db.Model):
    __test__ = False
    sport = db.Column(db.String, primary_key=True)
    score = db.Column(db.Integer)
    icon = db.Column(db.String)

class TestUsers(db.Model):
    __test__ = False 
    netid = db.Column(db.String, primary_key=True)
    role = db.Column(db.String)
    college = db.Column(db.String)
    participationPoints = db.Column(db.Integer)