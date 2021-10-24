const Resume = require("./models/resume");
const {resumeSchema} = require("./schemas");
const ExpressError = require('./utils/expressError')

module.exports.validateResume = (req, res, next) => {
    const {error} = resumeSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(', ');
        throw new ExpressError(msg, 400)
    }else{
        next()
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be logged in')
        return res.redirect('/login')
    }
    next();
}

module.exports.isNotLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        req.flash('error', 'You are already logged in')
        return res.redirect('/resumes')
    }
    next();
}

module.exports.isAuthor = async(req, res, next) => {
    const {id} = req.params;
    try{    
        const resume = await Resume.findById(id);
        if(!(resume.author.equals(req.user._id))){
            req.flash('error', "You are not allowed to do that")
            return res.redirect('/resumes')
        } 
    }catch(e){
        req.flash("error", "Couldn't find the resume")
        return res.redirect('/resumes')
    }
    
    next();
  
}