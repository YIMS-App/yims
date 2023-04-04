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

def test_pastmatches():
    r = requests.get(url = TEST_ADDRESS + '/getpastmatches')
    output = r.json()
    # print(output) ## TODO define some actual expected output

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

def test_updatebet():
    data = {}
    data['netid'] = "ey229"
    data['matchid'] = ""