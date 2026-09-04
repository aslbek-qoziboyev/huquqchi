import { Capacitor } from '@capacitor/core';
import { PushNotifications, ActionPerformed, Token } from '@capacitor/push-notifications';

export const MobileNotificationsService = {
  async initPushNotifications() {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    try {
      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        console.warn('Push-bildirishnomalar ruxsati berilmadi');
        return;
      }

      await PushNotifications.register();

      PushNotifications.addListener('registration', (token: Token) => {
        console.log('Push bildirishnoma tokeni:', token.value);
        // Save token or send to backend
        localStorage.setItem('mobile_push_token', token.value);
      });

      PushNotifications.addListener('registrationError', (error: any) => {
        console.error('Push ro‘yxatdan o‘tishda xatolik: ', error);
      });

      PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
        console.log('Foydalanuvchi bildirishnomani ochdi:', notification);
      });
    } catch (e) {
      console.warn('Push bildirishnomalarni ishga tushirishda xatolik:', e);
    }
  }
};
