import pandas as pd 
from itertools import combinations
import random
import copy

# read in the CSV file
df = pd.read_csv('schedule.csv')

# create a list of colleges
colleges = ['BF', 'BK', 'BR', 'DC', 'ES', 'GH', 'JE', 'MC', 'MY', 'PC', 'SY', 'SM', 'TD', 'TC']
random.shuffle(colleges)

# divide colleges into divisions
divisions = [colleges[i:i+7] for i in range(0, len(colleges), 7)]

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

class Step:
    def __init__(self, schedule, sport_dict, slot_dict, matches, new_match, index):
        self.schedule = copy.deepcopy(schedule)
        self.sport_dict = copy.deepcopy(sport_dict)
        self.slot_dict = copy.deepcopy(slot_dict)
        self.matches = copy.deepcopy(matches)
        self.new_match = copy.deepcopy(new_match)
        self.index = index

# create a dictionary to hold the schedule
schedule = {}
for sport in sports:
    for date in dates:
        potential = df.loc[(df['Sport'] == sport) & (df['Date'] == date)]['Time Slot']
        if potential.empty:
            continue
        else:
            for time_slot in range(1, max(potential)+ 1):
                if sport not in schedule:
                    schedule[sport] = {}
                if date not in schedule[sport]:
                    schedule[sport][date] = {}
                schedule[sport][date][time_slot] = None

sport_dict = {date: {c: set() for c in colleges} for date in dates} # date: {id: {sport}}
slot_dict = {date: {c: set() for c in colleges} for date in dates} # date: {id: {slot}}
date_slots = set()
for date in dates:
    for time_slot in range(1, max(df.loc[(df['Date'] == date), 'Time Slot']) + 1):
        date_slots.add((date, time_slot))

step_list = []
index = 0
while matches:
    for date in dates:
        college_sport = sport_dict[date]
        college_slots = slot_dict[date]
        for time_slot in range(1, max(df.loc[(df['Date'] == date), 'Time Slot']) + 1):
            filled = False
            attempt = 0
            while not filled and attempt<10 and attempt+index < len(matches):
                c1, c2, sport = matches[attempt+index]

                # cant play more than 2 games a day
                if len(college_slots[c1])==2 or len(college_slots[c2])==2:
                    attempt+=1
                    continue 

                # cant play same sport twice in one day
                if sport in college_sport[c1] or sport in college_sport[c2]:
                    attempt+=1
                    continue 
                
                # cant play games of different sports at same time
                if time_slot in college_slots[c1] or time_slot in college_slots[c2]:
                    attempt+=1
                    continue 

                # valid time_slot
                if date not in schedule[sport] or time_slot not in schedule[sport][date]:
                    attempt+=1
                    continue 

                # already an event there!
                if schedule[sport][date][time_slot]:
                    attempt+=1
                    continue 
                
                next_step = Step(schedule, sport_dict, slot_dict, matches, \
                    (c1, c2, sport, date, time_slot), attempt+index)
                step_list.append(next_step)

                schedule[sport][date][time_slot] = (c1, c2)
                college_sport[c1].add(sport)
                college_slots[c1].add(time_slot)
                college_sport[c2].add(sport)
                college_slots[c2].add(time_slot)
                matches.pop(attempt+index)
                filled = True

            # backtrack if failure
            if not filled and matches:
                new_step = step_list.pop()
                schedule = copy.deepcopy(new_step.schedule)
                sport_dict = copy.deepcopy(new_step.sport_dict)
                slot_dict = copy.deepcopy(new_step.slot_dict)
                matches = copy.deepcopy(new_step.matches)
                index = new_step.index

    print(len(matches))
    # print(matches)
    
for sport in schedule:
    print(f"{sport}:")
    for date in schedule[sport]:
        print(f"  {date}:")
        for time_slot in schedule[sport][date]:
            colleges = schedule[sport][date][time_slot]
            if colleges is not None:
                college1, college2 = colleges
                print(f"    Time Slot {time_slot}: {college1} vs {college2}")