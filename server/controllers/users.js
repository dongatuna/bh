const mongoose = require('mongoose')
const User = require('../models/user')
const JWT = require('jsonwebtoken')
const {JWT_SECRET} = require('../configuration/index')

signToken = (user) =>{
    return JWT.sign(        
        {
            iss: "Bridge Health",
            sub: user._id,
            iat: new Date().getTime(), //current time
            exp: new Date().setDate(new Date().getDate()+1), //current time + 1 day ahead            
        },
        JWT_SECRET   
    )
}
module.exports = {

    signUp: async(req, res, next)=>{
        try{

            console.log('console log req value...', req.body)
            const { name, role, email, password, signupmethod, preferences, telephone } = req.body

            console.log("This is the name", name, "email", email, "password", password, "sign up method", signupmethod)
            //check if the user exists
            const result = await User.findOne({email})
            console.log("This is the role type....", req.body.role.type)
            console.log("The results is", result)
            
            if(result){
                res.status(404).json({
                    message: "The email has been taken"
                })
            }

            //create new user
            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                name,  
                role: {
                    type: req.body.role.type,
                    updated: req.body.role.updated
                },                          
                signupmethod,
                local: {
                    email,
                    password
                }, 
                preferences,    
                telephone   
            })            

            await newUser.save()
 
            res.status(200).json({newUser})
            
        }catch(error){
            console.log(error)
            res.status(401).json({
                message: "Authentication failed",
                error
            })
        }
    },    

    signIn: async(req, res, next)=>{
        //The signin is handled by passport.js - 
        console.log('here is the req.user', req.user)
        const user = req.user

        if(user.role.updated){
            const token = signToken(req.user)
            const data = {
                user, token, auth: true
            }
            res.status(200).json({data})
        }
        
        res.status(200).json({user})        
    },

    logOut: async(req, res, next)=>{
        try{

            req.logout()  

            res.status(200).json({
                access_token: null
            })            
            
        }catch(error){
            
          res.status(401).json({
              message:  "There has been an error logging out",
              error
            })
        }        
    },

    facebookOAuth: async(req, res, next)=>{
        
        const user = req.user
        if(user.role.updated){
            const token = signToken(user)
            const data = {
                user, token, auth: true
            }
            res.status(200).json({data})
        }
        
        res.status(200).json({user})

    },

    googleOAuth: async(req, res, next) => {
        //Generate token
        const user = req.user
        if(user.role.updated){
            const token = signToken(user)
            const data = {
                user, token, auth: true
            }
            res.status(200).json({data})
        }
        
        res.status(200).json({user})
    },

    updateRole: async(req, res, next) => {
        try{          

           // console.log("Here are the results...", req.body)
            console.log("Here are the ID...", req.body._id)
            console.log("Here is the name", req.body.name)
            console.log("Here is the type", req.body.role.type)
            console.log("Here is the updated", req.body.role.updated)

            await User.update({_id:req.body._id}, {
                name: req.body.name, 
                telephone: req.body.telephone, 
                preferences: req.body.preference, 
                'role.type': req.body.role.type, 
                'role.updated': req.body.role.updated
            } /*{ updatedAt:  type: Date, default:  Date.now },*/)

            const user = await User.findById(req.body._id)          
            
            const token = signToken(user)

            const data = {
                user,
                token,
                auth: true
            }
            res.status(200).json({data})

        }catch(error){
            res.status(401).json({error})
        }        
    } 
}