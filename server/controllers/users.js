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

            console.log('console log req value...', req)
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
            res.status(200).json({auth:true, token, user})
            
        }catch(error){
            res.status(401).json({
                message: "Authentication failed"
            })
        }
    },    

    signIn: async(req, res, next)=>{
        //The signin is handled by passport.js - 
        console.log('here is the req.user', req.user)
        const user = req.user
        const token = signToken(req.user)
        //console.log(token);

        res.status(200).json({auth:true, token, user})
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
        const token = signToken(req.user)
        res.status(200).json({token, user})

    },

    googleOAuth: async(req, res, next) => {
        //Generate token
        const user = (req.user)

        const token = signToken(req.user)
        res.status(200).json({token, user})
    },

    updateRole: async(req, res, next) => {
        try{          

           // console.log("Here are the results...", req.body)
            console.log("Here are the ID...", req.body._id)
            console.log("Here is the name", req.body.name)
            console.log("Here is the type", req.body.role.type)
            console.log("Here is the updated", req.body.role.updated)

            await User.update({_id:req.body._id}, {name: req.body.name, 'role.type': req.body.role.type, 'role.updated': req.body.role.updated} /*{ updatedAt:  type: Date, default:  Date.now },*/)

            const user = await User.findById(req.body._id)
            console.log(user)
            const token = signToken(user)
            res.status(200).json({auth: true, token, user})

        }catch(error){
            res.status(401).json({error})
        }        
    } 
}