import PostJob from '../../components/jobs/PostJob.vue'
import PreviewJob from '../../components/jobs/PreviewJob.vue'
import ViewJob from '../../components/jobs/ViewJob.vue'
import ListJobs from '../../components/jobs/ListJobs.vue'

export default [   
    {
        path: '/postjob', 
        name: "postJob", 
        component: PostJob, props:{edit: false}, 
        meta: {
            requiresEmployerAuth:true
        }
    },
    {
        path: '/editjob', 
        name: "editJob", component: PostJob, 
        props:{edit: true}, 
        meta: {
            requiresEmployerAuth:true
        }
    },
    {
        path: '/previewjob', 
        name: 'previewJob', 
        component: PreviewJob, 
        meta: {
            requiresEmployerAuth:true
        }
    },
    {
        path: '/jobs', 
        name: 'listJobs', 
        component: ListJobs
    },
    {
        path: '/jobs/:id', 
        name:'viewJob', 
        component: ViewJob
    }    
]
