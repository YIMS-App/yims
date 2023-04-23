#!/usr/bin/env python
#-----------------------------------------------------------------------
# dummydbbuilder.py
#-----------------------------------------------------------------------
import requests
import pickle
import json
import random
import sys
from sys import argv, stderr, exit
from sqlite3 import connect as sqlite_connect
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
sys.path.append('./')
sys.path.append('./test/')
from database import Base, Collegeinfo, Sportscores, Bets, Matches, Users, Totalscores, Attendance, Metrics
from dummy_consts import *
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
        session.add(Collegeinfo(college='Jonathan Edwards', collegeAbbreviation='JE', 
                                year=2022, population=500, id=4))
        session.add(Collegeinfo(college='Pauli Murray', collegeAbbreviation='MY', 
                                year=2022, population=500, id=5))
        session.add(Collegeinfo(college='Saybrook', collegeAbbreviation='SY', 
                                year=2022, population=500, id=6))
        session.add(Collegeinfo(college='Timothy Dwight', collegeAbbreviation='TD', 
                                year=2022, population=500, id=7))
        session.add(Collegeinfo(college='Berkeley', collegeAbbreviation='BK', 
                                year=2022, population=500, id=8))
        session.add(Collegeinfo(college='Davenport', collegeAbbreviation='DC', 
                                year=2022, population=500, id=9))
        session.add(Collegeinfo(college='Grace Hopper', collegeAbbreviation='GH', 
                                year=2022, population=500, id=10))
        session.add(Collegeinfo(college='Morse', collegeAbbreviation='MC', 
                                year=2022, population=500, id=11))
        session.add(Collegeinfo(college='Pierson', collegeAbbreviation='PC', 
                                year=2022, population=500, id=12))
        session.add(Collegeinfo(college='Silliman', collegeAbbreviation='SM', 
                                year=2022, population=500, id=13))
        session.add(Collegeinfo(college='Trumbull', collegeAbbreviation='TC', 
                                year=2022, population=500, id=14))
        session.commit()

        # sportscores table
        for sport in sports:
            sportscore = Sportscores(sport=sport, score=sports[sport][0], icon=sports[sport][1])
            session.add(sportscore)
        session.commit()

        # parsing matches
        matches = []
        matchesFile = open("test/dummymatches.json")
        matchesData = json.load(matchesFile)
        for doc in matchesData['matches']:
            match = {}
            for key, value in doc.items():
                match[key] = value
            matches.append(match)

        # matches table
        for match in matches:
            matchEntry = Matches(id1=match['id1'], id2=match['id2'], sport=match['sport'],  location=match['location'],
                startTime=match['startTime'], endTime=match['endTime'], winner=match['winner'], score1 = match['score1'], score2 = match['score2'], manager=match['manager'])
            session.add(matchEntry)
        

        # calculate totalscores from matches
        calculatedScores = {}
        for i in range(1, 15):
            calculatedScores[i] = 0

        for match in matches:
            value = sports[match['sport']][0]
            winner = match['winner']

            calculatedScores[winner] = calculatedScores[winner] + value

        # totalscores table
        for i in range(1, 15):
            score = calculatedScores[i]
            partScore = score + random.randint(-10,10)
            if partScore < 0:
                partScore = 0
            session.add(Totalscores(id=i, score=score, partScore=partScore))
        session.commit()

        # users table
        users = []
        with open("all.pickle", "rb") as output:
            all_students = pickle.load(output)
            users = all_students
            for student in all_students:
                role = "student"
                if student in admins:
                    role = "admin"
                session.add(Users(netid=student, firstName=all_students[student][1], lastName=all_students[student][2],
                                  college=all_students[student][0],role=role, participationPoints = random.randint(0,100)))
            session.add(Users(netid="ey229", firstName="Edward", lastName = "Yang", college="grad",
                                    role="admin", participationPoints = random.randint(0,100)))
        session.commit()

        # attendance
        netids = list(users.keys())
        for i in range(1, len(matches) + 1):
            numberAttended = random.randint(4,10)
            
            attended = set()
            for j in range(numberAttended):
                attended.add(random.choice(netids))
                if i == 2 or i == 7:
                    for student in admins:
                        attended.add(student)
            
            for netid in netids:
                status = 0
                if netid in attended:
                    status = random.randint(1,2)
                if netid in admins and netid in attended:
                    status = 2
                attend = Attendance(netid=netid, matchid=i, status=status)
                session.add(attend)
        session.commit()

        # bets
        for i in range(1, len(matches) + 1):
            numberBet = random.randint(4,10)
            usersBet = set()
            for j in range(numberBet):
                usersBet.add(random.choice(netids))

            for user in usersBet:
                ids = [matches[i - 1]['id1'], matches[i - 1]['id2']]
                bet = Bets(netid=user, matchid=i, pointsBet=random.randint(1,15), winner=random.choice(ids))
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