import { createApp } from 'vue';
import App from './App.vue';
import store from './stores';
import "./assets/tailwind.css";

createApp(App)
  .use(store)
  .mount('#app');
