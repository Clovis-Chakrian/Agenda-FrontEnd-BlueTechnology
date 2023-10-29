import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'primevue/resources/themes/lara-light-teal/theme.css';
import 'primeicons/primeicons.css';
import PrimeVue from 'primevue/config';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Divider from 'primevue/divider';

const app = createApp(App);
app.use(PrimeVue);
app.use(router);
app.mount('#app');

app.component('Avatar', Avatar);
app.component('Button', Button);
app.component('Card', Card);
app.component('Divider', Divider);