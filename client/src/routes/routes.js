import Home from '../components/Home.vue'
import Admin from '../components/Admin.vue'


function isLoggedIn(to, from, next){
    if(localStorage.token){
        next() 
    }else {
        next('/login')
    }
}

export default [
    {path: '/', name: "homeLink", component: Home},    
    {path: '/admin', name: 'admin', component: Admin, beforeEnter: isLoggedIn}
]