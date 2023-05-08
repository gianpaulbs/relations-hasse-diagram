import Vue from "vue";
import VueRouter from "vue-router";
import Operations from '../views/Operations.vue'

Vue.use(VueRouter);

const routes = [
    {
      path: '/',
      name: 'operations',
      component: Operations
    }
];

const router = new VueRouter({
    mode: "history",
    routes
})

export default router;
