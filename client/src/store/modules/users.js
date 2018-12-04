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
    REMOVE_USER:(state) => state.token = null,
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
  
          context.commit("ADD_USER", token);
        
      } catch (error) {
        alert(error);
      }
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
    },

  
    async updateDBEvent(context, payload) {
      try {
        const response = await axios.patch("/events/:id", {
          data: payload,
          headers: { "Content-Type": "application/json" }
        });
  
        context.commit("UPDATE_EVENT", response.data);
      } catch (error) {
        alert(error);
      }
    }
  }
  
  export default {
    state,
    getters,
    mutations,
    actions
  }

