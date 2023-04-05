import pytest
import requests

from .test_consts import *

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
    assert output['winner'] == "ES"

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

    assert output['matchid'] == 1
    assert output['id1'] == 1
    assert output['id2'] == 2
    assert output['sport'] == "soccer"
    assert output['location'] == "school"
    assert output['startTime'] == "2007-05-08 12:34:29"
    assert output['endTime'] == "2007-05-08 12:35:29"
    assert output['winner'] == 1
    assert output['manager'] == "ey229"

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
    assert output['matches'][0]["startTime"] == "2007-05-08 12:34:29"
    assert output['matches'][0]["endTime"] == "2007-05-08 12:35:29"
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
