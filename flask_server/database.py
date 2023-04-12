#!/usr/bin/env python
#-----------------------------------------------------------------------
# database.py
#-----------------------------------------------------------------------
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship


Base = declarative_base()

class Collegeinfo (Base):
    __tablename__ = 'collegeinfo'

    college = Column(String)
    year = Column(Integer)
    population = Column(Integer)
    id = Column(Integer, primary_key=True)
    college_abbreviation = Column(String)

class Sportscores (Base):
    __tablename__ = 'sportscores'

    sport = Column(String, primary_key=True)
    score = Column(Integer)
    icon = Column(String)

class Matches (Base):
    __tablename__ = 'matches'

    matchid = Column(Integer, primary_key=True)
    id1 = Column(Integer)
    id2 = Column(Integer)
    sport = Column(String, ForeignKey('sportscores.sport'))
    location = Column(String)
    startTime = Column(String)
    endTime = Column(String)
    winner = Column(Integer)
    summary = Column(String)
    manager = Column(String)
    qr = Column(String)

    sportscores = relationship('Sportscores')

class Users (Base):
    __tablename__ = 'users'

    netid = Column(String, primary_key=True)
    firstName = Column(String)
    lastName = Column(String)
    role = Column(String)
    college = Column(String)
    participationPoints = Column(Integer)

class Totalscores (Base):
    __tablename__ = 'totalscores'

    id = Column(Integer, ForeignKey('collegeinfo.id'), primary_key=True)
    score = Column(Float)
    part_score = Column(Float)

    collegeinfo = relationship('Collegeinfo')

class Attendance (Base):
    __tablename__ = 'attendance'

    dummyid = Column(Integer, primary_key=True)
    netid = Column(String, ForeignKey('users.netid'))
    matchid = Column(String, ForeignKey('matches.matchid'))
    status = Column(Integer) # 0 (absent), 1 (want to go), 2 (attended)

    users = relationship('Users')
    matches = relationship('Matches')

class Bets (Base):
    __tablename__ = 'bets'

    dummyid = Column(Integer, primary_key=True)
    netid = Column(String, ForeignKey('users.netid'))
    matchid = Column(String, ForeignKey('matches.matchid'))
    pointsBet = Column(Integer)
    winner = Column(Integer)

    users = relationship('Users')
    matches = relationship('Matches')