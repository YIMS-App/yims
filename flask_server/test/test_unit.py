import pytest

from flask_server.models import TestSportScores, TestUsers

def test_new_scores():
    data = {
        "sport": "flag football",
        "score": 6,
        "icon": "🏈"
    }

    test = TestSportScores(
        sport=data["sport"],
        score=data["score"],
        icon=data["icon"]
    )

    assert test.sport == data["sport"]
    assert test.score == data["score"]
    assert test.icon == data["icon"]

def test_new_users():
    data = {
        "netid": "test_user",
        "role": "admin",
        "college": "Ezra Stiles",
        "participationPoints": 10,
    }

    test = TestUsers(
        netid=data["netid"],
        role=data["role"],
        college=data["college"],
        participationPoints=data["participationPoints"]
    )

    assert test.netid == data["netid"]
    assert test.role == data["role"]
    assert test.college == data["college"]
    assert test.participationPoints == data["participationPoints"]