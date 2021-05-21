import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Datasets from "./views/Datasets.vue"
import Collect from "./views/Collect.vue"
import About from "./views/About.vue"

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      title: 'Home',
      name: 'home',
      component: Home
    },
    {
      path: '/Datasets',
      name: 'Datasets',
      title: 'Datasets',
      component: Datasets,
    },
    {
      path: '/Collect',
      name: 'Collect',
      title: 'Collect',
      component: Collect,
    },
    {
      path: '/About',
      name: 'About',
      title: 'Help',
      component: About,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
