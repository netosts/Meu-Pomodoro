import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/personalizar',
      name: 'personalizar',
      component: () => import('../views/PersonalizarView.vue'),
      meta: {
        title: 'Personalizar Pomodoro'
      }
    },
    {
      path: '/pomodoro',
      name: 'pomodoro',
      component: () => import('../views/PomodoroView.vue'),
      meta: {
        title: 'Estudos sobre Pomodoro'
      }
    },
    {
      path: '/sobre',
      name: 'sobre',
      component: () => import('../views/SobreView.vue'),
      meta: {
        title: 'Quem somos'
      }
    },
    {
      path: '/entrar',
      name: 'entrar',
      component: () => import('../views/EntrarView.vue'),
      meta: {
        title: 'Entrar na conta'
      }
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: () => import('../views/CadastroView.vue'),
      meta: {
        title: 'Criar uma conta'
      }
    },
  ]
})

router.beforeEach((to, from) => {
  document.title = to.meta?.title ?? 'Seu Pomodoro';
})

export default router
