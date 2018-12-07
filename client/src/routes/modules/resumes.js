import AddResume from '../../components/resumes/AddResume.vue'
import PreviewResume from '../../components/resumes/PreviewResume.vue'
import ViewResume from '../../components/resumes/ViewResume.vue'
import ViewCandidates from '../../components/resumes/ViewCandidates.vue'

function isLoggedIn(to, from, next){
    if(localStorage.access_token){
        next() 
    }else {
        next('/login')
    }
}

export default [   
    {path: '/postjob', name: "addJob", component: AddResume, props:{edit: false}, beforeEnter: isLoggedIn},
    {path: '/editjob', name: "editJob", component: AddResume, props:{edit: true}, beforeEnter: isLoggedIn},
    {path: '/previewjob', name: 'previewResume', component: PreviewResume, beforeEnter: isLoggedIn},
    {path: '/jobs/:id', name:'viewResume', component: ViewResume},
    {path: '/candidates', name: 'viewCandidates', component: ViewCandidates, beforeEnter: isLoggedIn }    
]
