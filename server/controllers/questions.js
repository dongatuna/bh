const mongoose = require('mongoose')
const Question = require("../models/question")
const questionBank = require('../question')
const {randomizeQuestions} = require("../helpers/questionsHelper")

//get all the questions, answer choices, right answer, and rationales
//send to the front end/vuex store

module.exports = {

    insertQuestions: async(req, res, next)=>{
        try{
            //Add collections
            for(let [index,value] of Object.entries(Object.values(questionBank))){
                
                const questions = Object.values(value);
               // console.log("Here are the stupid questions", questions.length);

               
                await Question.insertMany(questions);
             

                res.status(200).json({
                    message: "Questions have been successfully saved",
                    request:{
                        message: "To successfully view the questions, visit the link below",
                        type: "GET",
                        link: "http://localhost:3000/questions"
                    }
                });
            }
        }catch(error){
            res.status(500).json({
                message: "There has been an error saving questions",
                error
            })
        }        
    },

    
    getQuestions: async(req,res, next)=>{
        try{
            for(let [index,value] of Object.entries(Object.values(questionBank))){
                
                const questions = Object.values(value);
                console.log("Here are the stupid questions", questions.length);                              
               
                res.status(200).json({
                    // qIndex,
                   
                    questions,
                    
                    message: "Questions have been successfully saved",
                    request:{
                        message: "To successfully view the questions, visit the link below",
                        type: "GET",
                        link: "http://localhost:3000/questions"
                    }
                });
            }
        }catch(error){
            res.status(500).json({
                message: "There has been an error saving questions",
                error
            })
        }
    },
    //get 10 or 70 questions
    getTest: async(req, res, next)=>{
        try{

            const num = req.params.id
            //1. get all the questions from the database
            const allQuestions = await Question.find({})
           // console.log("I am here....questions fetched")
            const questions = randomizeQuestions(num, allQuestions)

            res.status(200).json({questions})
            
            //grading handled on the front end
                    
            
        }catch(error){
            res.status(500).json({
                message: "There has been error fetching questions",
                error
            })
        }        
    }    
}