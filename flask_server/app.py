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

@app.route("/getuserdata", methods=["GET"])
def getuserdata():
    """
    Get user data 
    """
    output = {}
    try:
        data = request.get_json()
        netid = data['netid']
        result = query_db(queries.user_info(), [netid])
        output = jsonify_rows(result)[0]
        
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404
    return output, 200

@app.route("/getparticipationpoints", methods=["GET"])
def getparticipationpoints():
    """
    Get user participation points
    """
    output = {}
    try:
        data = request.get_json()
        netid = data['netid']
        result = query_db(queries.user_participation_points(), [netid])
        output = jsonify_rows(result)[0]
        
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404
    return output, 200

@app.route("/getuserbets", methods=["GET"])
def getuserbets():
    """
    Get user bets 
    """
    output = {}
    try:
        data = request.get_json()
        netid = data['netid']
        result = query_db(queries.user_bets(), [netid])
        output = jsonify_rows(result)[0]
        
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404
    return output, 200

@app.route("/getuserevents", methods=["GET"])
def getuserevents():
    """
    Get all matches the user plans to attend/has attended
    """
    output = {}
    try:
        data = request.get_json()
        netid = data['netid']
        result = query_db(queries.user_matches_attended(), [netid])
        output = jsonify_rows(result)[0]
        
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404
    return output, 200

@app.route("/matchinfo", methods=["GET"])
def matchinfo():
    """
    Get all info for a match
    """
    output = {}
    try:
        data = request.get_json()
        matchid = data['matchid']
        result = query_db(queries.match_info(), [matchid])
        output = jsonify_rows(result)[0]
        
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404
    return output, 200

# will need to use the route that gets all match information to get match winner
@app.route("/betprofit", methods=["GET"])
def betprofit():
    """
    Get amount a user made on a bet
    """
    output = {}
    try:
        data = request.get_json()
        netid = data['netid']
        matchid = data['matchid']

        match_winner = query_db(queries.match_winner_by_id(), [matchid])
        points_bet, bet_winner = query_db(queries.bet_earnings(), [netid, matchid])

        if match_winner == bet_winner:
            points_bet *= 2
        output = jsonify_rows(points_bet)[0]
        
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404
    return output, 200

@app.route("/aggregatebet", methods=["GET"])
def aggregatebet():
    """
    Get total amount of bets for each team
    """
    output = {}
    try:
        data = request.get_json()
        matchid = data['matchid']
        result = query_db(queries.match_manager(), [netid, matchid])
        output = jsonify({'aggregate_bets': jsonify_rows(result)})
        
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404
    return output, 200

@app.route("/getbetbyuser", methods=["GET"])
def getbetbyuser():
    """
    Get a specific bet for a user
    """
    output = {}
    try:
        data = request.get_json()
        netid = data['netid']
        matchid = data['matchid']
        result = query_db(queries.bet_earnings(), [netid, matchid])
        output = jsonify(result)[0]
        
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404
    return output, 200

@app.route("/addparticipationpointscollege", methods=["POST"])
def addparticipationpointscollege():
    """
    Add participation points for a specific college
    """
    output = None 
    try:
        data = request.get_json()
        part_score = data['part_score']
        id = data['id']

        values = [part_score, id]
        query_db(queries.update_college_participation_score(), values)
        output = jsonify({'success': True})
    
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404

    return output, 200

@app.route("/addparticipationpointsuser", methods=["POST"])
def addparticipationpointsuser():
    """
    Add participation points for a specific user
    """
    output = None 
    try:
        data = request.get_json()
        participationPoints = data['participationPoints']
        netid = data['netid']

        values = [participationPoints, netid]
        query_db(queries.update_user_participation_points(), values)
        output = jsonify({'success': True})
    
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404

    return output, 200

@app.route("/addbet", methods=["POST"])
def addbet():
    """
    Add a new bet for a particular user for a match
    """
    output = None
    try:
        data = request.get_json()
        netid = data['netid']
        amount = data['amount']
        winner = data['winner']
        matchid = data['matchid']

        # check if the user has enough money to make a bet
        current_points = query_db(queries.user_participation_points(), [netid])

        # if user has enough points to bet, allow them to bet and subtract from their total
        if current_points > amount:
            remaining_points = current_points - amount
            query_db(queries.update_user_participation_points(), [remaining_points, netid])

            values = [netid, matchid, amount, winner]
            query_db(queries.add_bet(), values)

            output = jsonify({'success': True})
        else:
            output = jsonify({'success': False})
    
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404

    return output, 200

@app.route("/updateparticipation", methods=["POST"])
def updateparticipation():
    """
    Update participation status for a user
    """
    output = None 
    try:
        data = request.get_json()
        netid = data['netid']
        status = data['status']
        matchid = data['matchid']

        # check if user exists already in specific match
        params = [netid, matchid]
        user_in_match = query_db(queries.user_match_attended(), params)
        
        values = [status, netid, matchid]
        if user_in_match:
            query_db(queries.update_participation(), values)
        else:
            #if user is not already in match, add to match
            query_db(queries.add_participation(), values)
        output = jsonify({'success': True})
    
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404

    return output, 200

@app.route("/updatebet", methods=["POST"])
def updatebet():
    """
    Update bet information for a user
    """
    output = None 
    try:
        data = request.get_json()
        netid = data['netid']
        matchid = data['matchid']
        pointsbet = data['pointsbet']
        winner = data['winner']

        values = [pointsbet, winner, netid, matchid]
        query_db(queries.update_bet(), values)
        output = jsonify({'success': True})
    
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404

    return output, 200

@app.route("/addparticipation", methods=["POST"])
def addparticipation():
    """
    Add user to attendance database
    """
    output = None 
    try:
        data = request.get_json()
        netid = data['netid']
        status = data['status']
        matchid = data['matchid']

        values = [netid, matchid, status]
        query_db(queries.add_participation(), values)
        output = jsonify({'success': True})
    
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404

    return output, 200