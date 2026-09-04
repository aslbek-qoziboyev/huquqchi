import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './style.css';
import { MobileAppService } from './services/mobileApp';
import { MobileNotificationsService } from './services/mobileNotifications';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount('#app');

// Initialize mobile platform services (Android native back button, status bar, push notifications)
MobileAppService.initialize(router);
MobileNotificationsService.initPushNotifications();

