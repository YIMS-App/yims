from .extensions import db

class TestSportScores(db.Model):
    __test__ = False
    sport = db.Column(db.String, primary_key=True)
    score = db.Column(db.Integer)
    icon = db.Column(db.String)