const express=require('express');

const router=express.Router();

const passport=require('passport');

const userController=require('../controllers/user_controller');

router.get('/profile/:id',passport.checkAuthentication,userController.profile);

router.post('/update/:id',userController.update);

router.get('/signIn',userController.signIn);

router.get('/signUp',userController.signUp);

router.post('/create',userController.create);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(

    'local',

    {failureRedirect:'/user/signIn'},
    
),userController.createSession);

router.get('/signOut', userController.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));

router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/user/signIn'}),userController.createSession);

module.exports=router;
