'use strict';

const logger = require('../utils/logger');
const memberStore = require('../models/member-store');
const uuid = require('uuid');

const member = {
  index(request, response) {
    const memberId = request.params.id;
    logger.debug('Member id = ', memberId);
    const viewData = {
      title: 'Member',
      member: memberStore.getMember(memberId),
    };
    response.render('member', viewData);
  },
  
   deleteAssessment(request, response) {
    const memberId = request.params.id;
    const member = memberStore.getMember(memberId);
    const assessmentId = request.params.assessmentid;
    logger.debug(`Deleting Assessment ${assessmentId} from Member ${memberId}`);
    member.assessmentsNumber--;
    memberStore.removeAssessment(memberId, assessmentId);
    response.redirect('/member/' + memberId);
  },
  
  addAssessment(request, response) {
    const memberId = request.params.id;
    const member = memberStore.getMember(memberId);
    const newAssessment = {
      id: uuid(),
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
    };
    member.assessmentsNumber++,
    member.currentBMI = (Math.round(Number(request.body.weight) / Math.pow(Number(member.height),2)*100)/100),
    memberStore.addAssessment(memberId, newAssessment);
    response.redirect('/member/' + memberId);
    logger.debug('New Assessment = ', newAssessment);
  },
  
  
  
  
  

  
};

module.exports = member;