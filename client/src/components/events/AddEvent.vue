<template>
    <section class="bg-light mt-5 py-5">
        <div class="container-fluid">
            <div class="row justify-content-center p-3">
                <div class="col-md-8 col-sm-10">
                   
                    <h4 class="text-dark display-4" v-if="edit">Edit Event</h4> 
                    <h4 class="text-dark display-4" v-else>Create Event</h4>
                    <form v-on:submit.prevent="addEvent" class="text-muted lead" ref="form" enctype="multipart/form-data" novalidate>
                        <div class="form-group">
                            <label for="topic">Topic of Event</label>
                            <input v-if="edit" type="text" class="form-control form-control-lg" name="topic" id="topic" v-model="getEvent.topic" >
                            <input v-else type="text" class="form-control form-control-lg" name="topic" id="topic" v-model="newEvent.topic" >   
                            <span class="text-danger" v-if="(this.errors.topic)"><small>{{errors['topic']}}</small></span>                   
                        </div>
                            
                        <div class="form-group mb-3">
                            <label for="description">Event Description</label>
                            <textarea v-if="edit" class="form-control" id="description" name="description" cols="30" rows="15" v-model="getEvent.description"></textarea>
                            <textarea v-else class="form-control" id="description" name="description" cols="30" rows="15" v-model="newEvent.description"></textarea>
                            <span class="text-danger" v-if="(errors['description'])"><small>{{errors['description']}}</small></span>  
                        </div>    
                        
                        <div class="form-group">
                            <label for="location">Location</label>
                            <input v-if="edit" type="text" class="form-control" name="location" id="location" v-model="getEvent.location">
                            <input v-else type="text" class="form-control" name="location" id="location" v-model="newEvent.location">
                            <span class="text-danger" v-if="(errors['location'])"><small>{{errors['location']}}</small></span>  
                        </div>

                        <div class="form-group">
                            <label for="audience">Target Audience</label>
                            <input v-if="edit" type="text" class="form-control" name="audience" id="audience" v-model="getEvent.audience">
                            <input v-else type="text" class="form-control" name="audience" id="audience" v-model="newEvent.audience">
                            <span class="text-danger" v-if="(errors['audience'])"><small>{{errors['audience']}}</small></span>  
                        </div>

                        <div class="row">
                            <div class="col-md-4 col-sm-10">
                                <div class="form-group">
                                    <label for="date">Date of Event</label>
                                    <input v-if="edit" type="text" class="form-control" name="date" id="date" placeholder="MM/DD/YYYY" v-model="getEvent.date">
                                    <input v-else type="text" class="form-control" name="date" id="date" placeholder="MM/DD/YYYY" v-model="newEvent.date">
                                    <span class="text-danger" v-if="(errors['date'])"><small>{{errors['date']}}</small></span>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-10">
                                <div class="form-group">
                                    <label for="text">Time of Event</label>
                                    <input v-if="edit" type="text" class="form-control" name="time" id="time" placeholder="HH:MM" v-model="getEvent.time">
                                    <input v-else type="text" class="form-control" name="time" id="time" placeholder="HH:MM" v-model="newEvent.time">
                                    <span class="text-danger" v-if="(errors['time'])"><small>{{errors['time']}}</small></span>
                                </div>
                            </div>

                            <div class="col-md-4 col-sm-10">
                                <div class="form-group">
                                    <label for="cost">COST ($)</label>
                                    <input v-if="edit" type="text" class="form-control" name="cost" id="cost" placeholder="0.00" v-model="getEvent.cost">
                                    <input v-else type="text" class="form-control" name="cost" id="cost" placeholder="0.00" v-model="newEvent.cost">
                                    <span class="text-danger" v-if="(errors['cost'])"><small>{{errors['cost']}}</small></span>
                                    <span v-else><small>Write 0.00 if it is free</small></span>
                                </div>
                            </div>
                        </div>                   
                        
                        <div class="form-group text-info">
                            <label for="files">Share more about your event</label>
                            <input type="file" multiple class="form-control-file" @change="onFileSelected"  ref="files" id="eventfiles">
                        </div>    
                        <!-- <div class="col-md-6 col-sm-10 mb-3">
                            <ul v-for="(file, index) of files" :key="index" class="list-group list-group-flush">
                                <li class="list-group-item d-flex justify-content-between align-items-center">{{file.name}}
                                    <span class="badge badge-secondary badge-pill"><a @click.prevent="files.splice(index, 1)">X</a></span>
                                </li>                        
                            </ul> 
                        </div>  -->
                     
                    <button v-if="edit" class="btn btn-primary btn-block py-3" type="submit"><strong>Update Event</strong> </button>
                    <button v-else class="btn btn-primary btn-block py-3" type="submit"><strong>Create Event</strong> </button>
                        
                    </form>
                </div>
            </div> 
        </div>
    </section>   
</template>

<script>
import { store } from "../../store/store"
import {mapGetters} from 'vuex'

export default {
    props:['edit'],

    computed:{
        ...mapGetters([        
            "getEvent",
            "getFiles",
            "getUserId"
        ])      
    }, 
    
    data() {        
        return {     
               
            errors: [], 
            
            selectedFiles: [],                      
            newEvent: {  
                userId: this.getUserId || null, //this might be an issue                       
                topic: null,
                description: null,
                location: null,
                audience: null, 
                cost: null,
                date: null,
                time:null,                            
            }            
        };
    },

    methods: {

        onFileSelected(){
           // console.log("This is the event", event)this.$refs.file.files[0]
            this.selectedFiles.push(this.$refs.files.files)
        },

        validateDate(testdate) {
            let date_regex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ 
            return date_regex.test(testdate)
        },

        validateTime(testtime){
            let time_regex = /^(10|11|12|[1-9]):[0-5][0-9]$/
            return time_regex.test(testtime)
        },

        checkForm() {
   
            this.errors = [];

            if (!this.newEvent.topic) {
                this.errors['topic'] = "Topic of the event is required."
            }

            if (!this.newEvent.description) {
                this.errors['description'] = "Description of the event is required."
            }

            if (!this.newEvent.location) {
                this.errors['location'] = "Location of the event is required."
            }

            if (!this.newEvent.audience) {
                this.errors['audience'] = "Audience of the event is required."
            }

            if(!this.validateDate(this.newEvent.date)){
                this.errors['date'] = "Please enter the date of your event in MM/DD/YYYY format e.g. 01/02/2013"
            }

            //not working
            if(!this.newEvent.time){
                this.errors['time'] = "Please enter the time of your event in HH:MM format e.g. 12:30 pm"
            }   
            
            if (!this.newEvent.cost) {
                this.errors['cost'] = 'Cost of the event required; put 0.00 if it free.'
            }
            
            if (this.errors.length ==0 &&
                this.newEvent.topic &&
                this.newEvent.description &&
                this.newEvent.location &&
                this.newEvent.audience&& 
                this.newEvent.date &&
                this.newEvent.cost&&
                this.newEvent.time                
            ){
                return true;
            }

        },
    
        /*
        - Add the event to mutation, ADD_EVENT
        - data has not been sent to server (unpersisted data)
        */
        addEvent() {            

            if(this.edit){
                this.newEvent = Object.assign(this.getEvent)
                this.selectedFiles = this.getFiles
            }
            
            debugger
            this.newEvent.userId = this.getUserId

            if (this.checkForm()&&this.newEvent!==null) {
                
                //add attached files to the file state
                // if(this.selectedFiles[0].length>0){                    
                //     this.$store.commit('ADD_FILES', this.selectedFiles[0])                
                // }
                debugger
                this.$store.commit('ADD_EVENT',  this.newEvent) 
                   
                this.$router.push({ name: 'previewEvent' });
            }
        }
    }
};

</script>
