def totalscores():
    return '''SELECT college, score FROM collegeinfo 
            NATURAL JOIN totalscores WHERE collegeinfo.year=? 
            ORDER BY score DESC '''

def matches():
    return '''SELECT
                C1.college AS college1,
                C1.collegeAbbreviation AS college1Abbrev,
                C2.college AS college2,
                C2.collegeAbbreviation AS college2Abbrev,
                matches.sport,
                matches.location,
                matches.startTime,
                matches.endTime,
                C3.college AS winner,
                matches.score1, 
                matches.score2,
                matches.summary
            FROM matches
            INNER JOIN collegeinfo AS C1 ON matches.id1 = C1.id
            INNER JOIN collegeinfo AS C2 ON matches.id2 = C2.id
            INNER JOIN collegeinfo AS C3 ON matches.winner = C3.id '''

def past_matches():
    return matches() + "WHERE datetime(endTime) < datetime(\'now\') AND winner!=-1 ORDER BY datetime(endTime) ASC"

def future_matches():
    return matches() + "WHERE datetime(startTime) >= datetime(\'now\') ORDER BY datetime(startTime) ASC"

def unscored_matches():
    return matches() + "WHERE datetime(startTime) < datetime(\'now\') AND winner=-1 ORDER BY datetime(startTime) ASC"

def sport_matches():
    return matches() + "WHERE matches.sport=? AND "

def college_matches():
    return matches() + "WHERE (C1.id=? OR C2.id=?) AND "

def college_sport_matches():
    return matches() + "WHERE (C1.id=? OR C2.id=?) AND matches.sport=? AND "

def time_filter_matches(query):
    if "WHERE" in query:
        return query + "datetime(startTime) >= datetime(?) AND datetime(startTime) <= datetime(?) ORDER BY datetime(startTime) ASC"
    else:
        return query + "WHERE datetime(startTime) >= datetime(?) AND datetime(startTime) <= datetime(?) ORDER BY datetime(startTime) ASC"

def winner_matches():
    return matches() + "WHERE C3.id=? ORDER BY datetime(startTime) ASC"

def collegeids():
    return "SELECT id FROM collegeinfo WHERE college=? AND (year=? OR year=0)"

def score_by_id():
    return "SELECT score FROM totalscores WHERE id=?"

def part_score_by_id():
    return "SELECT partScore FROM totalscores WHERE id=?"

def update_score():
    return "UPDATE totalscores SET score=? WHERE id=?"

def points_per_sport():
    return "SELECT score, icon FROM sportscores WHERE sport=?"

def all_sport():
    return "SELECT sport, score, icon FROM sportscores"

def match_winner():
    return '''SELECT matchid, winner FROM matches 
            WHERE (id1=? OR id1=?) 
            AND (id2=? OR id2=?) 
            AND sport=? 
            AND startTime=?
            AND endTime=?
            AND location=? 
            AND summary=?
            AND manager=?
            AND qr=?'''

def match_winner_by_id():
    return "SELECT winner FROM matches WHERE matchid = ?"

def update_match_winner():
    return "UPDATE matches SET winner=? WHERE matchid=?"

def update_match_scores():
    return "UPDATE matches SET score1=?, score2=? WHERE matchid=?"

def count_matches():
    return "SELECT COUNT(*) FROM matches"

def add_match():
    return '''INSERT INTO matches 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'''

def user_info():
    return "SELECT * FROM users WHERE netid = ?"

def user_participation_points():
    return "SELECT participationPoints FROM users WHERE netid = ?"

def user_bets():
    return "SELECT matchid, pointsBet, winner FROM bets WHERE netid = ?"

def user_matches_attended():
    return "SELECT matchid, status FROM attendance WHERE netid = ?"

def user_match_attended():
    return "SELECT status FROM attendance WHERE netid = ? AND matchid = ?"

def match_info():
    return matches() + "WHERE matchid = ?"

def bet_earnings():
    return "SELECT pointsBet, winner FROM bets WHERE netid = ? AND matchid = ?"

def bet_aggregates():
   return "SELECT SUM(pointsBet), winner FROM bets WHERE matchid = ? GROUP BY winner"

def college_participation_score():
    return '''SELECT college, partScore FROM collegeinfo 
            NATURAL JOIN totalscores WHERE collegeinfo.year=? 
            ORDER BY partScore DESC '''

def update_college_participation_score():
    return "UPDATE totalscores SET partScore=? WHERE id=?"

def update_user_participation_points():
    return "UPDATE users SET participationPoints=? WHERE netid=?"

def add_bet():
    return '''INSERT INTO bets (netid, matchid, pointsBet, winner)
            VALUES (?, ?, ?, ?)'''

def update_participation():
    return "UPDATE attendance SET status=? WHERE netid=? AND matchid=?"

def update_bet():
    return "UPDATE bets SET pointsbet=?, winner=? WHERE netid=? AND matchid=?"
    
def add_participation():
    return '''INSERT INTO attendance (netid, status, matchid)
            VALUES (?, ?, ?)'''

def check_userperms():
    return "SELECT role FROM users WHERE netid=?"
    
def match_attendees():
    return "SELECT firstName, lastName FROM users NATURAL JOIN attendance WHERE matchid=? AND status=1"

def college_id():
    return "SELECT id FROM collegeinfo WHERE collegeAbbreviation=?"
    
def increment_views():
    return "UPDATE metrics SET views=? WHERE buttonColor=?"

def increment_clicks():
    return "UPDATE metrics SET clicks=? WHERE buttonColor=?"

def get_views():
    return "SELECT views FROM metrics WHERE buttonColor=?"

def get_clicks():
    return "SELECT clicks FROM metrics WHERE buttonColor=?"

def get_all_metrics():
    return "SELECT * FROM metrics"