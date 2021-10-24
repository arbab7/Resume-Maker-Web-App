if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const ExpressError = require('./utils/expressError')
const methodOverride = require('method-override');
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')

const MongoStore = require('connect-mongo');

const resumeRoutes = require('./routes/resumes')
const userRoutes = require('./routes/users')

const Resume = require("./models/resume");

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/ResumeMaker';
// process.env.DB_URL
// 'mongodb://localhost:27017/ResumeMaker'
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(() => {
        console.log("Mongo connected")
    })
    .catch(e => {
        console.log(console.log("error"), e);
    })

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")))
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const secret = process.env.SECRET || 'thisshouldbeabettersecret';

const store = MongoStore.create({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24*60*60
})

store.on('error', e => {
    console.log('Session store error', e);
})

const sessionConfig = {
    store,
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 *60 * 24 *7,
    }
}
app.use(session(sessionConfig))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', userRoutes);
app.use('/resumes', resumeRoutes);

app.get("/", (req, res) => {
    res.render("home")
})

app.all('*', (req, res, next) => {
    next(new ExpressError("Page not found", 404));
})

app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message){
        err.message = "Something went wrong"
    }
    res.status(statusCode).render('error', {err});
})


const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log("App is running")
})