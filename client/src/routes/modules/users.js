import Login from '../../components/auth/Login.vue'
import Signup from '../../components/auth/Signup.vue'
import UserRole from '../../components/auth/Role.vue'

export default  [
    {
        path: '/signup', 
        name: 'signup', 
        component: Signup
    },
    {
        path: '/login', 
        name:'login', 
        component: Login
    }, 
    {
        path: '/role', 
        name:'userRole', 
        component: UserRole,
        meta: {
            requireAuth: true
        }
    }, 
]