import PostJob from '../../components/jobs/PostJob.vue'
import PreviewJob from '../../components/jobs/PreviewJob.vue'
import ViewJob from '../../components/jobs/ViewJob.vue'
import ListJobs from '../../components/jobs/ListJobs.vue'

function isLoggedIn(to, from, next){
    if(localStorage.access_token){
        next() 
    }else {
        next('/login')
    }
}

export default [   
    {path: '/postjob', name: "postJob", component: PostJob, props:{edit: false}, beforeEnter: isLoggedIn},
    {path: '/editjob', name: "editJob", component: PostJob, props:{edit: true}, beforeEnter: isLoggedIn},
    {path: '/previewjob', name: 'previewJob', component: PreviewJob, beforeEnter: isLoggedIn},
    {path: '/jobs', name: 'listJobs', component: ListJobs},
    {path: '/jobs/:id', name:'viewJob', component: ViewJob}    
]
