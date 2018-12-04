<template>

    <section class="py-5 mt-5 bg-light">
        <div class="container-fluid">
            <div class="row justify-content-center">

                <div class=" p-3 col-md-2">
                    <ul class="list-group">
                        <li class="list-group-item">Find Candidates</li>
                        <li class="list-group-item">Find Jobs</li>
                        <li class="list-group-item">Postings</li>              
                        <li class="list-group-item">View/Update Resume</li>           
                        <li class="list-group-item">Events</li>
                        <li class="list-group-item">Settings</li>                    
                    </ul> 

                </div>

                
                <!--CANDIDATES should have create/edit resume, Jobs, HCA/NAC Exams, Events Near You, Settings-->
                <div class="p-3 col-md-6 col-sm-10">
                    <div class="row justify-content-between m-3">
                        <h4 class="mb-3 display 4" >Events </h4> 
                        <button class="btn btn-primary" type="submit" v-on:click="createEvent"><strong>Create Event</strong> </button>
                    </div>
                    
                    <div v-if="getEvents.length>0">
                        <ul class="list-group"  v-for="event of getEvents" v-bind:key="event.communityEvent._id">                        
                            <li class="list-group-item d-flex justify-content-between align-items-center"><router-link :to="'/events/'+event._id">{{event.communityEvent.topic}}</router-link><span>
                                <a href="#">Applicants</a> |
                                <a href="#"> Repost </a>|
                                <a href="#"> Edit </a>|
                                <a href="#" v-on:click="deleteEvent(event.communityEvent._id)"> Delete</a></span>
                            </li>                    
                        </ul>
                    </div>
                    <div v-else class="card">
                        <div class="card-body">
                            <h5 class="card-title">Create events for the Community</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <h6 class="card-subtitle mb-2 text-muted">Career Events</h6>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <h6 class="card-subtitle mb-2 text-muted">Events about Condition</h6>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="card-link">Card link</a>
                            <a href="#" class="card-link">Another link</a>
                        </div>
                    </div>                    
                </div>
                
            </div>                
        </div>            
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    // data(){
    //     return{
    //         id: this.$router.params.id
    //     }
    // },
    
    computed:{
        ...mapGetters([
            "getEvents"
        ])
    },

    created(){
        this.$store.dispatch('getDBEvents')
    },

    methods:{
        deleteEvent(param){
            this.$store.dispatch('deleteDBEvent', param)
        },

        createEvent(){
            this.$router.push({path: '/addevent'})
        }
    }

    
}
</script>

