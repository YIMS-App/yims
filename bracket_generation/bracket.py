import pandas as pd 
from itertools import combinations
import random
import copy

SEED = 0
random.seed(SEED)

# read in the CSV file
df = pd.read_csv('schedule.csv')

# # create a list of colleges
colleges = ['BF', 'BK', 'BR', 'DC', 'ES', 'GH', 'JE', 'MC', 'MY', 'PC', 'SY', 'SM', 'TD', 'TC']
# # random.shuffle(colleges)

# # divide colleges into divisions
divisions = [colleges[i:i+7] for i in range(0, len(colleges), 7)]
# colleges = ['BF', 'BK', 'BR', 'DC', 'ES', 'GH', 'JE']
# divisions = [colleges]

# create a list of sports
sports = list(df['Sport'].unique())

# create a list of dates
dates = list(df['Date'].unique())

matches = []
# generate all pairs of colleges within brackets w/ sport 
for sport in sports:
    for div in divisions:
        pairs = list(combinations(div,2))
        for pair in pairs:
            matches.append(tuple(list(pair)+[sport]))
random.shuffle(matches)
print(matches)

class Step:
    def __init__(self, schedule, sport_dict, slot_dict, matches, new_match, match_index, \
        time_index, date_slot_list):
        self.schedule = copy.deepcopy(schedule)
        self.sport_dict = copy.deepcopy(sport_dict)
        self.slot_dict = copy.deepcopy(slot_dict)
        self.matches = copy.deepcopy(matches)
        self.new_match = copy.deepcopy(new_match)
        self.match_index = match_index
        self.time_index = time_index
        self.date_slot_list = copy.deepcopy(date_slot_list)

# create a dictionary to hold the schedule
schedule = {}
for sport in sports:
    for date in dates:
        potential = df.loc[(df['Sport'] == sport) & (df['Date'] == date)]['Time Slot']
        if potential.empty:
            continue
        for time_slot in range(1, max(potential)+ 1):
            if sport not in schedule:
                schedule[sport] = {}
            if date not in schedule[sport]:
                schedule[sport][date] = {}
            schedule[sport][date][time_slot] = None

sport_dict = {date: {c: set() for c in colleges} for date in dates} # date: {id: {sport}}
slot_dict = {date: {c: set() for c in colleges} for date in dates} # date: {id: {slot}}
date_slot_list = []
for date in dates:
    for time_slot in range(1, max(df.loc[(df['Date'] == date), 'Time Slot']) + 1):
        potential = df.loc[(df['Date'] == date)]['Sport']
        if potential.empty:
            continue
        date_slot_list.append((date, time_slot))

step_list = []
match_index = 0
time_index = 0
date, time_slot = date_slot_list[time_index]
step_count = {x:0 for x in range(len(matches))}
while matches:
    
    college_sport = sport_dict[date]
    college_slots = slot_dict[date]

    filled = False
    while not filled and time_index<len(date_slot_list):
        print(len(matches), len(date_slot_list), time_index)
        c1, c2, sport = matches[match_index]

        # valid time_slot
        while time_index < len(date_slot_list) and (date not in schedule[sport] or \
            time_slot not in schedule[sport][date]):
            time_index += 1
            if time_index >= len(date_slot_list):
                break
            date, time_slot = date_slot_list[time_index]
            college_sport = sport_dict[date]
            college_slots = slot_dict[date]

        if time_index >= len(date_slot_list):
            continue 

        # already an event there!
        if schedule[sport][date][time_slot]:
            time_index += 1
            if time_index >= len(date_slot_list):
                continue
            date, time_slot = date_slot_list[time_index]
            college_sport = sport_dict[date]
            college_slots = slot_dict[date]
            continue 

        # cant play more than 2 games a day
        if len(college_slots[c1])==2 or len(college_slots[c2])==2:
            time_index += 1
            if time_index >= len(date_slot_list):
                continue
            date, time_slot = date_slot_list[time_index]
            college_sport = sport_dict[date]
            college_slots = slot_dict[date]
            continue 

        # cant play same sport twice in one day
        if sport in college_sport[c1] or sport in college_sport[c2]:
            time_index += 1
            if time_index >= len(date_slot_list):
                continue
            date, time_slot = date_slot_list[time_index]
            college_sport = sport_dict[date]
            college_slots = slot_dict[date]
            continue 
        
        # cant play games of different sports at same time
        if time_slot in college_slots[c1] or time_slot in college_slots[c2]:
            time_index += 1
            if time_index >= len(date_slot_list):
                continue
            date, time_slot = date_slot_list[time_index]
            college_sport = sport_dict[date]
            college_slots = slot_dict[date]
            continue 

        next_step = Step(schedule, sport_dict, slot_dict, matches, \
            (c1, c2, sport, date, time_slot), match_index, time_index, date_slot_list)
        step_list.append(next_step)

        schedule[sport][date][time_slot] = (c1, c2)
        college_sport[c1].add(sport)
        college_slots[c1].add(time_slot)
        college_sport[c2].add(sport)
        college_slots[c2].add(time_slot)

        matches.pop(match_index)
        date_slot_list.pop(time_index)

        time_index = 0
        date, time_slot = date_slot_list[time_index]

        filled = True
        match_index = 0
        # print(c1, c2, sport, date, time_slot)
        

    # backtrack if failure
    if not filled:
        new_step = step_list.pop()
        schedule = new_step.schedule
        sport_dict = new_step.sport_dict
        slot_dict = new_step.slot_dict
        matches = new_step.matches
        match_index = new_step.match_index # +1
        date_slot_list = new_step.date_slot_list
        time_index = new_step.time_index+1
        if time_index >= len(date_slot_list):
            continue
        date, time_slot = date_slot_list[time_index]
        step_count[len(step_list)]+=1
        # print(step_count)
        # if len(step_list)==31:
        #     print(new_step.new_match, new_step.match_index)

    
for sport in schedule:
    print(f"{sport}:")
    for date in schedule[sport]:
        print(f"  {date}:")
        for time_slot in schedule[sport][date]:
            colleges = schedule[sport][date][time_slot]
            if colleges is not None:
                college1, college2 = colleges
                print(f"    Time Slot {time_slot}: {college1} vs {college2}")