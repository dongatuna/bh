<template>

    <section class="py-5 mt-5 bg-light">
        <div class="container-fluid">
            <div class="row justify-content-center p-3">
                <div class="col-md-8 col-sm-10">
                <div class="card lead">
                    <div class="card-body">
                        <h4 class="card-title py-3"><strong>{{getEvent.Topic}}</strong></h4>
                        <h5 class="card-subtitle py-1"><strong>Target Audience: </strong><span class="text-muted">  {{ getEvent.Audience}} </span></h5>
                        <h5 class="card-subtitle py-1"><strong>Time and Date: </strong><span class="text-muted">November 12, 2018 at 4:00 p.m.</span> </h5>
                        <h5 class="card-subtitle py-1"><strong>Location: </strong><span class="text-muted">{{getEvent.Location}}</span> </h5>
                        <hr>
                        <p class="card-text">{{getEvent.Description}}</p>
                        <!-- <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>-->
                        
                        <!-- <div class="row justify-content-between m-3">
                            <button class="btn btn-secondary col-md-3 col-sm-10" type="submit" v-on:click="editPost">Edit</button>
                            <button class="btn btn-primary col-md-3 col-sm-10" type="submit" v-on:click="addPost">Post</button>
                        </div> -->

                        <hr>

                        <div class="py-2 text-right">                    
                            <p class="px-3"><strong>Share on: </strong></p>
                            <a href="#"><i class="far fa-envelope fa-2x text-secondary mx-3"></i></a>
                            <a href="#"><i class="fab fa-facebook fa-2x text-primary mx-3"></i></a>
                            <a href="#"><i class="fab fa-meetup fa-2x text-danger mx-3"></i></a>                               
                        </div>
                    
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
    data(){
        return{
            id: this.$route.params.id
        }
    },
    computed:{
        ...mapGetters([
            "getEvent"
        ])
    },

    created(){
        this.$store.dispatch("getDBEventById", this.id)
    }
    
}
</script>

<style>

</style>