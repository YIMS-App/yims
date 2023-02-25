from flask import Flask, request, jsonify, Blueprint
import sqlite3
from contextlib import closing
import cas
import json
import queries

from .models import TestSportScores

CURR_YEAR = 2022

#-----------------------------------------------------------------------
#app = Flask(__name__)
api = Blueprint("api", __name__)
#-----------------------------------------------------------------------
def jsonify_rows(rows):
    """
    jsonifies the outputs from sqlite table
    """
    return [] if not rows else [dict(result) for result in rows]
#-----------------------------------------------------------------------
@api.route("/getallsportscores", methods=["GET"])
def get_all_sportscores():
    """
    gets all sports scores
    """
    output = {}
    try:
        # result = query_db(queries.all_sport())
        result = TestSportScores.query.all()
        for res in jsonify_rows(result):
            output[res['sport']] = (res['score'], res['icon'])
        
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404
    return output, 200

@api.route("/getparticipationpoints", methods=["GET"])
def getparticipationpoints():
    """
    Get user participation points
    """
    output = {}
    try:
        result = TestUsers.query.all()
        output = jsonify_rows(result)[0]
        
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404
    return output, 200