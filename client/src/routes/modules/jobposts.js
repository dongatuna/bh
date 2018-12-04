import PostJob from '../../components/jobs/PostJob.vue'
import PreviewJob from '../../components/jobs/PreviewJob.vue'
import ViewJob from '../../components/jobs/ViewJob.vue'
import ListJobs from '../../components/jobs/ListJobs.vue'

export default [   
    {path: '/postjob', name: "postJob", component: PostJob, props:{edit: false}},
    {path: '/editjob', name: "editJob", component: PostJob, props:{edit: true}},
    {path: '/previewjob', name: 'previewJob', component: PreviewJob},
    {path: '/jobs', name: 'listJobs', component: ListJobs},
    {path: '/jobs/:id', name:'viewJob', component: ViewJob}    
]
