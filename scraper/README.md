If the current `csrf_token` and `people_search_session_cookie` don't work:
login to https://directory.yale.edu/ and get your session cookie associated with `people_search_session_cookie` and get the `csrf_token` from the web page itself. A sample web page is provided in this repo where there is the `csrf_token`. 

If it works, you should see output from execution of the line: `test = api.people(netid='ey2')` with my netid and name in it. 

Run the program (requires pip installation of `yaledirectory` (https://pypi.org/project/yaledirectory/) and `tqdm`) for a specific college id (specified on line 11) by changing the `college` parameter to be the college you want to search through. Each college search should take ~ 5.5 hours. The output is a set of files (26 total) with the first search query for each (ex: aaa0 for netids that start with 'a').

