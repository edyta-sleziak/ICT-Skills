'use strict';

const member = require('../models/member-store');
const trainer = require('../models/trainer-store');
const helper = require('../models/helper.js');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('member', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  register(request, response) {
    //const user = request.body;
    const BMI = Math.round(Number(request.body.startingweight) / Math.pow(Number(request.body.height),2)*100)/100;
    const newMember = {
      id: uuid(),
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
      address: request.body.address,
      gender: request.body.gender,
      height: Number(request.body.height),
      startingweight: Number(request.body.startingweight),
      currentBMI: BMI,
      BMICategory: "",
      idealWeight: 0,
      assessmentsNumber: 0,
      trend: "--",
      assessments: [],
      goaldate: "",
      goalweight: "",
      daysleft: "",
      kgsleft: ""    
    };
    member.addMember(newMember);
    newMember.BMICategory = helper.checkBMICategory(BMI);
    newMember.idealWeight = helper.idealBodyWeight(newMember);
    logger.info(`registering ${newMember.email}`);
    response.redirect('/login');
  },

  authenticate(request, response) {
    const user = member.getMemberByEmail(request.body.email);
    const trainerAccount = trainer.getTrainerByEmail(request.body.email);
    if (user && (user.password == request.body.password)) {
      response.cookie('member', user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect('/dashboard');
    } else if (trainerAccount && (trainerAccount.password == request.body.password)) {
      response.cookie('trainer', trainerAccount.email);
      logger.info(`logging in ${trainerAccount.email}`);
      response.redirect('/trainerdashboard');
    } else {
      response.redirect('/login');
    }
  },
  
  settings(request, response) { 
    const loggedInUser = accounts.getCurrentUser(request);
    //logger.info('rendering settings for user ' + loggedInUser.name);
    const viewData = {
      title: 'Settings',
      member: loggedInUser,
    };
    response.render('settings', viewData);
  },
  
  update(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
      loggedInUser.name = request.body.name,
      loggedInUser.email = request.body.email,
      loggedInUser.password = request.body.password,
      loggedInUser.address = request.body.address,
      loggedInUser.gender = request.body.gender,
      loggedInUser.height = request.body.height,
      loggedInUser.startingweight = request.body.startingweight,
    response.redirect('/settings');
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.member;
    return member.getMemberByEmail(userEmail);
  },
};

module.exports = accounts;