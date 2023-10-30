import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

import 'primevue/resources/themes/lara-light-teal/theme.css';
import 'primeicons/primeicons.css';
import PrimeVue from 'primevue/config';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';

const app = createApp(App);
app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);
app.use(router);
app.mount('#app');

app.component('Avatar', Avatar);
app.component('Button', Button);
app.component('Divider', Divider);
app.component('InputText', InputText);
app.component('InputMask', InputMask);
app.component('Toast', Toast);
app.component('ConfirmDialog', ConfirmDialog);