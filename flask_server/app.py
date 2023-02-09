from flask import Flask, request, jsonify
import sqlite3
from contextlib import closing
import cas
import json
import queries

DATABASE_URL = './table.sqlite'
CURR_YEAR = 2022

#-----------------------------------------------------------------------
app = Flask(__name__)
#-----------------------------------------------------------------------
def jsonify_rows(rows):
    """
    jsonifies the outputs from sqlite table
    """
    return [] if not rows else [dict(result) for result in rows]

def query_db(query, params=None):
    """
    queries database with params
    """
    results = []
    with sqlite3.connect(DATABASE_URL, isolation_level=None,
                        uri=True) as connection:
        with closing(connection.cursor()) as cursor:
            cursor.row_factory = sqlite3.Row
            if params:
                cursor.execute(query, params)
            else:
                cursor.execute(query)
            results = cursor.fetchall()
    return results
#-----------------------------------------------------------------------
@app.route("/totalscores", methods=["GET"])
def get_total_scores():
    """
    gets the total scores 
    """
    output = None
    try:
        result = query_db(queries.totalscores(), [CURR_YEAR])
        output = jsonify({'scores': jsonify_rows(result)})
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(e)), 404
    return output, 200

@app.route("/getpastmatches", methods=["GET"])
def get_past_matches():
    """
    gets the past matches
    """
    output = None
    try:
        result = query_db(queries.past_matches())
        output = json.dumps({'matches': jsonify_rows(result)})
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404
    return output, 200

@app.route("/getfuturematches", methods=["GET"])
def get_future_matches():
    """
    gets the future matches
    """
    output = None
    try:
        result = query_db(queries.future_matches())
        output = json.dumps({'matches': jsonify_rows(result)})
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404
    return output, 200

@app.route("/getunscoredmatches", methods=["GET"])
def get_unscored_matches():
    """
    gets the unscored matches
    """
    output = None
    try:
        result = query_db(queries.unscored_matches())
        output = json.dumps({'matches': jsonify_rows(result)})
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404
    return output, 200

@app.route("/getallsportscores", methods=["GET"])
def get_all_sportscores():
    """
    gets all sports scores
    """
    output = {}
    try:
        result = query_db(queries.all_sport())
        for res in jsonify_rows(result):
            output[res['sport']] = (res['score'], res['icon'])
        
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404
    return output, 200

@app.route("/updatematch", methods=["POST"])
def updatematch():
    """
    updates college scores for an existing match
    """
    output = None
    def get_id(college):
            return query_db(queries.collegeids(), [college, CURR_YEAR])[0][0]

    def updatescore(id, points):
        score = query_db(queries.score_by_id(), [id])[0][0]
        query_db(queries.update_score(), [points + score, id])
        
    try:
        data = request.get_json()
        college1 = data['college1']
        college2 = data['college2']
        sport = data['sport']
        location = data['location']
        winner = data['winner']
        startTime = data['startTime']
        endTime = data['endTime']
        summary = data['summary']

        college_id1 = get_id(college1)
        college_id2 = get_id(college2)
        winner_id = get_id(winner)
        points, icon = query_db(queries.points_per_sport(), [sport])[0]

        # check if match exists already
        params = [college_id1, college_id2, college_id2, college_id1, 
                sport, startTime, endTime, location, summary]
        prev_match = query_db(queries.match_winner(), params)
        
        # if match exists, we subtract points from previous match 
        # and update the winner in matches
        if prev_match:
            matchid, prev_winner_id = prev_match[0][0], prev_match[0][1]
            
            # subtract match score from total score
            if prev_winner_id == -1:
                pass
            elif prev_winner_id == 0:
                updatescore(college_id1, -points/2)
                updatescore(college_id2, -points/2)
            else:
                updatescore(prev_winner_id, -points)

            query_db(queries.update_match_winner(), [winner_id, matchid])
        else: # if match does not exist, we create a new match
            new_matchid = query_db(queries.count_matches())[0][0] + 1
            values = [new_matchid, college_id1, college_id2, sport, 
                    location, startTime, endTime, winner_id, summary]
            query_db(queries.add_match(), values)

        # add points for match
        if winner_id == -1:
                pass
        elif winner_id == 0:
            updatescore(college_id1, points/2)
            updatescore(college_id2, points/2)
        else:
            updatescore(winner_id, points)
        
        output = jsonify({'success': True})
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404
    return output, 200

@app.route("/casauth", methods=["POST"])
def casauth():
    """
    CAS Authentication
    """
    output = None 
    try:
        cas_client = cas.CASClient(
            version=2,
            service_url='https://google.com',
            server_url='https://secure.its.yale.edu/cas/'
        )

        data = request.get_json()
        user, _, _ = cas_client.verify_ticket(data['ticket'])
        response = {
            "username": user,
        }
        output = json.dumps(response)
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404
    return output, 200

@app.route("/userperms", methods=["POST"])
def userperms():
    """
    User perms for yale netid
    """
    output = None
    try:
        data = request.get_json()
        userid = data['userid']
        query = "SELECT role FROM users WHERE netid = \"" + userid + "\""
        perms = query_db(query)
        output = jsonify_rows(perms)[0]
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404
    return output, 200
