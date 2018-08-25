'use strict';

const logger = require('../utils/logger');
const sonatas = require('../models/member-store.js');
const memberCollection = require('../models/member-store.js');
const memberStore = require('../models/member-store');
const uuid = require('uuid');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const viewData = {
      title: 'Member Dashboard',
      members: memberStore.getAllMembers(),
    };
    logger.info('about to render', memberStore.getAllMembers());
    response.render('dashboard', viewData);
  },
  
  deleteMember(request, response) {
    const memberId = request.params.id;
    logger.debug(`Deleting Member ${memberId}`);
    memberStore.removeMember(memberId);
    response.redirect('/dashboard/');
  },
  
  addMember(request, response) {
    const newMember = {
      id: uuid(),
      name: request.body.name,
      assessments: [],
    };
    memberStore.addMember(newMember);
    response.redirect('/dashboard');
    logger.debug('New Member = ', newMember);
  },
  
};

module.exports = dashboard;
