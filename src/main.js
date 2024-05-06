import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';

import './assets/scss/reset.scss'

import axios from "axios";
import {getElementFromKey} from "@/functions.js";


// Axios
const PROD_URL = "https://api.inscriptions.ftirpl.org";
const DEV_URL = "https://localhost:8085";
axios.defaults.baseURL = (process.env.NODE_ENV === 'production') ? PROD_URL : DEV_URL;
axios.defaults.withCredentials = true;

// axios.interceptors.request.use(
//   config => {
//     let auth = localStorage.getItem('auth'); // Assurez-vous que le token est stocké ici après la connexion
//     if (auth) {
//       auth = JSON.parse(auth);
//       if (auth.accessToken)
//         config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

axios.interceptors.response.use(response => {
  return response;
}, error => {
  const originalRequest = error.config;

  if (originalRequest.url.includes("/auth/refresh")) {
    store.dispatch("logout");
    router.push({ name: "auth_login" });
    return Promise.reject(error);
  }

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    return axios.get("/auth/refresh")
      .then(response => {
        if (response.status === 201) {
          const element = getElementFromKey("NEW_AUTH_DATA", response.data);
          console.log(element);
          store.dispatch("login", {
            accessToken: element.access_token,
            memberId: element.member_id
          });
          originalRequest.headers["Authorization"] = `Bearer ${element.access_token}`;
          return axios(originalRequest);
        }
      })
      .catch(error => {
        store.dispatch("logout");
        router.push({ name: "auth_login" });
        return Promise.reject(error);
      });
  }
  return Promise.reject(error);
});


// App creation
const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
