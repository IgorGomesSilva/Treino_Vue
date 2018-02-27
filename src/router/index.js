import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Computadores from '@/components/Computador/Computadores'
import CreateComputador from '@/components/Computador/CreateComputador'
import Perfil from '@/components/User/Perfil'
import Login from '@/components/User/Login'
import Cadastrar from '@/components/User/Cadastrar'
import Computador from '@/components/Computador/Computador'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/computador/new',
      name: 'CreateComputador',
      component: CreateComputador,
      beforeEnter: AuthGuard
    },
    {
      path: '/computadores',
      name: 'Computadores',
      component: Computadores
    },
    {
      path: '/perfil',
      name: 'Perfil',
      component: Perfil
    },
    {
      path: '/cadastrar',
      name: 'Cadastrar',
      component: Cadastrar
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/computadores/:id',
      name: 'Computador',
      props: true,
      component: Computador
    }
  ],
  mode: 'history'
})
