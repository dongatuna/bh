const User = require('../models/user')
const JWT = require('jsonwebtoken')
const {JWT_SECRET} = require('../configuration/index')

signToken = (user) =>{
    return JWT.sign(        
        {
            iss: "Don",
            sub: user.id,
            iat: new Date().getTime(), //current time
            exp: new Date().setDate(new Date().getDate()+1), //current time + 1 day ahead
           // email: user.email,
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
                role,
                name,            
                signupmethod: "local",
                local: {
                    email,
                    password,
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

            const null_token = null

            if(req.user===undefined){
                
                res.status(200).json({null_token})
            }else{
                req.logout()
                res.status(200).json({null_token})
            }
            
            
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
        console.log("Google got me here")

        console.log(req.user);

        const token = signToken(req.user)
        res.status(200).json({token})
    },

    updateRole: async(req, res, next) => {
        try{
           
            console.log("Here is the req.body", req.body)
            console.log("Here is the req.user", req.user)
            const results = await User.update({_id:req.user._id}, {role: req.body.role})

            console.log("Here are the results...", results)

            if(results){
                res.status(200).json({
                    message: "Role has been updated..."
                })
            }

        }catch(error){
            res.status(401).json({error})
        }        
    } 
}