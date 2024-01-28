const Resume = require("../models/resume");
const puppeteer = require("puppeteer");

module.exports.index = async (req, res, next) => {
    const resumeList = await Resume.find({author: req.user._id});
    res.render("resumes/index", {resumeList});
}

module.exports.new = (req, res) => {
    res.render("resumes/new");
}

module.exports.create = async (req, res, next) => {
    const resume = new Resume(req.body);
    resume.author = req.user._id;
    await resume.save();
    req.flash('success', "Successfully made a resume!")
    res.redirect(`/resumes/${resume._id}`)
}

module.exports.show = async(req, res, next) => {
    const resume = await Resume.findById(req.params.id)
    res.render("resumes/show", {resume})
}

module.exports.showPDF = async(req, res, next) => {
    const resume = await Resume.findById(req.params.id)
    res.render("resumes/showPDF", {resume})
}

module.exports.edit = async (req, res, next) => {
    const resume = await Resume.findById(req.params.id);
    res.render("resumes/edit", {resume})
}

module.exports.update = async (req, res, next) => {
    const resume = await Resume.findByIdAndUpdate(req.params.id, req.body, {runValidators: true, new: true});
    await resume.save();
    req.flash('success', 'Successfully updated resume!');
    res.redirect("/resumes/" + req.params.id)
}

module.exports.delete = async (req, res, next) => {
    const resume = await Resume.findById(req.params.id);
    await Resume.findByIdAndDelete(req.params.id);
    req.flash('success', 'Successfully deleted resume!');
    res.redirect("/resumes");
}

module.exports.generatePDF = async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host') + `/resumes/${req.params.id}/thisshouldbeabettersecret/tempgeneratePDF`;
    
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--ignore-certificate-errors']
    });

    const webPage = await browser.newPage();

    await webPage.goto(url, {
        waitUntil: "networkidle0"
    });
    
    const pdf = await webPage.pdf({
        printBackground: true,
        format: "Letter",
        margin: {
            top: "39px",
            bottom: "39px",
            left: "39px",
            right: "38px"
        }
    });

    await browser.close();

    res.contentType("application/pdf");
    res.send(pdf);
    
}