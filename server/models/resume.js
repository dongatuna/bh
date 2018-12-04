const mongoose = require('mongoose');

const resumeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true} ,
    license: {type:String, required: true},
    description: {type:String},    
    certifications:  [{type: String}],
    CVdocs:  [{type: String}],
    date: { type: Date, default: Date.now }

});

module.exports = mongoose.model("CV", resumeSchema);