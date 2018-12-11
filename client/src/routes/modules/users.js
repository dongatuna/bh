import Login from '../../components/auth/Login.vue'
import Signup from '../../components/auth/Signup.vue'
import UserRole from '../../components/auth/Role.vue'

// function loggedInRedirectAdmin(to, from, next){
//     if(localStorage.access_token){
//         next('/admin')
//     }else{
//         next('/login')
//     }
// }

// // function roleSelection(to, from, next){
// //     if(localStorage.access_token){
// //         next('/role')
// //     }else{
// //         next('/signup')
// //     }
// // }

// function redirectAfterRoleSelection(to, from, next){
//     if(localStorage.access_token){
//         next('/admin')
//     }else{
//         next('/signup')
//     }
// }


export default  [
    {path: '/signup', name: 'signup', component: Signup},
    {path: '/login', name:'login', component: Login}, 
    {path: '/role', name:'userRole', component: UserRole}, 
]