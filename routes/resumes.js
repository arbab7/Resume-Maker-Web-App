const express = require('express');
const puppeteer = require("puppeteer");
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {validateResume, isLoggedIn, isAuthor} = require('../middleware')
const resumes = require('../controllers/resumes')

router.route('/')
    .get(isLoggedIn, catchAsync(resumes.index))
    .post(isLoggedIn, validateResume, catchAsync(resumes.create));
    
router.get("/new", isLoggedIn, resumes.new)

router.route('/:id')
    .get(isLoggedIn, isAuthor, catchAsync(resumes.show))
    .patch(isLoggedIn, isAuthor, validateResume, catchAsync(resumes.update))
    .delete(isLoggedIn, isAuthor, catchAsync(resumes.delete))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(resumes.edit))

router.get('/:id/pdf', catchAsync(resumes.generatePDF))

router.get('/:id/thisshouldbeabettersecret/tempgeneratePDF', catchAsync(resumes.showPDF))

module.exports = router;