import pytest
import requests

from .test_consts import *

from .testdbbuilder import initialize
from .test_utils import *
from .test_consts import *
from flask_server.queries import part_score_by_id

def test_userinfo():

    data = {'netid': "ey229"}
    r = requests.post(url = TEST_ADDRESS + '/getuserdata', json = data)
    output = r.json()

    assert output['netid'] == "ey229"
    assert output['role'] == "admin"
    assert output['college'] == "grad"
    assert output['participationPoints'] == 1000

def test_userbets():

    data = {'netid': "ey229"}
    r = requests.post(url = TEST_ADDRESS + '/getuserbets', json = data)
    output = r.json()

    assert output['matchid'] == "4"
    assert output['pointsBet'] == 40
    assert output['winner'] == 1

def test_participationpoints():

    data = {'netid': 'ey229'}
    r = requests.post(url = TEST_ADDRESS + '/getparticipationpoints', json = data) 
    output = r.json()

    assert output['participationPoints'] == 1000

def test_userevents():

    data = {'netid': 'ey229'}
    r = requests.post(url = TEST_ADDRESS + '/getuserevents', json = data) 
    output = r.json()

    assert output[0]['matchid'] == "4"
    assert output[0]['status'] == 1

def test_matchinfo():

    data = {'matchid': '1'}
    r = requests.post(url = TEST_ADDRESS + '/matchinfo', json = data) 
    output = r.json()

    assert output['college1'] == "Benjamin Franklin"
    assert output['college1Abbrev'] == "BF"
    assert output['college2'] == "Branford"
    assert output['college2Abbrev'] == "BR"
    assert output['sport'] == "soccer"
    assert output['location'] == "school"
    assert output['startTime'] == "2022-03-08 12:34:29"
    assert output['endTime'] == "2022-03-08 12:35:29"
    assert output['score1'] == 2
    assert output['score2'] == 1
    assert output['winner'] == "Benjamin Franklin"

def test_totalscores():
    
    r = requests.get(url = TEST_ADDRESS + '/totalscores')
    output = r.json()

    assert output['scores'][0]["college"] == "Grace Hopper"
    assert output['scores'][0]["score"] == 60.0

def test_futurematches():
    
    r = requests.get(url = TEST_ADDRESS + '/getfuturematches')
    output = r.json()

    # TODO: fill out the database so there are actually are matches in the future, change this test once that's done as well
    assert output['matches'] == []
  
def test_unscoredmatches():

    r = requests.get(url = TEST_ADDRESS + '/getunscoredmatches')
    output = r.json()
    
    # TODO: fill out the database so there are actually are unscored matches, change this test once that's done as well
    assert output['matches'] == []

def test_allsportsscores():
    
    r = requests.get(url = TEST_ADDRESS + '/getallsportscores')
    output = r.json()
    print(output)

    assert output['cornhole'][0] == 6
    assert output['cornhole'][1] == "🌽"

def test_pastmatches():
    
    r = requests.get(url = TEST_ADDRESS + '/getpastmatches')
    output = r.json()

    assert output['matches'][0]["college1"] == "Benjamin Franklin"
    assert output['matches'][0]["college1Abbrev"] == "BF"
    assert output['matches'][0]["college2"] == "Branford"
    assert output['matches'][0]["college2Abbrev"] == "BR"
    assert output['matches'][0]["sport"] == "soccer"
    assert output['matches'][0]["location"] == "school"
    assert output['matches'][0]["startTime"] == "2022-03-08 12:34:29"
    assert output['matches'][0]["endTime"] == "2022-03-08 12:35:29"
    assert output['matches'][0]["winner"] == "Benjamin Franklin"

def test_addmatch():
    data = {} 
    data['college1'] = "Ezra Stiles"
    data['college2'] = "Ezra Stiles"
    data['sport'] = 'soccer'
    data['location'] = 'here'
    data['winner'] = "Ezra Stiles"
    data['startTime'] = "2030-05-08 12:34:29"
    data['endTime'] = "2030-05-09 12:34:29"
    data['score1'] = 1
    data['score2'] = 2
    data['summary'] = ""

    r = requests.post(url = TEST_ADDRESS + '/updatematch', json = data)
    # print(r.json())

def test_getbetbyuser_false():
    data = {'netid': "ey229", "matchid": 1}
    r = requests.post(url = TEST_ADDRESS + '/getbetbyuser', json = data)
    # print(r.json()) # didn't bet on this so expect false 

def test_getbetbyuser_true():
    data = {'netid': "awx2", "matchid": 1}
    r = requests.post(url = TEST_ADDRESS + '/getbetbyuser', json = data)
    # print(r.json()) # bet on this so expect true 

def test_userperms():
    data = {'userid': "ey229"}
    r = requests.post(url = TEST_ADDRESS + '/userperms', json = data)
    # print(r.json()) # didn't bet on this so expect true 

def test_getuserdata():
    data = {'netid': "ey229"}
    r = requests.post(url = TEST_ADDRESS + '/getuserdata', json = data)
    # print(r.json()) # didn't bet on this so expect true 

def test_getuserbets():
    data = {'netid': "ey229"}
    r = requests.post(url = TEST_ADDRESS + '/getuserbets', json = data)
    print(r.json()) # didn't bet on this so expect true 

def test_updatebet_fail():
    data = {}
    data['netid'] = "ey229"
    data['matchid'] = 4
    data['pointsbet'] = 1050
    data['winner'] = 1
    data['exists'] = True
    r = requests.post(url = TEST_ADDRESS + '/updatebet', json = data)
    print(r.json()) # didn't bet on this so expect true 

def test_updatebet_success():
    data = {}
    data['netid'] = "ey229"
    data['matchid'] = 4
    data['pointsbet'] = 1040
    data['winner'] = 1
    data['exists'] = True
    r = requests.post(url = TEST_ADDRESS + '/updatebet', json = data)
    print(r.json()) # didn't bet on this so expect true 

def test_updatebet_success():
    data = {}
    data['netid'] = "ey229"
    data['matchid'] = 5
    data['pointsbet'] = 10
    data['winner'] = 1
    data['exists'] = False
    r = requests.post(url = TEST_ADDRESS + '/updatebet', json = data)
    print(r.json()) # didn't bet on this so expect true 

# TODO need a way to test for failure case which is currently not handled
def test_betprofit_success():
    data = {}
    data['netid'] = "ey229"
    data['matchid'] = 4
    r = requests.post(url = TEST_ADDRESS + '/betprofit', json = data)
    print(r.json()) # didn't bet on this so expect true 


def test_addparticipationpointscollege():
    initialize()
    id = 1
    data = {'id': id, 'part_score': 10}
    r = requests.post(url = TEST_ADDRESS + '/addparticipationpointscollege', json = data)
    score = query_db(part_score_by_id(), [id], database_url=TEST_DATABASE_URL)

    assert jsonify_rows(score)[0]['part_score'] == 25.0

def test_updateparticipation():
    data = {'netid': "ey229", 'status': 2, 'matchid':4}
    r = requests.post(url = TEST_ADDRESS + '/updateparticipation', json = data)
    print(r.json())

def test_addparticipationpointsuser():
    data = {'netid': "ey229", 'participationPoints': 10}
    r = requests.post(url = TEST_ADDRESS + '/addparticipationpointsuser', json = data)
    print(r.json())

def test_aggregatebet():
    data = {'matchid':4}
    r = requests.post(url = TEST_ADDRESS + '/aggregatebet', json = data)
    print(r.json())

def test_getparticipationmatch():

    data = {'netid': 'ey229', 'matchid':4}
    r = requests.post(url = TEST_ADDRESS + '/getparticipationmatch', json = data) 
    output = r.json()

    assert output['status'] == 2

def test_collegeparticipation():
    
    r = requests.get(url = TEST_ADDRESS + '/getcollegeparticipation')
    output = r.json()

    assert output['scores'][0]["college"] == "Grace Hopper"
    assert output['scores'][0]["part_score"] == 90.0
