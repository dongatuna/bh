import axios from "axios"
import jwt_decode from 'jwt-decode'

//state
const state = {
    token: localStorage.getItem('access_token') || null,
    user: null      
}
//getters
const getters = {
    
    getToken: state => state.token!==null,
    getUser: state => state.user
  }

//mutations
const mutations = {
    ADD_TOKEN:(state, payload) => state.token = payload,  
    ADD_USER:(state, payload) => state.user = payload,  
    REMOVE_USER_TOKEN:(state) => state.token = null    
}

//actions


const actions = {
     
    async addUser(context, payload) {
      
      try {
          debugger
          const response = await axios({
                method: 'post',
                url: '/users/signup',
                data: payload,
                headers:{"Content-Type":"application/json"}
          })
          
          const token = response.data.token
          const user = jwt_decode(token)
          localStorage.setItem('access_token', token)          
          context.commit('ADD_TOKEN', token)
          context.commit('ADD_USER', user)
       
        
      } catch (error) {
        alert(error);
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
          
          const token = response.data.token
          const user = jwt_decode(token)
          localStorage.setItem('access_token', token)          
          context.commit('ADD_TOKEN', token)
          context.commit('ADD_USER', user)
        
      } catch (error) {
        alert(error);
      }

    },

    async logInUser(context, payload) {
      
      try {
        //  debugger
          const response = await axios({
                method: 'post',
                url: '/users/signin',
                data: payload,
                headers:{"Content-Type":"application/json"}
          })
          
          const token = response.data.token
          const user = jwt_decode(token)         
          localStorage.setItem('access_token', token)
          context.commit('ADD_TOKEN', token)     
          context.commit('ADD_USER', user)     
      } catch (error) {
        alert(error)
      }
    },

    async destroyToken(context){
       
       localStorage.setItem('access_token', null)
       context.commit('REMOVE_USER_TOKEN')  
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

           const token = response.data.token 

           const user = jwt_decode(token) 
           localStorage.setItem('access_token', token) 
           
           context.commit('ADD_TOKEN', token)
           context.commit('ADD_USER', user)            
        
      } catch (error) {
        alert(error)
      }
    },

    async googleSignUp(context, payload) {
      try {
           const response = await axios.post("/users/auth/google", {
             access_token: payload,
             headers: { "Content-Type": "application/json" }
           })

           debugger
           
           const token = response.data.token             
  
           const user = jwt_decode(token) 
           localStorage.setItem('access_token', token) 
           
           context.commit('ADD_TOKEN', token)
           context.commit('ADD_USER', user)    

      } catch (error) {
        alert(error)
      }
    } 
   
  }
  
  export default {
    state,
    getters,
    mutations,
    actions
  }

