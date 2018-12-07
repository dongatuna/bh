const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });



router.route("/signup")
    .post(validateBody(schemas.userSchema), UsersController.signUp)

router.route("/role")
    .patch(/*validateBody(schemas.roleSchema),  passportJWT,*/ UsersController.updateRole)
router.route("/signin")
    .post(passportSignIn, UsersController.signIn);

router.route("/logout")
    .get( /**passportJWT, */  UsersController.logOut);    
router.route("/auth/google")
    .post(passport.authenticate("googleToken", {session: false}), UsersController.googleOAuth)

router.route("/auth/facebook")
    .post(passport.authenticate("facebookToken", {session: false}), UsersController.facebookOAuth);    
//router.route("/secret").get(passportJWT, UsersController.secret);

module.exports = router;