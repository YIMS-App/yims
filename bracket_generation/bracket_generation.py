import pandas as pd
from itertools import combinations
import itertools
import random

# read in the CSV file
df = pd.read_csv('schedule.csv')

# create a list of colleges
colleges = ['BF', 'BK', 'BR', 'DC', 'ES', 'GH', 'JE', 'MC', 'MY', 'PC', 'SY', 'SM', 'TD', 'TC']

# divide colleges into divisions
divisions = [colleges[i:i+7] for i in range(0, len(colleges), 7)]

# create a list of sports
sports = list(df['Sport'].unique())

# create a list of dates
dates = list(df['Date'].unique())

# create a dictionary to hold the schedule
schedule = {sport: {date: {time_slot: None for time_slot in range(1, max(df.loc[(df['Sport'] == sport) & (df['Date'] == date)]['Time Slot']) + 1)} for date in dates} for sport in sports}

# keep track of the number of games a college has played on a given date
college_games_per_day = {college: {date: 0 for date in dates} for college in colleges}

# Create a dictionary to hold the time slots for which each college is already scheduled
college_time_slots = {college: set() for college in colleges}

# loop through each sport and schedule the games
for sport in sports:
    for date in dates:
        for time_slot in range(1, max(df.loc[(df['Sport'] == sport) & (df['Date'] == date), 'Time Slot']) + 1):
            # create a list of colleges that are available at this time
            schedule_list = [x for x in list(schedule[sport][date].values()) if x is not None]
            scheduled_colleges = [item for tuple in schedule_list for item in tuple]
            
            available_colleges = [college for college in list(itertools.chain.from_iterable(divisions)) if college not in scheduled_colleges]
            for college in available_colleges:
                if time_slot in college_time_slots[college] or college_games_per_day[college][date] >= 2:
                    available_colleges.remove(college)  

            # if there are at least 2 available colleges, schedule a game
            if len(available_colleges) >= 2:
                college1 = random.choice(available_colleges)
                college2 = None
                available_colleges_div = []

                for div in divisions:
                    if college1 in div:
                        available_colleges_div = [college for college in available_colleges if (college in div and college != college1)]
                print(available_colleges_div)
                if available_colleges_div == []:
                    available_colleges.remove(college1)
                    college1 = random.choice(available_colleges)
                    for div in divisions:
                        if college1 in div:
                            available_colleges_div = [college for college in available_colleges if (college in div and college != college1)]
                if available_colleges_div == []:
                    continue
                else:
                    college2 = random.choice(available_colleges_div)
                # schedule the game
                schedule[sport][date][time_slot] = (college1, college2)

                college_games_per_day[college1][date] += 1
                college_games_per_day[college2][date] += 1

                college_time_slots[college1].add(time_slot)
                college_time_slots[college2].add(time_slot)
                    
# print the schedule
for sport in schedule:
    print(f"{sport}:")
    for date in schedule[sport]:
        print(f"  {date}:")
        for time_slot in schedule[sport][date]:
            colleges = schedule[sport][date][time_slot]
            if colleges is not None:
                college1, college2 = colleges
                print(f"    Time Slot {time_slot}: {college1} vs {college2}")
