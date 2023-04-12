def totalscores():
    return '''SELECT college, score FROM collegeinfo 
            NATURAL JOIN totalscores WHERE collegeinfo.year=? 
            ORDER BY score DESC '''

def matches():
    return '''SELECT
                C1.college AS college1,
                C1.college_abbreviation AS college1Abbrev,
                C2.college AS college2,
                C2.college_abbreviation AS college2Abbrev,
                matches.sport,
                matches.location,
                matches.startTime,
                matches.endTime,
                C3.college AS winner,
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
    return matches() + "WHERE matches.sport=? ORDER BY datetime(startTime) ASC"

def college_matches():
    return matches() + "WHERE (C1.id=? OR C2.id=?) ORDER BY datetime(startTime) ASC"

def winner_matches():
    return matches() + "WHERE C3.id=? ORDER BY datetime(startTime) ASC"

def collegeids():
    return "SELECT id FROM collegeinfo WHERE college=? AND (year=? OR year=0)"

def score_by_id():
    return "SELECT score FROM totalscores WHERE id=?"

def part_score_by_id():
    return "SELECT part_score FROM totalscores WHERE id=?"

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

def count_matches():
    return "SELECT COUNT(*) FROM matches"

def add_match():
    return '''INSERT INTO matches 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'''

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
    return "SELECT * FROM matches WHERE matchid = ?"

def bet_earnings():
    return "SELECT pointsBet, winner FROM bets WHERE netid = ? AND matchid = ?"

def bet_aggregates():
   return "SELECT SUM(pointsBet), winner FROM bets WHERE matchid = ? GROUP BY winner"

def college_participation_score():
    return '''SELECT college, part_score FROM collegeinfo 
            NATURAL JOIN totalscores WHERE collegeinfo.year=? 
            ORDER BY part_score DESC '''

def update_college_participation_score():
    return "UPDATE totalscores SET part_score=? WHERE id=?"

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
    