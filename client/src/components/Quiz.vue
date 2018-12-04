<template>
    <section>
        <div class="container-fluid p-5 m-5">
            <div class="row  justify-content-center">
                <div class="col-md-8 col-sm-10">
                    <div class="float-right">
                        <h4>Take an exam </h4>
                    </div>
                    <table class="table table-striped" v-for="(queObj, index) of this.getQuiz" :key="index">
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
                    <strong class="text-danger">{{this.score}}/{{this.getQuiz.length}}</strong>
                </div>  

                                          
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
            answerchoices: [],
            wrong: [],
            graded:false,
            answers: []
        }
    },

    computed:{
        ...mapGetters([
            "getQuiz",
        ])       
    },        

    created(){
        this.$store.dispatch("fetchQuiz")
    },

    methods:{
        answerSelected(ansindex,choice){
            
            this.answers[ansindex]=choice          
        }, 
        
        arrayLength(thisArray){
           
            let size = 0, key; 
            for (key of thisArray) { 
                if (thisArray.hasOwnProperty(key)) size++; 
            } 

            debugger
            return size;            
        },
        
        gradeTest(){
           
            if(this.arrayLength(this.answers)===10){
                let numOfAnswers = this.getQuiz.length
                for(let index = 0; index < numOfAnswers; index++){
                    if(this.answers[index]===this.getQuiz[index].answer){
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
