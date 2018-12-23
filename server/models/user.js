const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now },

    role: {
         type: {type: String, enum: ['employer','jobseeker'], default: "jobseeker" },
         updated: {type: Boolean, default: false},
         //required: true
    },   

    name:{type: String},

    preferences: {type: Array /*, default: ['email']*/},

    signupmethod: {
        type: String,
        enum: ['facebook', 'google', 'local'],
        required: true
    },

    telephone: {type: String},    
    
    facebook: {
        id:{
            type: String,
        },
        email: {type: String, lowercase: true}
    },

    google: {
        id:{
            type: String,
        },
        email: {type: String, lowercase:true}
    },
    
    local:{
        email:{
            type: String, 
            lowercase:true, 
            unique: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        }, 
        password: {
            type:String//, required: true
        }
    }
    
})

//this method gets called before the mongoose save method on object User
userSchema.pre('save', async function(next){
    try{
        console.log("The user is here...")
        //check if the signup method is local
        if(this.signupmethod!=='local'){
            next()
        }
        
        //create salt
        const salt = await bcrypt.genSalt(10)
        //use bcrypt hash

        const passwordHash = await bcrypt.hash(this.local.password, salt)

        this.local.password = passwordHash

        next()
    }catch(error){
        next(error)
    }
})

//this method is used to verify the password user 
userSchema.methods.validPassword = async function(newPassword){
    try{
        //find the user using email provided
        return await bcrypt.compare(newPassword, this.local.password)
        //use the bcrypt compare method
    }catch(error){
        throw new Error(error)
    }
}


module.exports = mongoose.model('User', userSchema)