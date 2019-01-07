<template >

<section> 
    <div class="container mt-5 col-sm-10 col-md-6 col-lg-4 p-5">

      <div  v-if="signup" class="text-center mb-4">        
        <h1 class="h3 mb-3 font-weight-normal">Kinshealth</h1>
        <p>Join to find caregivers and nurses, prepare for state licensing exams and get a job.</p>        
      </div>

      <div v-else class="text-center mb-4">        
        <h3 class="h3 mb-3 font-weight-normal">Login</h3>                 
      </div>

      <form v-if="signup" class="form-signin" v-on:submit.prevent = "addUser()">   

        <div class="mb-2 form-label-group">
          <input type="email" class="form-control" placeholder="Email address" v-model="user.email" autofocus required>
          <label for="inputEmail">Email address</label>
        </div>

        <div class="mb-2 form-label-group">
          <input type="password" class="form-control" placeholder="Password" name="password" id="password" v-model="user.password" required>
          <label for="inputPassword">Password</label>
        </div>

        <div class="mb-2 form-label-group">
          <input type="password" class="form-control" placeholder="Confirm Password" name="password2" id="password2" v-model="user.password2" required>
          <label for="confirmPassword">Confirm Password</label>
        </div>

        <!-- <div class="mb-2 form-label-group">
          <input type="text" class="form-control" placeholder="Username" name="username" id="username" v-model="user.name" required>
          <label for="name">Username</label>
        </div>  -->
   
      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">Sign up</button>

      </form>

      <form v-else class="form-signin" v-on:submit.prevent="loginUser()">

        <div class="mb-2 form-label-group" >
          <input type="email" class="form-control" placeholder="Email address" v-model="returningUser.email" autofocus required>
          <label for="inputEmail">Email address</label>
        </div>

        <div class=" form-label-group">
          <input type="password" class="form-control" placeholder="Password" name="password" id="password" v-model="returningUser.password" required>
          <label for="inputPassword">Password</label>
        </div>
        <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">Log in</button>
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
import {mapGetters, mapState} from 'vuex'
import config from '../../configuration/index.js'

export default {
  props: ['signup'],
  name: 'signup',
  data(){
    return{
      returningUser:{
        email: "",
        password: ""
      },
      userToken: "",      
      signUpErrors:[],
      user:{
        name: "",
        email: "",
        password: "",
        password2: "",
        role: {
            type:  "" ,
            updated: {type: Boolean, default: false }
        },
        signupmethod: "",
        telephone: "",
        preferences: [], 
           
      },

      googleSignInParams: {
        client_id: config.google.clientID,
      },

      fbSignInParams: {
        scope: 'public_profile, email',
        return_scopes: true
      }
    }
  },

  computed: {
    ...mapGetters([
       "getUser", "getUserAuth"
    ]),
    ...mapState([
      "fBAuthStatus"
    ])
  },

  methods:{    

    addUser(){
      if(this.validUser()){     

          this.user.name = 'Generic Bridge Health User'
          this.user.preferences[0] = 'email'
          this.user.telephone = '555-555-5555'
          this.user.role = {
            type: "jobseeker",
            updated: false            
          } 
          this.user.signupmethod = "local"
          debugger
          this.$store.dispatch('addUser', this.user)          
          this.$router.push({path: "/role"})                 
      }      
    },

    getAuthStatus(actionName, user){      
        debugger
        return this.$store.dispatch(actionName, user)       
             
    },

    async loginUser(){
      try{

        if(this.returnUser()){ 
          await this.getAuthStatus('loginUser', this.returningUser)
          debugger
          if(this.getUserAuth){
            this.$router.push({path: "/admin"})
          }else{
            this.$router.push({path: "/role"})
          }
          debugger
        }         

      }catch(error){

      }
    },


    async onSignInSuccess (googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users   
         debugger

         try{
           await this.$store.dispatch('googleSignUp',  googleUser.Zi.access_token )

           debugger  
           if(this.getUserAuth){                                
              //this.$store.dispatch  
              this.$router.push({path: '/admin'})
            }else{
              this.$router.push({path: '/role'})
            }

         }catch(error){

         }    
    },

    async fBUserStatus(fbRoute, payload){
      try{
        await this.$store.dispatch(fbRoute,  payload)
      }catch(error){
        alert("There has been an error with the fBUserStatus method")
      }      
    },

    async onFBSignInSuccess(response){
     // try{
        debugger
        FB.login(user => {
          
          debugger
          if (response.status === 'connected') {             
            
            debugger
            this.fBUserStatus('facebookSignUp',  user.authResponse.accessToken) 
            .then((/*user*/)=>{
              debugger
              if(this.getUserAuth){
                this.$router.push({path: '/admin'})
              }else{
                this.$router.push({path: '/role'})
              }
            })
            .catch(error => {
                alert("Here is the error")
              })
            } 
              
      }) 
     
    }, 

    onSignInError (error) {
      console.log('OH NOES', error)
    },

    validUser(){
         
      if(this.user.email==""){
        this.signUpErrors['email']= 'Please add your email'
      }   
      
      if(this.user.password==""){
        this.signUpErrors['password'] = 'Please enter your password'
      }

      if(this.user.password!==this.user.password2){
        this.signUpErrors['mismatch'] = "Your passwords do not match"
      }     

      if(this.signUpErrors.length>0){
        return false
      }else return true
    },
    
    returnUser(){
         
      if(this.returningUser.email == ""){
        this.signUpErrors['email'] = 'Please add your email'
      }   
      
      if(this.returningUser.password == ""){
        this.signUpErrors['password'] = 'Please enter your password'
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
