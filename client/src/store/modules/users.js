import axios from "axios"
//import jwt_decode from 'jwt-decode'

//state
const state = {
    role: "",
    updatedRole: false,
    token: localStorage.getItem('access_token') || null,
    user: {}   
}
//getters
const getters = {
    
    //getToken: state => state.token!==null,
    isLoggedIn: state => !!state.token,
    updatedUser: state => {
      if(state.user !== null && state.user.role.updated){
        state.updateRole = true
        return state.user
      }
    },
    
    getUser: state => state.user !== null
    //getRole: state =>state.user.role.type,

  }

//mutations
const mutations = {
    //Add user and token  
    ADD_USER(state, payload, token){
      //state.status = 'success'
      state.user = payload,
      state.token = token
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
          
          const {auth, newUser, token} = response.data    
          debugger      
          localStorage.setItem('access_token', token)
          axios.defaults.headers.common['Authorization'] = token            
          context.commit('ADD_USER', newUser, token)       
        
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
          context.commit('ADD_USER', payload)  
        
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
           const response = await axios.post("/users/auth/google", {
             access_token: payload,
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
    } 
   
  }
  
  export default {
    state,
    getters,
    mutations,
    actions
  }

