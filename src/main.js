import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
const app = createApp(App);
app.component('Datepicker', Datepicker);


createApp(App).use(router).use(createPinia()).mount('#app');