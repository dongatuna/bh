const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now },
    //userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true} ,
    topic: {type:String, required: true},
    description: {type:String, required: true},
    audience: {type:String, required: true},
    cost: {type: String, required: true},
    date: {type: Date, required: true},
    time: {type: String, required: true},
    location: {type: String, required: true},
    eventfiles: [String],
    

});

module.exports = mongoose.model("Event", eventSchema);