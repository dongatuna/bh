const mongoose = require('mongoose');
const User = require('../models/user');
const JWT = require('jsonwebtoken');

signToken = (user) =>{
    return JWT.sign(        
        {
            iss: "Don",
            sub: user.id,
            iat: new Date().getTime(), //current time
            exp: new Date().setDate(new Date().getDate()+1), //current time + 1 day ahead
            email: user.email,
            userId: user._id
        },
        "Dis here is super sekret"
   
    );
}
module.exports = {

    signUp: async(req, res, next)=>{
        try{

            console.log('console log req value...', req.body)
            const { role, name, email, signupmethod, password } = req.body;
            //check if the user exists
            const result = await User.findOne({email});

            console.log("The results is", result)
            
            if(result){
                res.status(404).json({
                    message: "The email has been taken"
                });
            }

            //create new user
            const newUser = new User({
               // _id: new mongoose.Types.ObjectId(),
                role,
                name,            
                signupmethod,
                local: {
                    email,
                    password,
                }             
            });

            console.log("The new user is: ",newUser);
            await newUser.save()

            //console log user to see if the password has been encrypted
            console.log("This is the password of the new user ", newUser.password);
            //Generate the token
            const access_token = signToken(newUser.local.password);
           // console.log(token);
            //Respond with the token
            res.status(200).json({access_token});
            
        }catch(error){
            res.status(401).json({
                message: "Authentication failed"
            });
        }
    },

    

    signIn: async(req, res, next)=>{
        //The signin is handled by passport.js - 
        
       const token = signToken(req.user);
        //console.log(token);

        res.status(200).json({token});
    },

    facebookOAuth: async(req, res, next)=>{
        console.log("Facebook authentication... ");

        console.log("req.user", req.user);

        const token = signToken(req.user);
        res.status(200).json({token});

    },

    googleOAuth: async(req, res, next)=>{
        //Generate token
        console.log("Google got me here");

        console.log(req.user);

        const token = signToken(req.user);
        res.status(200).json({token});
    },


}