import { createRouter, createWebHistory } from 'vue-router';

import DispatchMessage from '@/view/DispatchMessage.vue';
import PaymentMessageForm from '@/view/PaymentMessageForm.vue';
import Engagement from '@/view/Engagement.vue';
import Home from '@/view/Home.vue';
import Custom from '@/view/Custom.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/dispatch',
      name: 'DispatchMessage',
      component: DispatchMessage,
    },
    {
      path: '/payments',
      name: 'PaymentMessageForm',
      component: PaymentMessageForm,
    },
    {
      path: '/engagements',
      name: 'Engagement',
      component: Engagement,
    },
    {
      path: '/custom',
      name: 'Custom',
      component: Custom
    },
  ],
});

export default router;
