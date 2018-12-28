import axios from "axios"

//state
const state = {
    token: localStorage.getItem('access_token') || null,
    user: {},
    mode: '',
    auth: false   
}
//getters
const getters = {
    
    isLoggedIn: state => !!state.token,
      
    isEmployer: state =>{
      if(state.user!==null && state.auth && state.user.role.type==='employer'){
        return state.user
      }
    },

    isJobSeeker: state =>{
      if(state.user!==null && state.auth && state.user.role.type==='jobseeker'){
        return state.user
      }
    },
    getUser: state => state.user,
    getSignUpMethod: state =>{
      if(state.mode==='local'){
        return true
      }
    },
    getUserAuth: state => state.auth,

    updatedUser: state => {
      if(state.user !== null && state.auth){        
        return state.user
      }
    }
}

//mutations
const mutations = {

  REGISTER_USER(state, payload){
    state.token = payload.token,
    state.user = payload.user,
    state.auth = payload.auth,
    state.mode = payload.user.signupmethod
  },
  
  // Remove user and token    
  REMOVE_USER(state){
    state.auth = false
    state.user = null,
    state.token = null,
    state.mode = ''
  }   
}


const actions = {
     
    async addUser(context, payload) {
      
      try {
          
          const response = await axios({
                method: 'post',
                url: '/users/signup',
                data: payload,
                headers:{ "Content-Type" : "application/json" }
          })
          
          const  newUser  = response.data.payload                               
          localStorage.setItem('access_token', newUser.token)
          axios.defaults.headers.common['Authorization'] = newUser.token 
          debugger 
          context.commit('REGISTER_USER', newUser)       
        
      } catch (error) {
        alert(error)
        localStorage.removeItem('access_token')
      }
    },

    async updateRole(context, payload){
      try {
        //  debugger
          const response = await axios({
              method: 'patch',
              url: '/users/role',
              data: payload,
              headers:{"Content-Type":"application/json"}
          })
          
          const updatedUser = response.data.payload          
          localStorage.setItem('access_token', updatedUser.token)
          axios.defaults.headers.common['Authorization'] = updatedUser.token 
          debugger           
          context.commit('REGISTER_USER', updatedUser)  
        
      } catch (error) {
        alert(error)
        localStorage.removeItem('access_token')
      }

    },

    async loginUser(context, payload) {
      
      try {
        //  debugger
          const response = await axios({
              method: 'post',
              url: '/users/signin',
              data: payload,
              headers:{"Content-Type":"application/json"}
          })
          
          const user = response.data.payload         
          localStorage.setItem('access_token', user.token)
          axios.defaults.headers.common['Authorization'] = user.token            
          context.commit('REGISTER_USER', user)  

      } catch (error) {
        alert(error)
        localStorage.removeItem('access_token')
      }
    },

    async destroyToken(context){
       
      localStorage.removeItem('access_token')
      delete axios.defaults.headers.common['Authorization']
       
      context.commit('REMOVE_USER')
      await axios({
            method: 'get',
            url: '/users/logout'              
      })                   
    },  
     
    async facebookSignUp(context, payload) {
      try {
           
        const response = await axios.post("/users/auth/facebook", {
          access_token: payload,
          headers: { "Content-Type" : "application/json" }
        })     

           
           const user = response.data.payload
           debugger         
           localStorage.setItem('access_token', user.token)
           axios.defaults.headers.common['Authorization'] = user.token        
           debugger    
           context.commit('REGISTER_USER', user)            
        
      } catch (error) {
        alert("Here is the error:", error)
        localStorage.removeItem('access_token')
      }
    },

    async googleSignUp(context, payload) {
      try {
           
          // context.commit('REMOVE_USER')
           const response = await axios.post("/users/auth/google", {
             access_token: payload,
             headers: { "Content-Type": "application/json" }
           })           
          
           debugger
           
          const user = response.data.payload         
          localStorage.setItem('access_token', user.token)
          debugger
          //user.data.token
          debugger
          axios.defaults.headers.common['Authorization'] = user.token      
          debugger      
          context.commit('REGISTER_USER', user)   

      } catch (error) {
        alert(error)
        localStorage.removeItem('access_token')
      }
    } 
   
  }
  
  export default {
    state,
    getters,
    mutations,
    actions
  }

