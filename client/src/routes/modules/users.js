import Signup from '../../components/auth/Signup.vue'
import UserRole from '../../components/auth/Role.vue'

export default  [
    {
        path: '/signup', 
        name: 'signup', props:{signup: true},
        component: Signup,
        // meta: {
        //     requireAuth: false
        // }
    },
    {
        path: '/login', 
        name:'login', props:{signup: false},
        component: Signup,
        // meta: {
        //     requireAuth: false
        // }
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