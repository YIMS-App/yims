import pytest

from flask_server.models import TestSportScores

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