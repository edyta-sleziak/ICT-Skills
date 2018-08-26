'use strict';

const member = require('../models/member-store');
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
    const user = request.body;
    user.id = uuid();
    member.addMember(user);
    logger.info(`registering ${user.email}`);
    response.redirect('/login');
  },

  authenticate(request, response) {
    const user = member.getMemberByEmail(request.body.email);
    if (user) {
      response.cookie('member', user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect('/dashboard');
    } else {
      //const message = "Incorrect username/password. Please try again.";
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