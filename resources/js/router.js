import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const foo ={template:"<v-alert type='error'>This is error</v-alert>"};
const bar ={template:"<v-alert type='info'>This is info</v-alert>"};
const user = { template:"<v-alert type='warning'>This is {{ $route.params.name }}</v-alert>"};
import loginComponent from './components/loginComponent.vue';
import adminComponent from './components/AdminComponent.vue';
import roleComponent from './components/RoleComponent.vue';
import rolenewComponent from './components/RolenewComponent.vue';
import test from './components/test.vue';

const routes = [
{
    path:'/foo',
    component:foo
},
{
    path:'/bar',
    component:bar
},
{
    path:'/user/:name',
    component:user
}
,
{
    path:'/login',
    component:loginComponent,
    name:'Login',
    // beforeEnter:(to,from,next)=>{
    //     if(localStorage.getItem('token')){
    //         next('/admin');
    //     }
    // }
},
{
    path:'/',
    redirect:'/login'
},

{
    path:'/admin',
    component:adminComponent,
    children:[
        {
            path:'role',
            component:roleComponent
        },
        {
            path:'post',
            component:rolenewComponent
        },
       
    ],
    beforeEnter:(to,from,next)=>{
        axios.get('api/verify')
        .then( (response) =>{
          // handle success
         next();
        })
        .catch( (error) => {
            next('login');
          console.log(error);
        })
        .then(function () {
          // always executed
        });
      

    }
},
{
    path:'/test',
    component:test
}


]   ;   

const router = new Router({routes});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token') ||null;
    window.axios.defaults.headers['Authorization'] = 'Bearer '+token;
    next();
  })

export default router;