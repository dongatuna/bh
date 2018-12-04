import axios from 'axios'

const state = {    
    test:[],
    quiz:[]
}

const getters = {
   // getQuiz: state=>state.quiz.questions[0],
    getTest: state=>state.test.questions

    // getTest(state){
    //     for(pages of this.state.questions)
    // }
}

const mutations = {
    
    GET_QUIZ: (state, payload)=>state.quiz = payload,
    GET_TEST: (state, payload)=>state.test = payload
}

const actions = {
    async fetchQuiz(context, payload){
        try{
            
            const response = await axios.get("/questions/10", {                
                data: payload
            })

            const emptyArray = []
            context.commit('GET_QUIZ', emptyArray)

            context.commit("GET_QUIZ", response.data);

        }catch(error){
            alert(error)
        }        
    },

    async fetchTest(context, payload){
        try{
            
            const response = await axios.get("/questions/70", {                
                data: payload
            })

            const emptyArray = []
            context.commit('GET_TEST', emptyArray)

            context.commit("GET_TEST", response.data);

        }catch(error){
            alert(error)
        }        
    }
}

export default{
    state, getters, mutations, actions
}

/*
    get all the questions

    subdivide the questions into arrays of 10 ---use the % 
*/