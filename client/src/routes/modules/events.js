import AddEvent from '../../components/events/AddEvent.vue'
import PreviewEvent from '../../components/events/PreviewEvent.vue'
import ViewEvent from '../../components/events/ViewEvent.vue'
import ListEvents from '../../components/events/ListEvents.vue'

export default [   
    {path: '/addevent', name: "addEvent", component: AddEvent, props:{edit: false}},
    {path: '/editevent', name: "editEvent", component: AddEvent, props:{edit: true}},
    {path: '/previewevent', name: 'previewEvent', component: PreviewEvent},
    {path: '/events', name: 'listEvents', component: ListEvents},
    {path: '/events/:id', name:'viewEvent', component: ViewEvent}    
]

// export default{
//     eventRoutes
// }