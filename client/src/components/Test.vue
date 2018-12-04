<template>
    <section>
        <div class="container-fluid p-5 m-5">
            <div class="row  justify-content-center">
                <div class="col-md-8 col-sm-10">
                    <div class="float-right">
                        <h4>Take an exam </h4>
                    </div>
                    <table class="table table-striped" v-for="(queObj, index) of this.getTest" :key="index">
                        <thead>
                            <tr>
                                <th scope="col">{{index+1}} : {{queObj.question}}</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(choices, choiceindex) of queObj.choices" :key="choiceindex">                            
                                <td>                                     
                                    <div>
                                        <!-- <label :for="letters[choiceindex]">{{letters[choiceindex]}}: </label>  -->
                                        <input type="radio" :name="queObj._id" :value="choiceindex"                                            
                                        @change="answerSelected(index, choiceindex)">~ {{choices}}                                                                                                               
                                    </div>                                                                                                    
                                </td>                                                                                                                         
                            </tr>  
                            <div v-if="graded&&answers[index]!==queObj.answer">
                               <i class="fas fa-times text-success"></i> <p class="text-danger">{{queObj.rationale}}</p>
                            </div>                                                           
                        </tbody>
                        <br>
                    </table>
                <div class="float-right m-3">
                    <button class="btn btn-outline-primary" v-on:click="gradeTest" type="submit">Grade Quiz</button> 
                </div>

                <div v-if="graded">
                    <strong class="text-danger">{{this.score}}/{{this.getTest.length}}</strong>
                </div>  

                    <nav v-if="this.getTest.length>10" aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                            <li class="page-item"><a class="page-link" href="#">Start</a></li>
                            <li class="page-item"><a class="page-link" href="#">Back</a></li>
                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
                            <li class="page-item"><a class="page-link" href="#">End</a></li>
                        </ul>
                    </nav>                         
                </div>
            </div>
        </div>
    </section>

    
</template>
<script>

import {mapGetters} from "vuex"
export default {
    name:'questions',
    data(){
        return{
            score: 0,
            num: 0,
            graded:false,
            answers: [],
            pages: []            
        }
    },

    computed:{
        ...mapGetters([
            "getTest",
        ])       
    },        

    created(){
        this.$store.dispatch("fetchTest")
    },

    methods:{
        answerSelected(ansindex,choice){
            
            //if(number==indexOf(choice))
            this.answers[ansindex]=choice          
            //this.answerchoices = this.answers.keys()
            //debugger
        }, 
        
        arrayLength(thisArray){
           // Object.size = function(obj) {  }; 
            let size = 0, key; 
            for (key of thisArray) { 
                if (thisArray.hasOwnProperty(key)) size++; 
            } 

            debugger
            return size;            
        },
        
        gradeTest(){
           
            if(this.arrayLength(this.answers)===10){
                let numOfAnswers = this.getTest.length
                for(let index = 0; index < numOfAnswers; index++){
                    if(this.answers[index]===this.getTest[index].answer){
                        this.score++
                    }else{
                        this.wrong[index] =this.answers[index]
                        //this.wrong[index] = this.answers
                        this.score
                    }

                } 
                debugger
                this.graded = true
                debugger
                if(this.arrayLength(this.wrong)>0) {
                    return [this.score, this.wrong]
                }else return this.score 
            }else alert('Fill out all the questions.') 
        },
    }
}
</script>
