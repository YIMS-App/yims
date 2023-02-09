from string import ascii_lowercase
import yaledirectory 
from tqdm import tqdm
import multiprocessing
import pickle

alphanum = ascii_lowercase + '0123456789'

csrf_token = 'sWmLLqOamjPINBqqDww2cnDET1z7F_-LTb0VfrQP8POlqRhkpKHm_d7GlfGk1FmGLRt-mbC0eHMq3iBij_4alg'
people_search_session_cookie = 'lDaxVmSqDT7xL7g0GkcjDsBD%2Fy4wcBFqD9tRUsR%2FpD4cXljBhQJbtTvIm7q8Vi8Ay3qJ32g%2BLaZsyjYdsH1JBkRjlZTydRwYrs5IHpgPBRqC0FXwxxRpnI4qBh4Yd1O9sjyXwpVqsGL2J%2BMy9HwrnWHCtoBsiO57oMgnLRsVQb%2BLM2pG4KYlpswCqKSAcq4DQuC4f5%2FPbdCRha8uwt6kK4ZY4M0Pw%2FVPWos1aSoTBfqjHV5PKX7%2BL8iniEl0kFkf2KG9HVRJu9srLQqhyjXQzmJSEVYDt9VX68tcxjbX%2F0aYEFu1qQVaoTVwjzwjpoQamdkNKMSXDvgdPNlQVxuqKvZVPeaC3khWpoQbC9889VJUsaRW4v0cKBZ2zL0tTggeToLSNi%2F8c2wWp0VWsUqmSEwMMXuRmzHR3fZvxvPRDV3jAmdFV6X7yz%2B41aZxPbRwV%2Bqah3B47Lin%2BGy1%2BgaharR2Ftxz0gIzlbuzs2VCmSAmOq5XokhASobMu7x0FUxbVnB7trWiD23D2tMu1Lr9BA05y91g1%2FfyqxEyEgdibavCs%2BpO%2BhNrRH7uypKRgJKfOZdhvHNqL2tpaMfakZsSTWWcvdVQWQ9U1jOkiIm7NGsZdRoxqFvUajLRQaeGRenO2wMOHvh4e%2FEfF28YshtIOlN1i48plE%2BZnrKCC84UPw2wBvAV3P1Mxg8A%2FUovJ5f92oWmGcShhrUEPb4eyPMWwekozl9fmwzc5yMHhN8wmQmHNDRDUIFTUG%2FbX5%2BtKIEmMk3%2BY5TeUYU4vjrgfyBW5P45HLZq%2FAM5E7Dl6%2BWbQHbyZwguDBGDFhS5cPpNPD%2FI8rt4cqKkAnBxyMFzXRaH4lujduoeLyKLj78hnsakSa6e%2BoNLzsLRrVXuduch2YrDyEc0PYlp1Wq%2BvuMSqk2DX2WqOAlN6yLxJen4IykUXbmLGTBfw%2F6GcSdq6%2B03OZ5jldN4fswrY2RB7L0NaofapI9r6r6t5Xt5DaHsaCWJ0j3B0TdBjdNa7EAp9bMmRvsevlP84bRx1r2bKlU8OIPNW3U3gqhEN8pCGFHOBRBZtWugXZn1gpLYEDiXTTgoca9H3aneGJWEbnhfGIQb0QCtKB3GU2FXhJrrgxhRlRO9Jv4m%2FcrMg0NhN%2BKVbmfKrU4Z%2FsQHzZ3u9CEUpjq2sQnrg9jJO%2BiWu8xvSdYGwHmlCo2zzlCN6wWYtUPsfkKcMVXIovrjMHIVsRqEFL4v%2BoY1OPY1wjv6WgoIza5MGkAOSMN%2Bbi5%2BNUDMPUOb28WJIz0rBf4neVSUhsBjJMOaYJQYnoF%2FZAKSr2p7IbY3Rf6RSqrhquCPDgl7jhpRppW4EorQMYpsv1Co7pTMEutqWMhmGjIPuv%2FP9DhG%2FIKSa8QEke35OLtHK39sLYSSdVM%2BcNpq3dCRQIg%2BPBAmt2YI1aEWv9e%2B%2FDNkrm5aqpA%3D--7inu%2BgfKsRs9%2BdB9--xuGi1PvDYpQBzVEUu5QHUA%3D%3D'
api = yaledirectory.API(people_search_session_cookie, csrf_token)

colleges = {'BF', 'BK', 'BR', 'DC','ES', 'GH', 'JE', 'MC', 'MY', 'PC', 'SY', 'SM', 'TD', 'TC'}

def peopleInfo(queries, college = 'BR'):
    people = {}
    for netid in tqdm(queries):
        test = api.people(netid=netid, college=college)
        for i in test:
            people[i.netid] = (college, i.first_name, i.last_name)
    with open(college + "/" + queries[0]+'.pickle', 'wb') as handle:
        pickle.dump(people, handle)

# for college in colleges:

if __name__ == "__main__":
    test = api.people(netid='ey2')
    for person in test:
        print(person.netid, person.first_name)
    jobs = []
    for x in ascii_lowercase:
        queries = ['']*26*36
        i = 0
        for y in ascii_lowercase:
            for z in alphanum:
                netid = ''+x+y+z
                queries[i]=netid
                i+=1
        peopleInfo(queries)
    #     p = multiprocessing.Process(target = peopleInfo, args = [tuple(queries)])
    #     jobs.append(p)
    # for job in jobs:
    #     job.start()
    # for job in jobs:
    #     job.join()
   