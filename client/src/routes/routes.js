import Home from '../components/Home.vue'
import Admin from '../components/Admin.vue'
import AddResume from '../components/resumes/AddResume.vue'
import ListJobs from '../components/jobs/ListJobs.vue'
import PostJob from '../components/jobs/PostJob.vue'
import ListEvents from '../components/events/ListEvents.vue'

export default [
    {path: '/', name: "homeLink", component: Home},    
    {path: '/admin', name: 'admin', component: Admin,
        children: [
           // {path: '/settings', name: 'setting', component: Setting},
            { path: '/cv', name: 'addResume', component: AddResume, props:{edit: false},
                meta: {
                    requiresJobseekerAuth:true
                }
            },
            { path: '/postjob', name: 'addResume', component: AddResume, props:{edit: false},
                meta: {
                    requiresJobseekerAuth:true
                }
            },
            { path: '/events', name: 'listEvents', component: ListEvents},
            { path: '/jobs', name: 'listJobs', component: ListJobs },
        ]
    }
]