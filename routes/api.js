const express = require('express')
const router = express.Router();
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: path.join(__dirname, 'uploads') });

const passport = require('passport');
const passportConfig = require('../config/passport');
const apiController = require('../controllers/api');

router.get('/', apiController.getApi);
router.get('/facebook', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);
router.get('/linkedin', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getLinkedin);
router.get('/instagram', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getInstagram);
router.get('/lob', apiController.getLob);
router.get('/upload', apiController.getFileUpload);
router.post('/upload', upload.single('myFile'), apiController.postFileUpload);
router.get('/google-maps', apiController.getGoogleMaps);

module.exports = router;
