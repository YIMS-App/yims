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
from database import Base, Collegeinfo, Sportscores, Bets, Matches, Users, Totalscores, Attendance, Metrics
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
        session.add(Collegeinfo(college='NONE', collegeAbbreviation='NONE', 
                                year=0, population=500, id=-1))
        session.add(Collegeinfo(college='TIE', collegeAbbreviation='TIE', 
                                year=0, population=500, id=0))
        session.add(Collegeinfo(college='Benjamin Franklin', collegeAbbreviation='BF', 
                                year=2022, population=500, id=1))
        session.add(Collegeinfo(college='Branford', collegeAbbreviation='BR', 
                                year=2022, population=500, id=2))
        session.add(Collegeinfo(college='Ezra Stiles', collegeAbbreviation='ES', 
                                year=2022, population=500, id=3))
        session.add(Collegeinfo(college='Berkeley', collegeAbbreviation='BK', 
                                year=2022, population=500, id=4))
        session.add(Collegeinfo(college='Davenport', collegeAbbreviation='DC', 
                                year=2022, population=500, id=5))
        session.add(Collegeinfo(college='Grace Hopper', collegeAbbreviation='GH', 
                                year=2022, population=500, id=6))
        session.commit()

        # totalscores table
        for i in range(1, 7):
            session.add(Totalscores(id=i, score=i*10, partScore=i*15))
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
            startTime = "2022-03-08 12:34:29"
            endTime = "2022-03-08 12:35:29"
            score1 = 2
            score2 = 1
            winner = 1
            manager = "ey229"

            match = Matches(id1=id1, id2=id2, sport=sport, location=location,
                startTime=startTime, endTime=endTime, winner=winner, score1 = score1, score2 = score2, manager=manager)
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
                                  college=all_students[student][0],role=role, participationPoints = 1000))
            session.add(Users(netid="ey229", firstName="Edward", lastName = "Yang", college="grad",
                                    role="admin", participationPoints = 1000))
        session.commit()

        # attendance
        for index, i in enumerate(admins):
            matchid = index
            status = index%3

            attend = Attendance(netid=i, matchid=matchid, status=status)
            session.add(attend)
        session.commit()

        # bets
        for index, i in enumerate(admins):

            matchid = index
            pointsBet = index*10
            winner = 1
            bet = Bets(netid=i, matchid=matchid, pointsBet=pointsBet,
                winner=winner)
            session.add(bet)
        session.commit()

        for i in range(3):
            met = Metrics(buttonColor=str(i), views=0, clicks=0)
            session.add(met)
        session.commit()

        session.close()
        engine.dispose()
    except Exception as ex:
        print(ex, file=stderr)
        exit(1)

if __name__ == '__main__':
    initialize()