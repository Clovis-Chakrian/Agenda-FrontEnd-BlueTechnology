import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'primevue/resources/themes/lara-light-teal/theme.css';
import 'primeicons/primeicons.css';
import PrimeVue from 'primevue/config';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';

const app = createApp(App);
app.use(PrimeVue);
app.use(router);
app.mount('#app');

app.component('Avatar', Avatar);
app.component('Button', Button);
app.component('Divider', Divider);
app.component('InputText', InputText)
app.component('InputMask', InputMask)
