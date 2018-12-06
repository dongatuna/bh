import axios from "axios";

//state
const state = {
    token: localStorage.getItem('access_token') || null   
};
//getters
const getters = {
    /*
          in the computed properties in the vue  
              - sort events by user
              - get the property length
      */
    getToken: state => state.token!==null
  };

//mutations
const mutations = {
    ADD_USER:(state, payload)=>state.token = payload,    
    REMOVE_USER:(state, payload) => state.token = payload,
};

//actions


const actions = {
     
    async addUser(context, payload) {
      
      try {
        //  debugger
          const response = await axios({
                method: 'post',
                url: '/users/signup',
                data: payload,
                headers:{"Content-Type":"application/json"}
          })
          
          const token = response.data.access_token

          localStorage.setItem('access_token', token)          
  
          context.commit("ADD_USER", token)
        
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

          debugger
          localStorage.setItem('access_token', token)          
  
          context.commit("ADD_USER", token)
        
      } catch (error) {
        alert(error);
      }
    },

    async destroyToken(context, payload){
       // axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

        const response = await axios({
              method: 'get',
              url: '/users/logout',
              headers: { Authorization: `${context.state.token}` }
              //headers:{"Content-Type":"application/json"}
            })
        localStorage.removeItem('access_token')
        
        context.commit('REMOVE_USER', response.data.null_token)
        
    },
  
     
    async facebookSignUp(context, payload) {
      try {
           const response = await axios.post("/users/auth/facebook", {
             access_token: payload,
             headers: { "Content-Type": "application/json" }
           })

           const token = response.data.token

           localStorage.setItem('access_token', token)          
  
           context.commit("ADD_USER", token)  
        
        //context.commit("DELETE_EVENT", response.data);
      } catch (error) {
        alert(error);
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

           localStorage.setItem('access_token', token)          
  
           context.commit("ADD_USER", token)  
        
        //context.commit("DELETE_EVENT", response.data);
      } catch (error) {
        alert(error);
      }
    }

    //action for password reset

  
   
  }
  
  export default {
    state,
    getters,
    mutations,
    actions
  }

