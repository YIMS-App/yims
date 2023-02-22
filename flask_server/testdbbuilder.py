#!/usr/bin/env python
#-----------------------------------------------------------------------
# databasebuilder.py
#-----------------------------------------------------------------------
import requests
import pickle
from sys import argv, stderr, exit
from sqlite3 import connect as sqlite_connect
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database import Base, Collegeinfo, Sportscores, Bets, Matches, Users, Totalscores, Attendance
import random
#-----------------------------------------------------------------------

random.seed(10)

FILENAME = 'testtable'
sports = {'soccer': (11, "⚽"), 'flag football': (6, "🏈"), 'spikeball': (6, "🦔"), 
        'cornhole': (6, "🌽")}

colleges = {
    'BF': "Benjamin Franklin", 
    'BK': "Berkeley", 
    'BR': "Branford", 
    'DC': "Davenport",
    'ES': "Ezra Stiles", 
    'GH': "Grace Hopper", 
    }

admins = {
    "ey229", "ag2658", "bmv6", "cmo48", "awx2", "kq44", "mj598"
}

def main():
    try:
        engine = create_engine('sqlite://',
            creator=lambda: sqlite_connect('file:' + FILENAME + '.sqlite?mode=rwc', 
            uri=True))
        Session = sessionmaker(bind=engine)
        session = Session()
        Base.metadata.drop_all(engine)
        Base.metadata.create_all(engine)
        #---------------------------------------------------------------

        # collegeinfo table
        session.add(Collegeinfo(college='NONE', college_abbreviation='NONE', 
                                year=0, population=500, id=-1))
        session.add(Collegeinfo(college='TIE', college_abbreviation='TIE', 
                                year=0, population=500, id=0))
        session.add(Collegeinfo(college='Benjamin Franklin', college_abbreviation='BF', 
                                year=2022, population=500, id=1))
        session.add(Collegeinfo(college='Branford', college_abbreviation='BR', 
                                year=2022, population=500, id=2))
        session.add(Collegeinfo(college='Ezra Stiles', college_abbreviation='ES', 
                                year=2022, population=500, id=3))
        session.add(Collegeinfo(college='Berkeley', college_abbreviation='BK', 
                                year=2022, population=500, id=4))
        session.add(Collegeinfo(college='Davenport', college_abbreviation='DC', 
                                year=2022, population=500, id=5))
        session.add(Collegeinfo(college='Grace Hopper', college_abbreviation='GH', 
                                year=2022, population=500, id=6))
        session.commit()

        # totalscores table
        for i in range(1, 7):
            session.add(Totalscores(id=i, score=0, part_score=0))
        session.commit()

        # sportscores table
        for sport in sports:
            sportscore = Sportscores(sport=sport, score=sports[sport][0], icon=sports[sport][1])
            session.add(sportscore)
        session.commit()

        # matches table
        for i in range(10):
            id1 = "ES"
            id2 = random.choice(list(colleges.keys()))
            sport = random.choice(list(sports.keys()))
            location = "school"
            startTime = "morning"
            endTime = "not morning"
            winner = random.choice([id1, id2])
            manager = random.choice(list(admins))
            match = Matches(matchid=i, id1=id1, id2=id2, sport=sport, location=location,
                startTime=startTime, endTime=endTime, winner=winner, manager=manager)
            session.add(match)
        session.commit()

        # users table
        with open("all.pickle", "rb") as output:
            all_students = pickle.load(output)
            for student in all_students:
                role = "student"
                if student in admins:
                    role = "admin"
                session.add(Users(netid=student, college=all_students[student][0],
                                    role=role, participationPoints= 0))
            session.add(Users(netid="ey229", college="grad",
                                    role="admin", participationPoints=1000))
        session.commit()

        # attendance
        for i in admins:
            for n in range(3):
                matchid = random.choice(range(10))
                dummyid = random.randint(0, 1000000)
                status = random.choice([0,1,2])
                attend = Attendance(netid=i, matchid=matchid, dummyid=dummyid, status=status)
                session.add(attend)
        session.commit()

        # bets
        for i in admins:
            for n in range(3):
                matchid = random.choice(range(10))
                dummyid = random.randint(0, 1000000)
                pointsBet = random.randint(0, 100)
                winner = "ES"
                bet = Bets(netid=i, matchid=matchid, dummyid=dummyid, pointsBet=pointsBet,
                    winner=winner)
                session.add(bet)
        session.commit()

        session.close()
        engine.dispose()
    except Exception as ex:
        print(ex, file=stderr)
        exit(1)

#-----------------------------------------------------------------------

if __name__ == '__main__':
    main()