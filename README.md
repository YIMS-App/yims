[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=8957150&assignment_repo_type=AssignmentRepo)

# YIMS
##### An IOS and Android compatible App for Yale Intramural Sports.
##### Created By: Edward Yang (Project Leader), Anna Xu, Bienn Viquiera, Mary Jiang, Kelly Qiang, and Cierra Ouellette; Alejandro Gonzalez (Last Semester)

## Run YIMS on your local computer

1. Clone our repository on Github
1. Download Expo Go on your IOS or Android Phone
  1. Additionally you can run the app on your laptop via IOS and Android Simulators. To run the IOS simulator, follow these steps: https://docs.expo.dev/workflow/ios-simulator/. To run the Android Simulator, follow these steps: https://docs.expo.dev/workflow/android-studio-emulator/
  
1. Follow the steps here to install the Expo CLI npm https://docs.expo.dev/get-started/installation/
1. cd into the app directory of the project folder in your terminal
1. run 'npm install --legacy-peer-deps' in your terminal
1. run 'npx expo start' in your terminal

NOTE: in order to make the QR code work for you locally, replace the url beginning with 'exp://' in QRCodeModal with the url beginning with 'exp://' generated when you run npx expo start.

## How to use YIMS 
Check out the About Page and the How To Play page for more information on our app as well as information on Yale Intramural Sports. For more questions, contact one of us. 

## How to test
Run 'npm run test' in your terminal for frontend tests.

To run backend tests:
1. cd into the 'flask_server' directory in your terminal
2. run 'python3 test/testdbbuilder.py' in your terminal (or whatever command you use in your terminal to run python 3)
3. run 'python3 run_server.py --database test/testtable.sqlite' in your terminal (or whatever command you use in your terminal to run python 3)
4. in another terminal while the server is running, make sure you are again in the 'flask_server' directory and run 'pytest .' in your terminal

## How to add a test
1. go to 'test_integration.py'. 'test_unit.py' is only for query testing, so we instead test the routes which use the queries in 'test_integration.py'.
2. Add a new test for the desired route you want to test. Include the data needed for queries, then perform assertions on the outputted JSON to ensure the output is correct. 
3. run the test by following the instructions in "How to test". 

to add frontend tests, create or go to the \_\_tests\_\_ folder for the component that you wish to test
and name the test Component.test.js where Component is the name of your component.
start with the template below, and then write the body of the test depending on your component:
```
import React from 'react'
import { render, screen, cleanup } from '@testing-library/react-native'
import Component from '../Component'

afterEach(() => {
  cleanup()
})

test('Should render Component component', () => {
    // render component here
    // write test here according to jest docs: https://jestjs.io/docs/tutorial-react
})
```

## Metrics Milestone

On the backend we are keeping track of number of times a version of a button has been loaded and number of times a version of a button has been clicked. We are then using epsilon greedy mutli arm bandit to choose the optimal button (highest value, which is times clicked / times seen) with probability 1 - epsilon, and then choosing a random button with probability epsilon. That code is in the route /getbestbutton, while the metrics are stored in the Metrics table in our database. Times viewed and clicked are both post requests with /incrementviews and /incrementclick respectively. 

## Software Stack
Frontend: React Native.js
Backend: Flask, Python, Amazon EC2 instance

## Additional Notes
Disregard the flask-server directory (as in do not try to run the server from your local computer). This is because the server is already running on an Amazon EC2 instance.

