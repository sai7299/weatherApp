This app will show you the weather data for the cities hyd,bengaluru,delhi etc.,

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

##  'Backend'
Before running the code install all the dependencies present in package.json using npm i
    "axios": "^1.7.7",
    "body-parser": "^1.20.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "mongoose": "^8.7.2",
    "node-cron": "^3.0.3"
### 'npm start'
run the app using npm start 

This app in the backend will fetch the data from weather API and store required data for every 5 minutes and we have an api that we call in frontend for every 5 minutes to display the updated weather.

Written cronjob to delete the previous day records in db.
