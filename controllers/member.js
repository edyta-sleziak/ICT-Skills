'use strict';

const logger = require('../utils/logger.js');
const memberStore = require('../models/member-store.js');
const helper = require('../models/helper.js');
const assessmentStore = require('../models/assessments-store.js');
const accounts = require('./accounts.js');
const uuid = require('uuid');

const member = {
  index(request, response) {
    const memberId = request.params.id;
    logger.debug('Member id = ', memberId);
    const viewData = {
      title: 'Member',
      member: memberStore.getMember(memberId),
      assessment: assessmentStore.getAssessments(memberId),
    };
    response.render('member', viewData);
  },
  
  deleteAssessment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const assessmentId = request.params.assessmentid;
    logger.debug(`Deleting Assessment ${assessmentId} from Member ${loggedInUser.id}`);
    loggedInUser.assessmentsNumber--;
    assessmentStore.removeAssessment(assessmentId);
    memberStore.saveMember();
    response.redirect('/dashboard');
  },
  
  addAssessment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const BMI = Math.round(Number(request.body.weight) / Math.pow(loggedInUser.height,2)*100)/100;
    //const member = memberStore.getMember(memberId);
    const newAssessment = {
      id: uuid(),
      userid: loggedInUser.id,
      date: helper.setTime(),
      weight: Number(request.body.weight),
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
      comment: "",
    };
    loggedInUser.assessmentsNumber++;
    loggedInUser.currentWeight = Number(request.body.weight);
    loggedInUser.currentBMI = BMI;
    loggedInUser.BMICategory = helper.checkBMICategory(BMI);
    loggedInUser.idealWeight = helper.idealBodyWeight(loggedInUser);
    assessmentStore.addNewAssessment(newAssessment);
    //const viewData = assessmentStore.getAllAssessments();
    memberStore.saveMember();
    assessmentStore.saveAssessment() 
    response.redirect('/dashboard');
    logger.debug('New Assessment = ', newAssessment);
  },
  
  addComment(request, response) {
    const memberId = request.params.id;
    const assessment = assessmentStore.getAssessment(request.params.assessmentid);
    assessment.comment = request.body.comment;
    response.redirect('/member/'+memberId);
  },
  
  addGoal(request, response) {
    const user = memberStore.getMember(request.params.id);
    user.goaldate = request.body.goaldate;
    user.goalweight = request.body.goalweight;
    user.kgsleft = Number(user.currentWeight) - Number(request.body.goalweight);
    memberStore.saveMember();
    response.redirect('/dashboard');
  }

  
};

module.exports = member;