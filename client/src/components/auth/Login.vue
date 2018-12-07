<template >

<section>

    <div class="container mt-5 col-sm-10 col-md-6 col-lg-4 p-5">
      <form class="form-signin" v-on:submit.prevent="logInUser">
        <div class="text-center mb-4">        
        <h1 class="h3 mb-3 font-weight-normal">Login</h1>        
      </div>

      <div class="form-label-group">
        <input type="email" class="form-control" placeholder="Email address" v-model="user.email" autofocus required>
        <label for="inputEmail">Email address</label>
      </div>

      <div class="form-label-group">
        <input type="password" class="form-control" placeholder="Password" name="password" id="password" v-model="user.password" required>
        <label for="inputPassword">Password</label>
      </div>    

      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">Log in</button>

      </form>

      <div class="text-center">
        <h4>Or login using</h4>
      </div>
      
      <hr>
      <button class="btn btn-lg btn-primary btn-block mb-3" v-on:click="facebookSignUp" type="submit">Facebook</button>
      <br>
      <button class="btn btn-lg btn-danger btn-block mb-3" type="submit" v-on:click="googleSignUp">Google+</button>
      
      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>

    </div>
</section>
    
</template>

<script>

import { store } from "../../store/store"
import {mapGetters} from 'vuex'

export default {
  name: 'signup',
  data(){
    return{
      signUpErrors:[],
      user:{       
        email: "",
        password: "",    
      }
    }
  },

  methods:{
    logInUser(){
      if(this.validUser()){   
         
          this.$store.dispatch('logInUser', this.user)
          this.$router.push({path: '/admin'})          
      }      
    },

    validUser(){
         
      if(this.user.email==""){
        this.signUpErrors['email']= 'Please add your email'
      }  

      if(this.user.name==""){
        this.signUpErrors['name']= 'Please select your role'
      } 

      if(this.signUpErrors.length>0){
        return false
      }else return true

    },

    googleSignUp(){
        this.$store.dispatch('googleSignUp')
        //this.$router.push({path: '/admin'})
    },

    facebookSignUp(){
        this.$store.dispatch('facebookSignUp')
        //this.$router.push({path: '/admin'})
    }


  }
    
}
</script>
