const mongoose = require('mongoose')
const communityEvent = require("../models/event")
const User = require('../models/user')

module.exports = {
    
    createEvent: async(req, res, next)=>{
        try{
            
            const {userId, topic, description, location, audience, date, time, cost} = req.body
            
            const eventfiles = []
            req.files.forEach(eventFile => {
                console.log("This is the event file...", eventFile)
                eventfiles.push(eventFile.path)
            })
            
            const user = await User.findById(userId)

            if(user.role.type==='employer'){

                const commEvent = new communityEvent({
                    _id: mongoose.Types.ObjectId(),
                    userId,
                    topic,
                    description,
                    location,
                    audience,                
                    date,
                    time,
                    cost, 
                    eventfiles
                })

                await commEvent.save();

                res.status(201).json({ commEvent }) 
            }else{

                res.status(401).json({
                    error: "You must be an employer or an organization to create an event"
                })

                req.logout()
            }                     
        }catch(error){
            res.status(500).json({
                message: "There has been an error saving your event",
                error
            })
        }
    },

    //read single communityEvent 
    readEventById: async(req, res, next)=>{
        
        try{            
            const id = req.params.id;
            const commEvent = await communityEvent.findById(id)/*.populate('userId', 'name')*/;

            res.status(200).json({
                message: "Here is the event you requested",
                //Presenter: commEvent.userId.name,
                commEvent,
                request: {
                    message: "To see all the events, click the link below",
                    type: "GET",
                    url: 'http://localhost:3000/events'
                }
            })
        }catch(error){
            res.status(500).json({
                message: "There has been an error in your request",
                error
            })
        }
    },

    readUserEvents: async(req, res, next)=>{
        try{
            const userExists = await User.find()
        }catch(error){

        }
    },

    //read all the communityEvents
    readEvents: async(req, res, next)=>{        
        try{            
            const commEvents = await communityEvent.find({}) /*.populate("userId", "name");*/

            if(commEvents.length <1){
                return res.status(404).json({
                    message: "No communityEvents at this moment"
                })
            }

            res.status(200).json({
                count: commEvents.length,
                commEvents
            })
          

        }catch(error){
            res.status(500).json({
                message:"There has been an error fetching the data",
                error
            })
        }
    },
    
    //update a communityEvent
    updateEvent: async(req, res, next)=>{
        
        try{
            const id = req.params.id
            const communityEvent  = await findByIdAndUpdate(id, req.value.body,{new: true})
            //console.log and check if communityEvent is ok
            console.log("This is event.ok", communityEvent.ok);

            res.status(200).json({
                request:{
                    message:  "To see your updated event, click link below",
                    type: "GET",
                    link: "http://localhost:3000/events"+id
                }
            })

        }catch(error){
            res.status(500).json({
                message: "There has been an error updating the resume",
                error
            })
        }
    },

    //delete a communityEvent
    deleteEvent: async(req, res, next)=>{
        
        try{
            const id = req.params.id

            const event = await communityEvent.findById(id)

            if(req.user._id.equals(event.userId)){

                const result = await communityEvent.remove({_id: id})

                if(result.ok){
                    res.status(200).json({
                        message: "The event has been removed",
                        request:{
                            message: "Use the url link below to create a new event",
                            type: "POST",
                            link: "http://localhost:3000/events"
                        }
                    })
                }
            }            

        }catch(error){
            res.status(500).json({
                message: "There has been an error deleting your communityEvent",
                error
            })
        }

    },

    eventsByUser: async(req, res, next)=>{
        try{
            const userEvents = await communityEvent.find({userId: req.params.user_id})/*.populate("userId");*/

            if(userEvents.length<1){
                return res.status(500).json({
                    message: "You have no events you have created at this moment",
                    request:{
                        type: "GET",
                        message: "Click on the link below to create an event",
                        link: "http://localhost:3000/events"
                    }            
                })
            }

            res.status(200).json({
                message: "You have "+userEvents.length,
                yourEvents:userEvents.map(event=>{
                    return{                        
                        event,                        
                    }
                })
    
            })           
            
        }catch(error){
            res.status(500).json({
                message: "There has been an error fetching events by you",
                error
            });
        }
    }

}