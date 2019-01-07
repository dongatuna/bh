import axios from "axios"

const state = {
  
  events: [],
  eventfiles:[],
  event: {}
};

const getters = {
  /*
        in the computed properties in the vue  
            - sort events by user
            - get the property length
    */
  getEvents: state => state.events,
  getEvent: state =>state.event,
  getFiles: state => state.eventfiles
  
};

const mutations = {
  ADD_FILES:(state, payload) => state.eventfiles = payload,
  EVENTS:(state, payload) => state.events = payload,
  //debugger
 
  ADD_EVENT:(state, payload) => state.event = Object.assign(payload),
  DELETE_EVENT(state, payload){
    state.events.splice(state.events.indexOf(payload), 1)
  },

  CLEAR_STATE:(state)=>state.events=[]
};

const actions = {
  
  async getDBEvents(context, payload) {
    try {
      //debugger
      //clear the state before adding the events
       
       context.commit('CLEAR_STATE')
      
      const response = await axios.get("/events")
      
      context.commit("EVENTS", response.data.commEvents)

    } catch (error) {
       error
    }
  },

  async addDBEvent(context, payload) {
    
    try {
        const response = await axios({
          method: 'post',
          url: '/events',
          data: payload,
          headers:{"Content-Type":"multipart/form-data"}
          //headers:{"Content-Type":"application/json"}
        })

      //state.event = {}

      //debugger

      //context.commit("ADD_EVENT", response.data);
      
    } catch (error) {
      alert(error);
    }
  },



  async getDBEventById(context, payload){
    try{
      
      const response = await axios.get('/events/'+payload)
      debugger
      context.commit("ADD_EVENT", response.data)
      
    }catch(error){
      console.error(error)
    }
  },

  async deleteDBEvent(context, payload) {
    try {
      //const response = await axios.delete(`/events/${payload}`)

      debugger
      const response = await axios( {
        method: "delete",
        url: `/events/${payload[1]}`,
        headers: {'Authorization' :  payload[0]} 
       })

      debugger
      context.commit("DELETE_EVENT", response.data)
    } catch (error) {
      alert("Here is the stupid error...", error)
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
};

export default {
  state,
  getters,
  mutations,
  actions
};
