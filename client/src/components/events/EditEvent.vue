<template>
    <section class="bg-light mt-5 py-5">
        <div class="container-fluid">
            <div class="row justify-content-center p-3">
                <div class="col-md-8 col-sm-10">
                    <h4 class="text-dark display-4" >Edit Event</h4>
                    
                    <form v-on:submit.prevent="addEvent" class="text-muted lead" ref="form" enctype="multipart/form-data">
                    <div class="form-group">
                        <label for="topic">Topic of Event</label>
                        <input type="text" class="form-control form-control-lg" name="topic" id="topic" :value="topic"  required>                        
                    </div>
                        
                    <div class="form-group mb-3">
                        <label for="description">Event Description</label>
                        <textarea class="form-control" id="description" name="description" cols="30" rows="15" v-model="description" required></textarea>
                    </div>    
                    
                    <div class="form-group">
                        <label for="location">Location</label>
                        <input type="text" class="form-control" name="location" id="location" v-model="location" required>
                    </div>

                    <div class="form-group">
                        <label for="audience">Target Audience</label>
                        <input type="text" class="form-control" name="audience" id="audience" v-model="audience" required>
                    </div>

                 <!--   <div class="row">
                        <div class="col-md-6 col-sm-10">
                            <div class="form-group">
                                <label for="date">Date of Event</label>
                                <input type="text" class="form-control" name="date" id="date" placeholder="MM/DD/YYYY" v-model="newEvent.date" required>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-10">
                            <div class="form-group">
                                <label for="time">Time of Event</label>
                                <input type="text" class="form-control" name="time" id="time" placeholder="HH:MM" v-model="newEvent.time" required>
                            </div>
                        </div>

                        <div class="col-md-4 col-sm-10">
                            <div class="form-group">
                                <label for="cost">COST ($)</label>
                                <input type="text" class="form-control" name="cost" id="cost" placeholder="HH:MM" v-model="newEvent.cost" required>
                                <span><small>Write 0.00 if it is free</small></span>
                            </div>
                        </div>
                    </div>                
                    
                  <p>Share more about your event</p>
                        <div class="custom-file mb-3">
                            <input type="file" class="custom-file-input" id="attachment"
                            @change="onFileSelected">
                           <label class="custom-file-label" for="attachment">Upload!</label>
                        </div>       -->       

                    <button class="btn btn-primary btn-block py-3" type="submit"><strong>Edit Event</strong> </button>
                    
                        
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
    

    computed:{
        ...mapGetters([
        
            //learn about trace statement
            //Devin thinks that the page loads before the computed property is retrieved
            //builds page before object set up
            "getPreviewEvent"
        ])      
    },

    data() {
        return {      
            
            newEvent: {
                topic: this.getPreviewEvent.topic,
                description: this.getPreviewEvent.description,
                location: this.getPreviewEvent.location,
                audience: this.getPreviewEvent.audience, 
                // selectedFile: []
                // 'date': '',
                //'time':''
            }
        };
    },

    methods: {
        checkForm(event) {
            if (
                this.topic &&
                this.description &&
                this.location &&
                this.audience 
                // this.date &&
                // this.event
            ) {
                return true;
            }

            this.errors = [];

            if (!this.topic) {
                this.errors.push("Title of the event is required.");
            }
            if (!this.description) {
                this.errors.push("Description of the event required.");
            }

            if (!this.location) {
                this.errors.push("Location of the event required.");
            }

            if (!this.audience) {
                this.errors.push("Audience of the event required.");
            }

            // if (!this.date) {
            //     this.errors.push('Date of the event required.');
            // }

            // if (!this.time) {
            //     this.errors.push('Time of the event required.');
            // }

            //e.preventDefault();
            },

    // onFileSelected(event){
    //     this.selectedFile.push(event.target.files[0])
    // },
    /*
        - Add the event to mutation, ADD_EVENT
        - data has not been sent to server (unpersisted data)
        */
        addEvent() {
            if (this.checkForm) {
                const userEvent = {
                topic: this.newEvent.topic,
                description: this.newEvent.description,
                location: this.newEvent.location,
                audience: this.newEvent.audience
                // date: this.date,
                //time: this.time
                };
            // console.log("This is the event ", this.userEvent);
                this.$store.commit("ADD_EVENT", userEvent);
                //this.$store.dispatch("addEvent", userEvent);
                this.$refs.form.reset();
                this.$router.push({ name: 'previewEvent' });
            }
        }
    }
};
</script>

<style>
</style>