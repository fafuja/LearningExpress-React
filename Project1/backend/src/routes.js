const express = require('express');
const multer = require('multer');

const UserController = require('./controllers/UserController');
const EventController = require('./controllers/EventController');
const DashboardController = require('./controllers/DashboardController');
const LoginController = require('./controllers/LoginController');
const RegistrationController = require('./controllers/RegistrationController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectController = require('./controllers/RejectController');
const uploadConfig = require('./config/upload');

const routes = express.Router();
const upload = multer(uploadConfig);
//const parse = multer();

routes.get('/status', (req, res)=>{
    res.send({status: 200})
})

//TODO Registration RejectController

//Registration
routes.post('/event/:eventId/register', RegistrationController.register)
routes.get('/registration/:registrationId', RegistrationController.getRegistrationById)
routes.post('/registration/:registrationId/approve', ApprovalController.approve)
routes.post('/registration/:registrationId/reject', RejectController.reject)

//Login
//routes.post('/login', parse.fields([{name: "email"}, {name: "password"}]), LoginController.store)
routes.post('/login', express.urlencoded({extended: true}), LoginController.store)
/** 
 * ----------------------------------------------------------------------
 * When extended = true, URL-encoded data will be parsed with the qs library.
 * qs library allows you to create a nested object from your query string:
 * Eg.: 
 * var qs = require("qs")
 * var result = qs.parse("person[name]=bobby&person[age]=3")
 * console.log(result) // { person: { name: 'bobby', age: '3' } }
 * ----------------------------------------------------------------------
 * When extended = false, URL-encoded data will instead be parsed with the querystring library.
 * query-string library does not support creating a nested object from your query string:
 * Eg.: 
 * var queryString = require("query-string")
 * var result = queryString.parse("person[name]=bobby&person[age]=3")
 * console.log(result) // { 'person[age]': '3', 'person[name]': 'bobby' }
 * ----------------------------------------------------------------------
 */


//Dashboard
routes.get('/dashboard/:sport', DashboardController.getEventsBySport)
routes.get('/dashboard', DashboardController.getAllEvents)
routes.get('/event/:eventId', DashboardController.getEventById)


//Event
routes.delete('/event/:eventId/delete',  EventController.delete) // BROWSER ALWAYS DO A GET REQUEST.
routes.post('/event',  upload.single("thumbnail"), EventController.createEvent)
// A single file is gonna be uploaded under a thumbnail name

//User
routes.post('/user/register', UserController.createUser)
routes.get('/user/:userId', UserController.getUserById)

//Miscellania
routes.get('/', (req, res)=>{
if (req.query.q) {
        res.send(req.query.q);
    }else{
        res.send('Hello from nodemon');
    }
    
})

//Export
module.exports = routes;