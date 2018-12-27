import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import event from './modules/events'
import questions from './modules/questions'
import jobpost from './modules/jobposts'
import resume from './modules/resumes'
import user from "./modules/users"

Vue.use(Vuex)

export const store = new Vuex.Store({
    plugins: [createPersistedState()],
    modules:{
       event, jobpost, questions, resume, user
    }
})
