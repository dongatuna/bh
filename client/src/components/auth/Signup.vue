<template >

<section> 
    <div class="container mt-5 col-sm-10 col-md-6 col-lg-4 p-5">
      <form class="form-signin" v-on:submit.prevent="addUser()">
        <div class="text-center mb-4">        
        <h1 class="h3 mb-3 font-weight-normal">Kinshealth</h1>
        <p>Join to find caregivers and nurses, prepare for state licensing exams and get a job.</p>
        
      </div>

      <div class="form-label-group">
        <input type="email" class="form-control" placeholder="Email address" v-model="user.email" autofocus required>
        <label for="inputEmail">Email address</label>
      </div>

      <div class="form-label-group">
        <input type="password" class="form-control" placeholder="Password" name="password" id="password" v-model="user.password" required>
        <label for="inputPassword">Password</label>
      </div>

      <div class="form-label-group">
        <input type="password" class="form-control" placeholder="Confirm Password" name="password2" id="password2" v-model="user.password2" required>
        <label for="confirmPassword">Confirm Password</label>
      </div>

      <div class="form-group">
        
          <label class="form-check-label" for="role">
            <span class="text-danger"><strong>Looking for work?</strong> </span>
          </label>

          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="role" id="jobseeker" value="jobseeker" v-model="user.role" required>
            <label class="form-check-label" for="jobseeker">Yes</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="role" id="employer" value="employer" v-model="user.role" required>
            <label class="form-check-label" for="employer">No</label>
          </div>
          <br>
        <p><small>Employers and organizations should check "No". </small></p>
      </div>
      
      <div class="form-label-group">
        <input type="text" class="form-control" placeholder="Preferred Name" name="username" id="username" v-model="user.name" required>
        <label for="name">Preferred Name</label>
      </div>     
      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">Sign up</button>

      </form>

      <div class="text-center">
        <h4>Or login using</h4>
      </div>

      <hr>
      <!-- <button class="btn btn-lg btn-primary btn-block mb-3" type="submit" v-on:click="fBLogin()">Facebook</button> -->
        <fb-signin-button
        :params="fbSignInParams"
        @success="onFBSignInSuccess"
        @error="onSignInError">
        Sign in with Facebook
        </fb-signin-button>
      <br>
      <!-- <button class="btn btn-lg btn-danger btn-block mb-3" type="submit" v-on:click="googleSignIn()">Google+</button> -->
 <br>
      <g-signin-button
        :params="googleSignInParams"
        @success="onSignInSuccess"
        @error="onSignInError">
        Sign in with Google
        </g-signin-button>
      <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>

    </div>

</section>
    
</template>

<script>
//https://developers.facebook.com/docs/javascript/advanced-setup
import  {store}  from "../../store/store"
import {mapGetters} from 'vuex'
import config from '../../../configuration'

export default {
  name: 'signup',
  data(){
    return{
      userToken: "",      
      signUpErrors:[],
      user:{
        name: "",
        email: "",
        password: "",
        password2: "",
        role: "",
        signupmethod: ""        
      },

      googleSignInParams: {
        client_id: config.google.clientID,
      },

      fbSignInParams: {
        scope: 'public_profile,email',
        return_scopes: true
      }
    }
  },

  computed: {
    ...mapGetters([
      "getToken"
    ])
  },

  

  methods:{
    addUser(){
      if(this.validUser()){
          //this.user.signupmethod = "local"
          this.$store.dispatch('addUser', this.user)
                 
      }      
    },

    onSignInSuccess (googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      this.userToken = googleUser.Zi.access_token // etc etc


      debugger
       this.$store.dispatch('googleSignUp',  this.userToken ) 
       this.$router.push({path: '/role'})  
    },

    onFBSignInSuccess(response){
      FB.login(user => {
        //console.log("This is the response", response.authResponse.accessToken) 
          if (response.status === 'connected') {
                

            this.userToken = user.authResponse.accessToken
            debugger

            this.$store.dispatch('facebookSignUp',  this.userToken ) 
            
            this.$router.push({path: '/role'}) 
            // if(this.getToken){
            //   this.$router.push({path: '/role'}) 
            // }
            
          } else {
              return this.userToken=null
          } //

      }) 
    }, 

    onSignInError (error) {
      console.log('OH NOES', error)
    },

    validUser(){
         
      if(this.user.email==""){
        this.signUpErrors['email']= 'Please add your email'
      }      

      if(this.user.password!==this.user.password2){
        this.signUpErrors['mismatch'] = "Your passwords do not match"
      }

      if(this.user.role==""){
        this.signUpErrors['role']= 'Please select your role'
      } 

      if(this.user.name==""){
        this.signUpErrors['name']= 'Please fill in your preferred name'
      } 

      if(this.signUpErrors.length>0){
        return false
      }else return true
    }

    
  }    
}
</script>

<style>
  .fb-signin-button {
    /* This is where you control how the button looks. Be creative! */
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #4267b2;
    color: #fff;
  }

  .g-signin-button {
    /* This is where you control how the button looks. Be creative! */
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #3c82f7;
    color: #fff;
    box-shadow: 0 3px 0 #0f69ff;
  }
</style>
