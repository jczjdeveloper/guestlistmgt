const express = require('express')
const router = express.Router();

const passport = require('passport');
const passportConfig = require('../config/passport');

/**
 * ONLY ALLOW ACCESS TO SECRET ROUTES IF USER IS LOGGED IN
 */
function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

router.all('/*', function(req, res, next){
    loggedIn(req, res, next)
    //next();
});

/**
 * Controllers (route handlers).
 */
// const dashboardController = require('../controllers/dashboard');
// const remindersController = require('../controllers/reminders');
// const eventliveController = require('../controllers/eventlive');
// const eventController = require('../controllers/event');
//const guestController = require('../controllers/guest');


// Secret routes

// router.get('/', dashboardController.getDashboard);
// router.get('/reminders', remindersController.getReminders);
// router.get('/eventlive', eventliveController.getEventlive);
// router.get('/event', eventController.getEvent);
// router.get('/event/:id', eventController.getOne);
// router.post('/event', eventController.postEvent);
// router.put('/event/:id', eventController.updateEvent);
// router.delete('/event/:id', eventController.deleteEvent);
//router.get('/guest', eventController.getGuest);


module.exports = router;
