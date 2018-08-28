'use strict';
const logger = require('../utils/logger.js');
const _ = require('lodash');
const JsonStore = require('./json-store');

const assessmentStore = {
  store: new JsonStore('./models/assessments-store.json', { assessmentsCollection: [] }),
  collection: 'assessmentsCollection',
   
  getAllAssessments() {
    return this.store.findAll(this.collection);
  },
  
  addNewAssessment(assessment) {
    this.store.add(this.collection, assessment);
    this.store.save();
  },

  removeAssessment(assessmentId) {
    const assessment = this.getAssessment(assessmentId);
    this.store.remove(this.collection, assessment);
    this.store.save();
  },
  
  getAssessments(userid) {
     return this.store.findBy(this.collection, { userid: userid });
  },
  
  getAssessment(id) {
     return this.store.findOneBy(this.collection, { id: id });
  },
  
  saveAssessment() {
    this.store.save();
  }
  
}

module.exports = assessmentStore;
