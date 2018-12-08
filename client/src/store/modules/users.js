import axios from "axios";

//state
const state = {
    token: localStorage.getItem('access_token') || null,
    userId: null   
};
//getters
const getters = {
    /*
      in the computed properties in the vue  
        - sort events by user
        - get the property length
    */
    getToken: state => state.token!==null,
    getUserId: state =>state.userId

  };

//mutations
const mutations = {
    ADD_USER:(state, payload)=>state.token = payload,    
    REMOVE_USER_TOKEN:(state) => state.token = null,
    REMOVE_USER_ID: (state) => state.userId = null,
    SET_USER_ID: (state, payload) => state.userId = payload
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

          
          localStorage.setItem('access_token', token)          
          debugger
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
       localStorage.setItem('access_token', null)
       context.commit('REMOVE_USER_TOKEN')  
       context.commit('REMOVE_USER_ID')   

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

           const userId = response.data.userId              
  
           context.commit("SET_USER_ID", userId)  
        
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
           
           const userId = response.data.userId              
  
           context.commit("SET_USER_ID", userId)   
        

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

