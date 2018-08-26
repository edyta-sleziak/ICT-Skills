'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const assessmentStore = {
  store: new JsonStore('./models/assessments-store.json', { assessmentCollection: [] }),
  collection: 'memberCollection',
  
  addAssessment(id, assessment) {
    const member = this.getMember(id);
    member.assessments.push(assessment);
    this.store.save();
  },

  removeAssessment(id, assessmentId) {
    const member = this.getMember(id);
    const assessment = member.assessments;
    _.remove(assessment, { id: assessmentId});
    this.store.save();
  },
  
  getAssessments(userid){
     return this.store.findBy(this.collection, { userid: userid });
  }
}