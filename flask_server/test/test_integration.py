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