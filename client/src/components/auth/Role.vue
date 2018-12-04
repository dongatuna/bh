<template >

<section>

    <div class="container mt-5 col-sm-10 col-md-6 col-lg-4 p-5">
      <form class="form-signin" v-on:submit.prevent="addUser">
        <div class="text-center mb-4">        
        <p>Please provide the following information </p>       
      </div>

      <div class="form-label-group">
        <input type="text" class="form-control" placeholder="Preferred Name" name="username" id="username" v-model="user.name" required>
        <label for="name">Preferred Name</label>
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
    
      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">Save</button>

      </form>
           
      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
    </div>   
  
</section>
    
</template>

<script>

import { store } from "../../store/store"
import {mapGetters} from 'vuex'

export default {
  name: 'selectrole',
  data(){
    return{
      signUpErrors:[],
      user:{       
        name: "",
        role: "",    
      }
    }
  },

  methods:{
    addUser(){
      if(this.validUser()){
    
          debugger
          this.$store.dispatch('addUser', this.user)
          this.$router.push({path: '/admin'})
          
      }
      
    },

    validUser(){     

      if(this.user.role==""){
        this.signUpErrors['role']= 'Please select your role'
      } 

      if(this.user.name==""){
        this.signUpErrors['name']= 'Please select your role'
      } 

      if(this.signUpErrors.length>0){
        return false
      }else return true

    }


  }
    
}
</script>
