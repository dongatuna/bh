import axios from 'axios'

const state = {  
    posts: [] ,
    applicants: []
}

const getters = {
    /*
        in the computed properties in the vue  
            - sort events by user
            - get the property length
    */
   
    getPosts: state =>state.posts,     
    numberofPosts: state =>state.posts.length
}

const mutations = {

    POSTS:(state, payload)=>state.posts = payload,
    ADD_POST:(state, payload)=>state.posts.unshift(payload)
}

const actions = {
    async getPosts(context, payload){
        try{
            const response = await axios.get("/jobs", {
                data: payload

            });

            context.commit("POSTS", response.data);
        }catch(error){
            console.log(error)
        }
    },

    async addPosts(context, payload){
        try{
            const response = await axios.post('/jobs',{
                data: payload,
                headers: {'Content-Type':'application/json'}
            } );

            context.commit("ADD_POST", response.data);
        }catch(error){
            console.log(error)
        }
    },

    async removePost(context, payload){
        try{
            const response = await axios.delete('/jobs/:id',{
                data: payload,
                
               // headers: {'Content-Type':'application/json'}
            } );

            context.commit("REMOVE_POST", response.data)

        }catch(error){
           console.log(error)
        }
    },

    async updateEvent(context, payload){
        try{
            const response = await axios.patch('/jobs/:id',{
                data: payload,
                headers: {'Content-Type':'application/json'}
            } );

            context.commit("UPDATE_POST", response.data)

        }catch(error){
            console.log(error)
        }
    }
}

export default{
    state, getters, mutations, actions
}