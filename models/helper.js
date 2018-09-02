'use strict';

const logger = require('../utils/logger.js');
const memberStore = require('../models/member-store.js');
const assessmentStore = require('../models/assessments-store.js');
//const accounts = require('../controllers/accounts.js');
const uuid = require('uuid');
//const accounts = require ('../accounts.js');

const helper = {
  checkBMICategory(curentBMI) {
    let category = "";
        if(curentBMI < 16) {
            category = "SEVERELY UNDERWEIGHT";
        } else if (curentBMI >= 16 && curentBMI < 18.5) {
            category = "UNDERWEIGHT";
        } else if (curentBMI >= 18.5 && curentBMI < 25) {
            category = "NORMAL";
        } else if (curentBMI >= 25 && curentBMI < 30) {
            category = "OVERWEIGHT";
        } else if (curentBMI >= 30 && curentBMI < 35) {
            category = "MODERATELY OBESE";
        } else {
            category ="SEVERELY OBESE";
        }
    return category;
  },
  
  idealBodyWeight(loggedInUser) {
    //const loggedInUser = accounts.getCurrentUser(request);
    let baseWeight = loggedInUser.startingweight;
    let idealWeight = 12;
    const increment = 2.3;
    const fiveFtToInch = 60.0;
    const inchHeight = Math.round((loggedInUser.height / 0.0254) * 100.0) / 100.0;
    if (loggedInUser.gender == "M") {
        baseWeight = 50.0;
    } else {
        baseWeight = 45.5;
    }
    if (inchHeight > fiveFtToInch) {
        idealWeight = baseWeight + (increment * (inchHeight - fiveFtToInch));
        idealWeight = Math.round(idealWeight * 10.0) / 10.0;
    } else {
        idealWeight = baseWeight;
    }
    return idealWeight;
  },
  
  getTrend(loggedInUser) {
    loggedInUser.goal = "";
    
  },
  
  setTime() {
    const currentdate = new Date(); 
    const datetime = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + " " + currentdate.getHours() + ":" + currentdate.getMinutes();
    return datetime;
  }
}

module.exports = helper;