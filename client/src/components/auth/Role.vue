<template >

<section>
 
    <div class="container mt-5 col-sm-10 col-md-6 col-lg-4 p-5"> 
      <form class="form-signin" role="form" v-on:submit.prevent = "updateRole()">
        <div class="text-center mb-4">        
        <h5>Please provide the following information </h5>       
      </div>     

       <div class="form-group">
        
          <div class=" bg-muted d-flex justify-content-around">
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

          </div>          
         
        <p><small><strong>Employers and organizations check "No". </strong></small></p>
        
          <div class="form-label-group">
            <input type="text" class="form-control" placeholder="Username" v-on:change = "nameChange()" name="username" id="username" v-model="getUser.name" required>
            <label for="name">Enter preferred name</label>
          </div>   
          
          <div class="form-label-group">
            <input type="text" class="form-control" placeholder="Enter Phone Number" name="telephone" id="telephone" v-model="user.telephone" required>
            <label for="name">Enter Phone Number</label>
          </div>
          <p><small><strong>Enter your number in this format: 123-456-7890. </strong></small></p>  

          <div>
            <p>Receive notifications about potential job opening matches through: </p>
          </div>

          <div class="d-flex justify-content-between">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="email" value="email" v-model="user.preferences">
              <label class="form-check-label" for="email">Email</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="text" value="text" v-model="user.preferences">
              <label class="form-check-label" for="text">Text</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="voice" value="voice" v-model="user.preferences">
              <label class="form-check-label" for="voice">Voice</label>
            </div>
          </div>
                                      
      </div>
    
      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">Save</button>

      </form>
           
      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
    </div> 
 
</section>
    
</template>

<script>

//IMPORTANT RESOURCE: https://stackoverflow.com/questions/1519006/how-do-you-create-a-remote-git-branch

import { store } from "../../store/store"
import { mapGetters } from 'vuex'

export default {
  name: 'userRole', 

  computed:{
    ...mapGetters([ "getUser" ])  
  },

  data(){
    return{
      signUpErrors:[],
      user:{ 
        _id: {type: String},
        preferences: [],
        role: {
          type: {type: String, enum: ['jobseeker', 'employer']}, 
          updated: {type: Boolean, default: false }
        },        
        telephone: "",// {type: String, required: true},
        username: "" //{type: String } 
      }      
    }
  },

  methods:{

    validateTel(tel){
      let tel_number = /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
      return tel_number.test(tel)
    },

    nameChange(){
      return this.user.name = document.getElementById("username").value
    },

    updateRole(){
      if(this.validUser()){         

          this.user.role.updated = true

          if(!this.nameChange()){
            this.user.name = this.getUser.name
          }

          this.user._id = this.getUser._id
          debugger
          this.$store.dispatch('updateRole', this.user)

          //got to admin page
          this.$router.push({path: '/admin'})          
          
      }      
    },  

    validUser(){     

      if(this.user.role==""){
        this.signUpErrors['role'] = 'Please select your role'
      } 

      if(this.user.preferences.length===0){
        this.signUpErrors['preference'] = 'You must select one way to receive notification'
      }

      if(!this.validateTel(this.user.telephone)){
        this.signUpErrors['tel'] = 'Please enter your phone number n the correct format'
      }

      if(this.signUpErrors.length>0){
        return false
      }else return true

    }
  }
    
}
</script>
