import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home';
import EditContact from '../pages/EditContact';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/edit',
    name: 'edit',
    component: EditContact
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
