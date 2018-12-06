import Login from '../../components/auth/Login.vue'
import Signup from '../../components/auth/Signup.vue'
import UserRole from '../../components/auth/Role.vue'

function loggedInRedirectAdmin(to, from, next){
    if(localStorage.token){
        next('/admin')
    }else{
        next()
    }
}

function roleSelection(to, from, next){
    if(localStorage.token){
        next('/role')
    }else{
        next()
    }
}

function redirectAfterRoleSelection(to, from, next){
    if(localStorage.token){
        next('/admin')
    }else{
        next('/signup')
    }
}


export default  [
    {path: '/signup', name: 'signup', component: Signup, beforeEnter: roleSelection},
    {path: '/login', name:'login', component: Login, beforeEnter: loggedInRedirectAdmin}, 
    {path: '/role', name:'userRole', component: UserRole, beforeEnter: redirectAfterRoleSelection}, 
]