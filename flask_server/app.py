from flask import Flask, request, jsonify
import sqlite3
from contextlib import closing
import cas
import json
import queries

from consts import *
from utils import *

#-----------------------------------------------------------------------
app = Flask(__name__)
app.config.update({"DATABASE": DATABASE_URL})
#-----------------------------------------------------------------------
@app.route("/totalscores", methods=["GET"])
def get_total_scores():
    """
    gets the total scores 
    """
    output = None
    try:
        result = query_db(queries.totalscores(), [CURR_YEAR], database_url=app.config['DATABASE'])
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
        result = query_db(queries.past_matches(), database_url=app.config['DATABASE'])
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
        result = query_db(queries.future_matches(), database_url=app.config['DATABASE'])
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
        result = query_db(queries.unscored_matches(), database_url=app.config['DATABASE'])
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
        result = query_db(queries.all_sport(), database_url=app.config['DATABASE'])
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
            return query_db(queries.collegeids(), [college, CURR_YEAR], database_url=app.config['DATABASE'])[0][0]

    def updatescore(id, points):
        score = query_db(queries.score_by_id(), [id], database_url=app.config['DATABASE'])[0][0]
        query_db(queries.update_score(), [points + score, id], database_url=app.config['DATABASE'])   

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
        manager = "ey229"
        qr = "NOT IMPLEMENTED"

        college_id1 = get_id(college1)
        college_id2 = get_id(college2)
        winner_id = get_id(winner)
        points, icon = query_db(queries.points_per_sport(), [sport], database_url=app.config['DATABASE'])[0]

        # check if match exists already
        params = [college_id1, college_id2, college_id2, college_id1, 
                sport, startTime, endTime, location, summary, manager, qr]
        prev_match = query_db(queries.match_winner(), params, database_url=app.config['DATABASE'])
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

            query_db(queries.update_match_winner(), [winner_id, matchid], database_url=app.config['DATABASE'])
        else: # if match does not exist, we create a new match

            # TODO we don't need to manually create a matchid 
            new_matchid = query_db(queries.count_matches(), database_url=app.config['DATABASE'])[0][0] + 1
            values = [new_matchid, college_id1, college_id2, sport, 
                    location, startTime, endTime, winner_id, summary, manager, qr]
            query_db(queries.add_match(), values, database_url=app.config['DATABASE'])

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
        perms = query_db(queries.check_userperms(), [userid], database_url=app.config['DATABASE'])
        output = jsonify_rows(perms)[0]
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404
    return output, 200

@app.route("/getuserdata", methods=["POST"])
def getuserdata():
    """
    Get user data 
    """
    output = {}
    try:
        data = request.get_json()
        netid = data['netid']
        result = query_db(queries.user_info(), [netid], database_url=app.config['DATABASE'])
        output = jsonify_rows(result)[0]
        
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404
    return output, 200

@app.route("/getparticipationpoints", methods=["POST"])
def getparticipationpoints():
    """
    Get user participation points
    """
    output = {}
    try:
        data = request.get_json()
        netid = data['netid']
        result = query_db(queries.user_participation_points(), [netid], database_url=app.config['DATABASE'])
        output = jsonify_rows(result)[0]
        
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404
    return output, 200

@app.route("/getuserbets", methods=["POST"])
def getuserbets():
    """
    Get user bets 
    """
    output = {}
    try:
        data = request.get_json()
        netid = data['netid']
        result = query_db(queries.user_bets(), [netid], database_url=app.config['DATABASE'])
        output = jsonify_rows(result)[0]
        
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404
    return output, 200

@app.route("/getuserevents", methods=["POST"])
def getuserevents():
    """
    Get all matches the user plans to attend/has attended
    """
    output = {}
    try:
        data = request.get_json()
        netid = data['netid']
        result = query_db(queries.user_matches_attended(), [netid], database_url=app.config['DATABASE'])
        output = jsonify_rows(result)
        
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404
    return output, 200

@app.route("/matchinfo", methods=["POST"])
def matchinfo():
    """
    Get all info for a match
    """
    output = {}
    try:
        data = request.get_json()
        matchid = data['matchid']
        result = query_db(queries.match_info(), [matchid], database_url=app.config['DATABASE'])
        output = jsonify_rows(result)[0]
        
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404
    return output, 200

@app.route("/betprofit", methods=["POST"])
def betprofit():
    """
    Get amount a user made on a bet
    """
    output = {}
    try:
        data = request.get_json()
        netid = data['netid']
        matchid = data['matchid']

        match_winner = query_db(queries.match_winner_by_id(), [matchid], database_url=app.config['DATABASE'])[0][0]
        values = jsonify_rows(query_db(queries.bet_earnings(), [netid, matchid], database_url=app.config['DATABASE']))[0]

        if match_winner == values['winner']:
            values['pointsBet'] *= 2
        else:
            values['pointsBet'] = 0 
        output = jsonify({'points_bet': values['pointsBet']})
        
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404
    return output, 200

@app.route("/aggregatebet", methods=["POST"])
def aggregatebet():
    """
    Get total amount of bets for each team
    """
    output = {}
    try:
        data = request.get_json()
        matchid = data['matchid']
        result = query_db(queries.bet_aggregates(), [matchid], database_url=app.config['DATABASE'])
        output = jsonify({'aggregate_bets': jsonify_rows(result)})
        
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404
    return output, 200

@app.route("/getbetbyuser", methods=["POST"])
def getbetbyuser():
    """
    Get a specific bet for a user
    """
    output = {}
    try:
        data = request.get_json()
        netid = data['netid']
        matchid = data['matchid']
        result = query_db(queries.bet_earnings(), [netid, matchid], database_url=app.config['DATABASE'])
        if result:
            output = jsonify_rows(result)[0]
        else:
            output = jsonify({'success': False})
        
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

        score = query_db(queries.part_score_by_id(), [id], database_url=app.config['DATABASE'])[0][0]

        values = [part_score + score, id]
        query_db(queries.update_college_participation_score(), values, database_url=app.config['DATABASE'])
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

        current_points = query_db(queries.user_participation_points(), [netid], database_url=app.config['DATABASE'])[0][0]

        values = [current_points + participationPoints, netid]
        query_db(queries.update_user_participation_points(), values, database_url=app.config['DATABASE'])
        output = jsonify({'success': True})
    
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
        user_in_match = query_db(queries.user_match_attended(), params, database_url=app.config['DATABASE'])
        
        values = [status, netid, matchid]
        if user_in_match:
            query_db(queries.update_participation(), values, database_url=app.config['DATABASE'])
        else:
            #if user is not already in match, add to match
            query_db(queries.add_participation(), values, database_url=app.config['DATABASE'])
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
        exists = data['exists'] # see if a bet exists already

        # check if the user has enough money to make a bet
        money = query_db(queries.user_participation_points(), [netid], database_url=app.config['DATABASE'])[0][0]

        if exists: 
            prev_bet = query_db(queries.bet_earnings(), [netid, matchid], database_url=app.config['DATABASE'])[0][0]
            money += prev_bet
        
        money = money - pointsbet 
        # if user has enough points to bet, allow them to bet and subtract from their total
        if money>=0:
            query_db(queries.update_user_participation_points(), [money, netid], database_url=app.config['DATABASE'])

            if exists:
                values = [pointsbet, winner, netid, matchid]
                query_db(queries.update_bet(), values, database_url=app.config['DATABASE'])
            else:
                values = [netid, matchid, pointsbet, winner]
                query_db(queries.add_bet(), values, database_url=app.config['DATABASE'])
            output = jsonify({'success': True})
        else:
            output = jsonify({'success': False})
    
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404

    return output, 200

@app.route("/getparticipationmatch", methods=["POST"])
def getparticipationmatch():
    """
    Get participation status for a user for a specific match
    """
    output = None 
    try:
        data = request.get_json()
        netid = data['netid']
        matchid = data['matchid']

        params = [netid, matchid]
        result = query_db(queries.user_match_attended(), params, database_url=app.config['DATABASE'])
        
        if result:
                output = jsonify_rows(result)[0]
        else:
            output = jsonify({'success': False})
            
    except Exception as ex:
        print(ex)
        return jsonify(error=404, text=str(ex)), 404
    return output, 200