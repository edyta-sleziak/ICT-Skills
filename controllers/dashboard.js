'use strict';

const logger = require('../utils/logger.js');
const memberStore = require('../models/member-store.js');
const assessmentStore = require('../models/assessments-store.js');
const uuid = require('uuid');
const accounts = require ('./accounts.js');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'Member Dashboard',
      member: memberStore.getMember(loggedInUser.id),
      assessments: assessmentStore.getAssessments(loggedInUser.id),
    };
    logger.info('about to render', assessmentStore.getAssessments());
    response.render('dashboard', viewData);
  },
  
  deleteMember(request, response) {
    const memberId = request.params.id;
    logger.debug(`Deleting Member ${memberId}`);
    memberStore.removeMember(memberId);
    response.redirect('/dashboard/');
  },
  
  addMember(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const BMI = (Math.round(Number(request.body.startingweight) / Math.pow(Number(request.body.height),2)*100)/100);
    const newMember = {
      id: request.body.id,
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
      address: request.body.address,
      gender: request.body.gender,
      height: request.body.height,
      startingweight: request.body.startingweight,
      currentBMI: Number(BMI),
      assessmentsNumber: 0,
      assessments: []
    };
    memberStore.addMember(newMember);
    response.redirect('/dashboard');
    logger.debug('New Member = ', newMember);
  },
  
};

module.exports = dashboard;
