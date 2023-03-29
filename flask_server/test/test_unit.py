import pytest

from .testdbbuilder import initialize
from .test_utils import *
from .test_consts import *
from flask_server.queries import user_info, user_bets

def test_userinfo():
    initialize()
    netid = "ey229"
    result = query_db(user_info(), [netid], TEST_DATABASE_URL)
    output = jsonify_rows(result)[0]

    assert output['netid'] == "ey229"
    assert output['firstName'] == "Edward"
    assert output['lastName'] == "Yang"
    assert output['role'] == "admin"
    assert output['college'] == "grad"
    assert output['participationPoints'] == 1000

def test_userbets():
    initialize()
    netid = "ey229"
    result = query_db(user_bets(), [netid], TEST_DATABASE_URL)
    output = jsonify_rows(result)
    output = output[0]

    assert output['matchid'] == "4"
    assert output['pointsBet'] == 40
    assert output['winner'] == "ES"