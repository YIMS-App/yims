#!/usr/bin/env python
#-----------------------------------------------------------------------
# testdbbuilder.py
#-----------------------------------------------------------------------
import requests
import pickle
import sys
from sys import argv, stderr, exit
from sqlite3 import connect as sqlite_connect
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
sys.path.append('./')
sys.path.append('./test/')
from database import Base, Collegeinfo, Sportscores, Bets, Matches, Users, Totalscores, Attendance
from test_consts import *
#-----------------------------------------------------------------------
def initialize():

    admins = list(ADMINS)
    admins.sort()
    
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
            id1 = 1
            id2 = 2
            sport = "soccer"
            location = "school"
            startTime = "2007-05-08 12:34:29"
            endTime = "2007-05-08 12:35:29"
            winner = 1
            manager = "ey229"

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
                session.add(Users(netid=student, firstName=all_students[student][1], lastName=all_students[student][2],
                                  college=all_students[student][0],role=role))
            session.add(Users(netid="ey229", firstName="Edward", lastName = "Yang", college="grad",
                                    role="admin", participationPoints = 1000))
        session.commit()

        # attendance
        for index, i in enumerate(admins):

            matchid = index
            dummyid = index*10
            status = index%3

            attend = Attendance(netid=i, matchid=matchid, dummyid=dummyid, status=status)
            session.add(attend)
        session.commit()

        # bets
        for index, i in enumerate(admins):

            matchid = index
            dummyid = index*10
            pointsBet = index*10
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

if __name__ == '__main__':
    initialize()