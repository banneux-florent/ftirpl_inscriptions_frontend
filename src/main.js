import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';

import './assets/scss/reset.scss'

import axios from "axios";

// Axios
const PROD_URL = "https://api.inscriptions.ftirpl.org";
const DEV_URL = "https://localhost:8085";
axios.defaults.baseURL = (process.env.NODE_ENV === 'production') ? PROD_URL : DEV_URL;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  config => {
    let auth = localStorage.getItem('auth'); // Assurez-vous que le token est stocké ici après la connexion
    if (auth) {
      auth = JSON.parse(auth);
      if (auth.accessToken)
        config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);



// App creation
const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
