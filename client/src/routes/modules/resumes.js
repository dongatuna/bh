import AddResume from '../../components/resumes/AddResume.vue'
import PreviewResume from '../../components/resumes/PreviewResume.vue'
import ViewResume from '../../components/resumes/ViewResume.vue'
import ViewCandidates from '../../components/resumes/ViewCandidates.vue'

export default [   
    {
        path: '/cv', 
        name: "addJob", 
        component: AddResume, props:{edit: false}, 
        meta: {
            requiresJobseekerAuth:true
        }  
    },
    {
        path: '/editcv', 
        name: "editJob", 
        component: AddResume, props:{edit: true}, 
        meta: {
            requiresJobseekerAuth:true
        }  
    },
    {
        path: '/previewcv', 
        name: 'previewResume', 
        component: PreviewResume, 
        meta: {
            requiresJobseekerAuth:true
        }
    },
    {
        path: '/cv/:id', 
        name:'viewResume', 
        component: ViewResume,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/allcv', 
        name: 'viewCandidates', 
        component: ViewCandidates, 
        meta: {
            requiresAuth:true
        }
    }    
]
