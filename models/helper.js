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
  
  getTrend(user, weight) {
    let currentTrend = "grey";
    if (user.currentWeight > user.idealWeight) {
      if (Number(weight) < user.currentWeight) {
        currentTrend = "green"
      } else if (Number(weight) > user.currentWeight) {
        currentTrend = "red"
      }
    } else if (user.currentWeight < user.idealWeight) {
      if (Number(weight) < user.currentWeight) {
        currentTrend = "red"
      } else if (Number(weight) > user.currentWeight) {
        currentTrend = "green"
      }
    }
    return currentTrend;
  },
  
  setTime() {
    const currentdate = new Date(); 
    const datetime = currentdate.getFullYear() + "/" + (currentdate.getMonth()+1) + "/" + currentdate.getDate()  + " " + currentdate.getHours() + ":" + currentdate.getMinutes();
    return datetime;
  },
  
  getUpdateTime(){
    const currentdate = new Date(); 
    const updateTime = Math.round(currentdate.getTime()/1000/60/60/24,0)
    return updateTime;
  },
  
  getGoalTime(goalTime) {
    let date = new Date(goalTime); 
    const n = date.getFullYear() + "/" + (date.getMonth()+1)  + "/" + date.getDate();
    return n;
  },
  
  getDaysDifference(time) {
  let date = new Date(time); 
  let daysDifference = Number(date) - Date.now();
  return Math.round(daysDifference/1000/60/60/24,0);
  }
}

module.exports = helper;