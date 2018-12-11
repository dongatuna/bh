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
            name: user.name,
            //userId: user._id
        },

        JWT_SECRET   
    )
}
module.exports = {

    signUp: async(req, res, next)=>{
        try{

            console.log('console log req value...', req.body)
            const { role, name, email, password } = req.body


            //check if the user exists
            const result = await User.findOne({email})

            console.log("The results is", result)
            
            if(result){
                res.status(404).json({
                    message: "The email has been taken"
                })
            }

            //create new user
            const newUser = new User({
               // _id: new mongoose.Types.ObjectId(),
                role :{
                    type: req.body.role.type,
                    updated: true
                },                
                name,                           
                signupmethod: "local",
                local: {
                    email,
                    password
                }             
            })

            console.log("The new user is: ",newUser)
            await newUser.save()
 
            //Generate the token
            const token = signToken(newUser)
           // console.log(token);
            //Respond with the token
            res.status(200).json({token})
            
        }catch(error){
            res.status(401).json({
                message: "Authentication failed"
            })
        }
    },    

    signIn: async(req, res, next)=>{
        //The signin is handled by passport.js - 
        console.log('here is the req.user', req.user)
        const token = signToken(req.user)
        //console.log(token);

        res.status(200).json({token})
    },

    logOut: async(req, res, next)=>{
        try{

            req.logout()  

            res.status(200).json({
                message: "You have successfully logged out",
                loggedOut: true
            })            
            
        }catch(error){
            
          res.status(401).json({
              message:  "There has been an error loggin out",
              error
            })
        }        
    },

    facebookOAuth: async(req, res, next)=>{
        
        
        const token = signToken(req.user)
        res.status(200).json({token})

    },

    googleOAuth: async(req, res, next) => {
        //Generate token
        
        const token = signToken(req.user)
        res.status(200).json({token})
    },

    updateRole: async(req, res, next) => {
        try{          

            console.log("Here are the results...", req.body)

            await User.update({_id:req.body.id}, {name: req.body.name, 'role.type': req.body.role.type, 'role.updated': req.body.role.updated} /*{ updatedAt:  type: Date, default:  Date.now },*/)

            const user = await User.findById(req.body.id)
            const token = signToken(user)
            res.status(200).json({token})

        }catch(error){
            res.status(401).json({error})
        }        
    } 
}