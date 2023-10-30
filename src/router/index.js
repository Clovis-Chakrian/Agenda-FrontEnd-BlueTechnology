import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home';
import EditContact from '../pages/EditContact';
import CreateContact from '../pages/CreateContact';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/edit',
    name: 'edit',
    component: EditContact,
  },
  {
    path: '/create-contact',
    name: 'create',
    component: CreateContact
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
