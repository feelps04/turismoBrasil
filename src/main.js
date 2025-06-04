import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Create and mount the Vue app
createApp(App)
  .use(router)
  .mount('#app')
