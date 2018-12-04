const express = require("express");
const router = require("express-promise-router")();
const {validateBody, schemas } = require("../helpers/routeHelpers");
const EventController = require("../controllers/events");

//const checkAuth = require('../middleware/check-auth');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./uploads/events/");
    },

    filename: function(req, file, cb){
       // console.log("Please work....", req.body.userId);
        cb(null, new Date().toISOString().replace(/:/g, '-')+file.originalname);
    }
})

const fileFilter = (req, file, cb)=>{

    const acceptedFormats = ['application/msword', 'application/x-mswrite', 
    'text/plain', 'application/pdf', 'image/jpeg', 'image/png' ];
    /*accepted formats:
        - Microsoft Word, Microsoft Wordpad
        - Text File
        - Adobe Portable Document Format
        - Image
    */

    const format = acceptedFormats.includes(file.mimetype);

    console.log("this is the file mimetype ", file.mimetype)
    console.log("This accepted ", format)
    console.log("this is req.file", file)
    
    //debugger
    if(format){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({
    storage,
    limits: {fileSize: 1000000000},
    fileFilter,
    
});


//create a post
//user needs to be authenticated

router.route('/').post(upload.array('eventfiles'), validateBody(schemas.eventSchema), EventController.createEvent);

//validateBody(schemas.eventSchema), 
//read many event
router.route('/').get(EventController.readEvents);
//read a single post
router.route('/:id').get(EventController.readEventById);

//read posts by a single user
//user needs to be authenticated
router.route('/:id').get(EventController.readUserEvents)

//update a post
//user needs to be authenticated
router.route('/:id').patch(EventController.updateEvent)
// router.route('/:id').patch(validateBody(schemas.eventSchema), EventController.updateEvent)
//delete a post
//user needs to be authenticated
router.route('/:id').delete(EventController.deleteEvent);

module.exports = router;


