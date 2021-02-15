import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const foo ={template:"<v-alert type='error'>This is error</v-alert>"};
const bar ={template:"<v-alert type='info'>This is info</v-alert>"};
const user = { template:"<v-alert type='warning'>This is {{ $route.params.name }}</v-alert>"};
import loginComponent from './components/loginComponent.vue';
import adminComponent from './components/AdminComponent.vue';
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
    beforeEnter:(to,from,next)=>{
        if(localStorage.getItem('token')){
            next();
            console.log(localStorage.getItem('token'));
        }else{
            next('/login');
        }

    }
},
{
    path:'/test',
    component:test
}


]   ;   

export default new Router({routes})