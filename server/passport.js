const mongoose = require('mongoose')
const passport = require('passport')
const JwtStrategy =  require('passport-jwt').Strategy
const {ExtractJwt} = require('passport-jwt')
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const LocalStrategy = require('passport-local').Strategy
const User = require("./models/user")
const config = require('./configuration/index.js')

//JSON WEB TOKENS STRATEGY

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.JWT_SECRET
},  async(payload, done)=>{
    try{

        //find the user specified in the token
        const user = await User.findById(payload.sub)

        //if the user doesn't exist, return empty object and false 
        if(!user){
            return done(null, false)            
        }

        //Otherwise, return the user
        done(null, user)

    }catch(error){
        console.log("Before the error", error)
        done(error, false)
    }
}))

//LOCAL STRATEGY - to log in users

passport.use(new LocalStrategy({
    usernameField: "email"
}, async(email, password, done )=>{
    try{
        //Find the user given the email
        const user = await User.findOne({"local.email": email})
        
        console.log(user)
        //If not user, handle it
        if(!user){
            return done(null, false)
        }

        //Check if the password is a match
        const isMatch = await user.validPassword(password)

        //If not user, inform user
        if(!isMatch) return done(null, false)

        //Otherwise, return the user
        done(null, user)
    }catch(error){
        done(error, false)

    }
}));

//GOOGLE OAUTH STRATEGY

passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: config.oauth.google.clientID,
    clientSecret: config.oauth.google.clientSecret
}, async(accessToken, refreshToken, profile, done)=>{

    try{
        console.log("This is the access Token ", accessToken);
        console.log("This is the refresh Token ", refreshToken);
        console.log("This is the profile ", profile);

        //Check whether the current user exists in our DB
        const existingUser = await User.findOne({"google.id":profile.id});
        if(existingUser){
            return done(null, existingUser);
        }

        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            signupmethod: 'google',
            name: profile.displayName,
            google:{
                id: profile.id,
                email: profile.emails[0].value
            }
        });
        
        await newUser.save();
        done(null, newUser);

    }catch(error){
        done(error, false, error.message);
    }    
}))

//FACEBOOK STRATEGY - to sign up new users or log in returning users
passport.use("facebookToken", new FacebookTokenStrategy({
    //add configurations
    clientID: config.oauth.facebook.clientID,
    clientSecret: config.oauth.facebook.clientSecret
}, async(accessToken, refreshToken, profile, done)=>{
    try{

        console.log("This is the access Token ", accessToken);
        console.log("This is the refresh Token ", refreshToken);
        console.log("This is the profile ", profile);
        //check if the user is in our database using the profile.id
        const existingUser = await User.findOne({"facebook.id":profile.id});

        console.log(`${existingUser} is an existing user?`);
        //if the user exist, return the user
        if(existingUser){
            return done(null, existingUser);
        }

        //otherwise, create a new user
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            signupmethod: 'facebook',
            name: profile.displayName,
            facebook:{
                id: profile.id,
                email: profile.emails[0].value
            }        
        });

        console.log("This is a new user ", newUser);
        //save the newly created user and return him 
        await newUser.save();
        done(null, newUser);

    }catch(error){
        done(error, false, error.message);
    }

}));