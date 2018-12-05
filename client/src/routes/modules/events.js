import AddEvent from '../../components/events/AddEvent.vue'
import PreviewEvent from '../../components/events/PreviewEvent.vue'
import ViewEvent from '../../components/events/ViewEvent.vue'
import ListEvents from '../../components/events/ListEvents.vue'

function isLoggedIn(to, from, next){
    if(localStorage.token){
        next() 
    }else {
        next('/login')
    }
}

export default [   
    {path: '/addevent', name: "addEvent", component: AddEvent, props:{edit: false}, beforeEnter: isLoggedIn},
    {path: '/editevent', name: "editEvent", component: AddEvent, props:{edit: true}, beforeEnter: isLoggedIn},
    {path: '/previewevent', name: 'previewEvent', component: PreviewEvent, beforeEnter: isLoggedIn},
    {path: '/events', name: 'listEvents', component: ListEvents},
    {path: '/events/:id', name:'viewEvent', component: ViewEvent}    
]

// export default{
//     eventRoutes
// }