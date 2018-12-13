import AddEvent from '../../components/events/AddEvent.vue'
import PreviewEvent from '../../components/events/PreviewEvent.vue'
import ViewEvent from '../../components/events/ViewEvent.vue'
import ListEvents from '../../components/events/ListEvents.vue'

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth&& record.meta.requiresOrg)) {
      if (store.getters.isLoggedIn) {
        next()
        return
      }
      next('/login') 
    } else {
      next() 
    }
  })

export default [   
    {path: '/addevent', name: "addEvent", 
            component: AddEvent, props:{edit: false}, 
            beforeEnter: isLoggedIn,
            requiresAuth:true,
            requiresOrg: true},
    {path: '/editevent', name: "editEvent", component: AddEvent, props:{edit: true}, beforeEnter: isLoggedIn},
    {path: '/previewevent', name: 'previewEvent', component: PreviewEvent, beforeEnter: isLoggedIn},
    {path: '/events', name: 'listEvents', component: ListEvents},
    {path: '/events/:id', name:'viewEvent', component: ViewEvent}    
]

// export default{
//     eventRoutes
// }