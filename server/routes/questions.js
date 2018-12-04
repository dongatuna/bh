const express = require("express");
const router = require("express-promise-router")()
const {validateBody, schemas } = require("../helpers/routeHelpers");

const QuestionsController = require("../controllers/questions");

router.route('/').post( QuestionsController.insertQuestions );

router.route('/:id').get(QuestionsController.getTest );

//router.route('/quiz').get(QuestionController.get10Questions );

//router.route('/grade').get(QuestionController.gradeTest);
module.exports = router;

