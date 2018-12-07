<template>
    <section>
        <div class="container-fluid p-5 m-5">
            <div class="row  justify-content-center">
                <div class="col-md-8 col-sm-10">
                    <div class="float-right">
                        <h4>Take an exam </h4>
                    </div>
                    <table class="table table-striped"  v-for="(que, index) of paginate" :key="index">
                        
                        <thead>
                            <tr>
                                <th scope="col"> {{index+1}} : {{que.question}}</th>
                                  <!-- <th v-else scope="col"> {{index+1+10*num}} : {{que.question}}</th> -->
                                                              
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(choices, choiceindex) of que.choices" :key="choiceindex">                            
                                <td>                                     
                                    <div v-if="num===0">
                                        <!-- <label :for="letters[choiceindex]">{{letters[choiceindex]}}: </label>  -->
                                        <input type="radio" :name="que._id" :value="choiceindex"                                            
                                        @change="answerSelected(index, choiceindex)"> ~ {{choices}}                                                                                                               
                                    </div>  

                                    <div v-else>
                                        <!-- <label :for="letters[choiceindex]">{{letters[choiceindex]}}: </label>  -->
                                        <input type="radio" :name="que._id" :value="choiceindex"                                            
                                        @change="answerSelected(index+10*num, choiceindex)"> ~ {{choices}}                                                                                                               
                                    </div>                                                                                                     
                                </td>                                                                                                                         
                            </tr>  
                            <div v-if="graded && answers[index]!==que.answer">
                                <i class="fas fa-times text-success"></i> <p class="text-danger">{{que.rationale}}</p>
                            </div>                                                           
                        </tbody>                       
                        <br>
                        
                    </table>    

                <div v-if="num===6" class="float-right m-3">
                    <button class="btn btn-outline-primary" v-on:click="gradeTest" type="submit">Grade Quiz</button> 
                </div>            

                <div v-if="graded">
                    <strong class="text-danger">Your scored: {{this.score}}/{{this.getTest.length}}</strong>
                </div>  

                    <nav v-if="getTest.length>10" aria-label="Page navigation example">
                        <ul v-if="num===0" class="pagination justify-content-center">                            
                            <li class="page-item"><a class="page-link" @click.prevent="addNum()">Next</a></li>
                            <li class="page-item"><a class="page-link" @click.prevent="num==6">End</a></li>
                        </ul>
                        <ul v-else-if="num===6" class="pagination justify-content-center">
                            
                            <li class="page-item"><a class="page-link" @click.prevent="num==0">Start</a></li>
                            <li class="page-item"><a class="page-link" @click.prevent="reduceNum()">Back</a></li>
                            
                        </ul>
                        <ul v-else class="pagination justify-content-center">
                            
                            <li class="page-item"><a class="page-link" @click.prevent="num==0">Start</a></li>
                            <li class="page-item"><a class="page-link" @click.prevent="reduceNum()">Back</a></li>
                            <li class="page-item"><a class="page-link" @click.prevent="addNum()">Next</a></li>
                            <li class="page-item"><a class="page-link" @click.prevent="num==6">End</a></li>
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
            answerchoices: [],
            wrong: [], 
            answers: [], 
            pages: [],
            graded: false           
        }
    },

    computed:{
        ...mapGetters([
            "getTest",
        ]),

        paginate(){ 
            let startpoint = this.num*10  

            let endpoint = this.num*10+10  

        
            for(startpoint; startpoint<endpoint;startpoint++){
            // this.pages[this.startpoint]=this.getTest[this.startpoint]
                this.pages.push(this.getTest[startpoint])
            }

            debugger
            //this.pagenum++
            return this.pages           
        }      
    },        

    created(){
        this.$store.dispatch("fetchTest")
        //this.paginate()
    },

    methods:{

        addNum(){
            return this.num++
        },

        reduceNum(){
            return this.num--
        },

        // paginate(number){
            
        //     let endpoint = number*10+10
           
        //     let startpoint = number*10
        //     //debugger
            
        //     for(startpoint; startpoint<endpoint;startpoint++){
        //        // this.pages[this.startpoint]=this.getTest[this.startpoint]
        //        this.pages=(this.getTest[startpoint])
        //     }
            
        //     return this.pages
        // },

        answerSelected(ansindex,choice){
            
            this.answers[ansindex]=choice          
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
           
            if(this.arrayLength(this.answers)>=10){
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
