import AddResume from '../../components/resumes/AddResume.vue'
import PreviewResume from '../../components/resumes/PreviewResume.vue'
import ViewResume from '../../components/resumes/ViewResume.vue'
import ViewCandidates from '../../components/resumes/ViewCandidates.vue'
export default [   
    {path: '/postjob', name: "addJob", component: AddResume, props:{edit: false}},
    {path: '/editjob', name: "editJob", component: AddResume, props:{edit: true}},
    {path: '/previewjob', name: 'previewResume', component: PreviewResume},
    {path: '/jobs/:id', name:'viewResume', component: ViewResume},
    {path: '/candidates', name: 'viewCandidates', component: ViewCandidates }    
]
