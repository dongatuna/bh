import axios from "axios"
//import jwt_decode from 'jwt-decode'

//state
const state = {
    token: localStorage.getItem('access_token') || null,
    user: {},
    auth: false   
}
//getters
const getters = {
    
    isLoggedIn: state => !!state.token,
    updatedUser: state => {
      if(state.user !== null && state.user.role.updated){
        state.auth = true
        return state.user
      }
    },
    
    getUser: state => state.user !== null 

  }

//mutations
const mutations = {

    REGISTER_USER(state, payload){
      state.token = payload.token,
      state.user = payload.user,
      state.auth = payload.auth
    },
    //Add user and token  
    ADD_USER(state, payload){
       state.user = payload     
    },  
   // Remove user and token    
    REMOVE_USER(state){
      //state.status = ''
      state.user = null,
      state.token = null
    }   
}


const actions = {
     
    async addUser(context, payload) {
      
      try {
          
          const response = await axios({
                method: 'post',
                url: '/users/signup',
                data: payload,
                headers:{"Content-Type":"application/json"}
          })
          
          const { newUser } = response.data    
          debugger                    
          context.commit('ADD_USER', newUser)       
        
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
          
          const payload = response.data          
          localStorage.setItem('access_token', payload.token)
          axios.defaults.headers.common['Authorization'] = payload.token            
          context.commit('REGISTER_USER', payload)  
        
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
          
          const payload = response.data          
          localStorage.setItem('access_token', payload.token)
          axios.defaults.headers.common['Authorization'] = payload.token            
          context.commit('ADD_USER', payload)  

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
             //payload,
             headers: { "Content-Type": "application/json" }
           })    

           const payload = response.data          
           localStorage.setItem('access_token', payload.token)
           axios.defaults.headers.common['Authorization'] = payload.token            
           context.commit('ADD_USER', payload)            
        
      } catch (error) {
        alert(error)
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
           
          const payload = response.data          
          localStorage.setItem('access_token', payload.token)
          axios.defaults.headers.common['Authorization'] = payload.token            
          context.commit('ADD_USER', payload)   

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

