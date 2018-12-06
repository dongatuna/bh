<template>
    <!--
        #NAVBAR
    -->
    <div>
        <!--since bootstrap 4 is mobile first, navbar expands to large device view after md size is reached-->
        <nav class="navbar navbar-expand-md navbar-primary bg-primary fixed-top">

                <!--Best practice is to add brand logo outside the ul element-->
                <a href="#" class="navbar-brand"><i class="fas fa-stethoscope text-light fa-2x"></i></a>
                
                <button type="button" class="navbar-toggler bg-dark" data-toggle="collapse" data-target="#nav"><span class="navbar-toggler-icon"></span></button>

            <!--div below is to control navbar in small screen   justify-content-between-->
            <div class="collapse navbar-collapse" id="nav">
            
                <ul class="navbar-nav justify-content-between">

                    <router-link v-bind:to="{name: 'homeLink'}" tag="li"><a class="nav-link text-light text-capitalize font-weight-bold px-3">Home</a></router-link>
                    <router-link v-bind:to="{name: 'listJobs'}" tag="li"><a class="nav-link text-light text-capitalize font-weight-bold px-3">Jobs</a></router-link>           
                    <router-link v-bind:to="{name: 'viewCandidates'}" tag="li"><a class="nav-link text-light text-capitalize font-weight-bold px-3">Candidates</a></router-link>
                    <router-link v-bind:to="{name: 'listEvents'}" tag="li"><a class="nav-link text-light text-capitalize font-weight-bold px-3">Events</a></router-link>
                    <router-link v-bind:to="{name: 'contactUs'}" tag="li"><a class="nav-link text-light text-capitalize font-weight-bold px-3">Contact Us</a></router-link>
                   
                    <router-link v-if="!getToken||getToken=='undefined'" v-bind:to="{name: 'login'}" tag="li"><a class="nav-link text-light text-capitalize font-weight-bold px-3">Log in</a></router-link> 
                    <router-link v-if="!getToken||getToken==='undefined'" v-bind:to="{name: 'signup'}" tag="li"><a class="nav-link text-light text-capitalize font-weight-bold px-3">Sign up</a></router-link> 
                    <a v-if="getToken" v-on:click="destroyToken()" class="nav-link text-light text-capitalize font-weight-bold px-3">Log out</a>                  
                 
                    <!-- <button class="btn btn-danger btn-block m-3 text-light" type="submit">Login</button>
                    <button class="btn btn-danger btn-block m-3 text-light" v-on:click="signUp"  type="submit">Sign up</button> -->
                    <!--<div id="header"></div> -->
                    <!-- <div class="container justify-content-end">
                        <button class="btn btn-danger btn-block m-3 text-light" v-on:click="signUp"  type="submit">Sign up</button>
                        <sign-up ref="signupmodal"></sign-up>
                    </div> -->
                  
                    
                    
                    

                </ul>
            </div>
        </nav>

    </div>
    

</template>

<script>
import { store } from "../store/store"
import {mapGetters} from 'vuex'

import SignUp from './auth/Signup.vue'
import LogIn from './auth/Login.vue'

export default {
    //el: "#header",
    components:{
        "sign-up":SignUp,
        "log-in": LogIn
    },

    computed: {
        ...mapGetters([
            "getToken"
        ])    
    },

    methods:{
        signUp(){
            let element = this.$refs.signupmodal.$el
            $(element).modal('show')
        },

        destroyToken(){
            this.$store.dispatch('destroyToken')
        }
    }
}
</script>

