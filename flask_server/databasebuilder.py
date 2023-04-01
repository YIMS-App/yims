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
from database import Base, Collegeinfo, Sportscores, Matches, Users, Totalscores, Attendance
from consts import *
#-----------------------------------------------------------------------

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
        session.add(Collegeinfo(college='Jonathan Edwards', college_abbreviation='JE', 
                                year=2022, population=500, id=4))
        session.add(Collegeinfo(college='Pauli Murray', college_abbreviation='MY', 
                                year=2022, population=500, id=5))
        session.add(Collegeinfo(college='Saybrook', college_abbreviation='SY', 
                                year=2022, population=500, id=6))
        session.add(Collegeinfo(college='Timothy Dwight', college_abbreviation='TD', 
                                year=2022, population=500, id=7))
        session.add(Collegeinfo(college='Berkeley', college_abbreviation='BK', 
                                year=2022, population=500, id=8))
        session.add(Collegeinfo(college='Davenport', college_abbreviation='DC', 
                                year=2022, population=500, id=9))
        session.add(Collegeinfo(college='Grace Hopper', college_abbreviation='GH', 
                                year=2022, population=500, id=10))
        session.add(Collegeinfo(college='Morse', college_abbreviation='MC', 
                                year=2022, population=500, id=11))
        session.add(Collegeinfo(college='Pierson', college_abbreviation='PC', 
                                year=2022, population=500, id=12))
        session.add(Collegeinfo(college='Silliman', college_abbreviation='SM', 
                                year=2022, population=500, id=13))
        session.add(Collegeinfo(college='Trumbull', college_abbreviation='TC', 
                                year=2022, population=500, id=14))
        session.commit()

        # totalscores table
        for i in range(1, 15):
            session.add(Totalscores(id=i, score=0, part_score=0))
        session.commit()

        # sportscores table
        for sport in sports:
            sportscore = Sportscores(sport=sport, score=sports[sport][0], icon=sports[sport][1])
            session.add(sportscore)
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

        session.close()
        engine.dispose()
    except Exception as ex:
        print(ex, file=stderr)
        exit(1)

#-----------------------------------------------------------------------

if __name__ == '__main__':
    main()