import { createRouter, createWebHistory } from 'vue-router';

import DispatchMessage from '@/view/DispatchMessage.vue';
import PaymentMessageForm from '@/view/PaymentMessageForm.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
  ],
});

export default router;
