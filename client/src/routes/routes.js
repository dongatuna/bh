import Home from '../components/Home.vue'
import Admin from '../components/Admin.vue'




export default [
    {path: '/', name: "homeLink", component: Home},    
    {path: '/admin', name: 'admin', component: Admin}
]