'use strict';

const express = require('express');
const router = express.Router();

const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const member = require('./controllers/member.js');
const accounts = require('./controllers/accounts.js');

//router.get('/', accounts.index);
router.get('/', about.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.get('/logout', accounts.logout);

router.get('/dashboard', dashboard.index);
router.get('/settings', accounts.settings);
router.post('/update', accounts.update);
router.get('/about', about.index);

router.get('/member/:id', member.index);
router.get('/member/:id/deleteassessment/:assessmentid', member.deleteAssessment);
router.get('/dashboard/deletemember/:id/', dashboard.deleteMember);
router.post('/member/:id/addassessment', member.addAssessment);
//router.post('/dashboard/addmember', dashboard.addMember);

module.exports = router;
