'use strict';

const logger = require('../utils/logger');
const sonatas = require('../models/member-store.js');
const memberCollection = require('../models/member-store.js');
const memberStore = require('../models/member-store');
const uuid = require('uuid');
const accounts = require ('./accounts.js');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'Member Dashboard',
      members: memberStore.getMember(loggedInUser.id),
    };
    logger.info('about to render', viewData);
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
    const newMember = {
      id: request.body.id,
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
      address: request.body.address,
      gender: request.body.gender,
      height: request.body.height,
      startingweight: request.body.startingweight,
      assessments: []
    };
    memberStore.addMember(newMember);
    response.redirect('/dashboard');
    logger.debug('New Member = ', newMember);
  },
  
};

module.exports = dashboard;
