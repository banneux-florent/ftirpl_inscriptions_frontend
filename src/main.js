import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';

import './assets/scss/reset.scss'

import axios from "axios";
const PROD_URL = "https://api.inscriptions.ftirpl.org";
const DEV_URL = "http://localhost:8085";
axios.defaults.baseURL = (process.env.NODE_ENV === 'production') ? PROD_URL : DEV_URL;

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
