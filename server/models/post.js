const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    title: {type:String, required: true},
    description: {type:String, required: true},
    license: [{type:String, required: true}],
    certifications: [{type:String}],    
    applicants:[{type: mongoose.Schema.Types.ObjectId, ref: "CV"}],
   // postImage: String,
    postImage: { data: Buffer},
    date: { type: Date, default: Date.now }

});

module.exports = mongoose.model("Post", postSchema);