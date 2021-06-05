import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/categorias/',
    name: 'Categorias',
    component: () => import('../views/Categorias.vue')
  },
  {
    path: '/add/categoria/',
    name: 'AgregaCategorias',
    component: () => import('../views/AgregarCategoria.vue')
  },
  {
    path: '/personal/',
    name: 'Personal',
    component: () => import('../views/Personal.vue')
  },
  {
    path: '/add/personal/',
    name: 'AgregaPersonal',
    component: () => import('../views/AgregarPersonal.vue')
  },
  {
    path: '/edit/personal/:id',
    name: 'EditaPersonal',
    component: () => import('../views/EditarPersonal.vue')
  },
  {
    path: '/tickets/',
    name: 'Tickets',
    component: () => import('../views/Tickets.vue')
  },
  {
    path: '/add/ticket/',
    name: 'AgregarTicket',
    component: () => import('../views/AgregarTicket.vue')
  },
  {
    path: '/edit/ticket/:id',
    name: 'EditaTicket',
    component: () => import('../views/EditarTicket.vue')
  },
  {
    path: '/edit/ticket/status/:id',
    name: 'EditaTicketStatus',
    component: () => import('../views/EditarTicketEstatus.vue')
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
