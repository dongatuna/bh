<template >

<section>

 
    <div class="container mt-5 col-sm-10 col-md-6 col-lg-4 p-5"> 
      <form class="form-signin" role="form" v-on:submit.prevent="updateRole">
        <div class="text-center mb-4">        
        <h5>Please provide the following information </h5>       
      </div>
     

       <div class="form-group">
        
          <label class="form-check-label" for="role">
            <span class="text-danger"><strong>Looking for work?</strong> </span>
          </label>

          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="role" id="jobseeker" value="jobseeker" v-model="user.role.type" required>
            <label class="form-check-label" for="jobseeker">Yes</label>
          </div>

          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="role" id="employer" value="employer" v-model="user.role.type" required>
            <label class="form-check-label" for="employer">No</label>
          </div>
          <br>
        <p><small>Employers and organizations should check "No". </small></p>
        <hr>
          <div class="form-label-group">
            <input v-if="edit" type="text" class="form-control" placeholder="Preferred Name" name="username" id="username" v-model="getUser.name" required>
            <label for="name">Enter preferred name</label>
          </div>     
      </div>
    
      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">Save</button>

      </form>
           
      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
    </div> 
      

    <!-- form to start here -->

      
  
</section>
    
</template>

<script>

//IMPORTANT RESOURCE: https://stackoverflow.com/questions/1519006/how-do-you-create-a-remote-git-branch

import { store } from "../../store/store"
import {mapGetters} from 'vuex'


export default {
  name: 'selectrole',
  props:['edit'],

  computed:{
    ...mapGetters([ "getUser"])  
  },

  data(){
    return{
      signUpErrors:[],
      user:{ 
        role: {
          type: "", 
          updated: false
        },        

        name: "" 
      }      
    }
  },

  methods:{
    updateRole(){
      if(this.validUser()){
          if(this.edit){
            this.user = Object.assign(this.getUser)
            //this.selectedFiles = this.getFiles
            this.user.role.updated = true
          }

          this.user.role.updated = true
          //this.user.id = this.getUserId
          this.$store.dispatch('updateRole', this.user)
          debugger
          
          //check user role type to decide which admin to send user
          
          
      }      
    },  
    
    readUserToken(token){       
      
          this.user.name = jwt_decode(token).name
          this.user.role.type = jwt_decode(token).role.type
          this.user.role.updated = jwt_decode(token).role.updated

          return this.user      
          
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
