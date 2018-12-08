<template >

<section>

 
    <div class="container mt-5 col-sm-10 col-md-6 col-lg-4 p-5"> 
      <form class="form-signin" role="form" v-on:submit.prevent="addUser">
        <div class="text-center mb-4">        
        <h5>Please provide the following information </h5>       
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
      

    <!-- form to start here -->

      
  
</section>
    
</template>

<script>

import { store } from "../../store/store"
import {mapGetters} from 'vuex'

export default {
  name: 'selectrole',

  computed:{
    ...mapGetters([ "getUserId"])
  },

  data(){
    return{
      signUpErrors:[],
      user:{ 
        role: "",
        id: this.getUserId || null
      }      
    }
  },

  methods:{
    addUser(){
      if(this.validUser()){
    
          //this.user.id = this.getUserId
          this.$store.dispatch('updateRole', this.user)
          debugger
          this.$router.push({path: '/admin'})
          
      }
      
    },

    validUser(){     

      if(this.role==""){
        this.signUpErrors['role']= 'Please select your role'
      } 
 

      if(this.signUpErrors.length>0){
        return false
      }else return true

    }


  }
    
}
</script>
