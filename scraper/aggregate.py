import os
import pickle

all_undergrads = {}

for directory in os.walk('.'):
    if directory[0]=='.':
        continue
    for file_name in directory[2]:
        with open(directory[0] + "/" + file_name, "rb") as openfile:
            values = pickle.load(openfile)
            all_undergrads.update(values)
    print(len(all_undergrads))

with open('all.pickle', 'wb') as handle:
        pickle.dump(all_undergrads, handle)