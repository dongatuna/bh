import Vue from 'vue'
import VueRouter from 'vue-router'
import questionRoutes from './routes/modules/questions'
import eventRoutes from './routes/modules/events'
import jobRoutes from './routes/modules/jobposts'
import resumeRoutes from './routes/modules/resumes'
import adminRoutes from "./routes/routes"
import userRoutes from "./routes/modules/users"
import {store} from './store/store.js'
import App from './App.vue'
import GSignInButton from 'vue-google-signin-button'
import FBSignInButton from 'vue-facebook-signin-button'

//this adds vue router to the entire project
Vue.use(VueRouter)
Vue.use(FBSignInButton)
Vue.use(GSignInButton)

const router = new VueRouter({
  routes:[
    ...eventRoutes,
    ...userRoutes,
    ...adminRoutes,
    ...jobRoutes,
    ...resumeRoutes,
    ...questionRoutes
  ],
  mode: "history",
  scrollBehavior(to, from, savedPosition){
    if(savedPosition){
      return savedPosition
    } else return{x: 0, y:0}
  }
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
