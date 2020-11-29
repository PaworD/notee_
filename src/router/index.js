import Vue from 'vue'
import VueRouter from 'vue-router'
import MyNotes from '../views/MyNotes.vue'
import MyNote from '../views/MyNote.vue'
import Home from '../views/Home.vue'
import CreateNote from '../views/CreateNote.vue'
import SharedLink from '../views/Shared.vue';
import Login from '../views/Login.vue';


import store from '../store/index';

Vue.use(VueRouter)

const routes = [

{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth : true // Auth Guard Meta Tag
    },

    children: [

      {
        path: '/mynotes',
        component: MyNotes,
        name : "MyNotes"
      },   
      {
        path: '/mynotes/create',
        component: CreateNote,
        name: "CreateNote"
      }, 
      {
        path: '/mynotes/:id',
        component: MyNote,
        name: "MyNote"
      },    
    ]
  },

  {
    path: '/login',
    component: Login,
    name: "Login"
  }, 
  {
    path: '/shared/note/:owner/:note',
    component: SharedLink,
    name: "Shared",
  }
 
]

const router = new VueRouter({
  routes
})


/** 
 * Checking if this @route is for authorized users 
 * */

router.beforeEach((to, from ,next) =>{
  if(to.matched.some(record => record.meta.requiresAuth)){
   
    if(store.getters.isLoggedIn){
      next()
    } else {
      next({
        name:"Login"
      });
    }
  } else {    
    next();
  }
})

export default router
