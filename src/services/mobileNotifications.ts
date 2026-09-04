import { Capacitor } from '@capacitor/core';
import type { ActionPerformed, Token } from '@capacitor/push-notifications';

export const MobileNotificationsService = {
  async initPushNotifications() {
    // Only execute on native Android / iOS platforms
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    try {
      const { PushNotifications } = await import('@capacitor/push-notifications');

      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        console.warn('Push-bildirishnomalar ruxsati berilmadi');
        return;
      }

      await PushNotifications.register();

      await PushNotifications.addListener('registration', (token: Token) => {
        console.log('Push bildirishnoma tokeni:', token.value);
        localStorage.setItem('mobile_push_token', token.value);
      });

      await PushNotifications.addListener('registrationError', (error: any) => {
        console.error('Push ro‘yxatdan o‘tishda xatolik: ', error);
      });

      await PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
        console.log('Foydalanuvchi bildirishnomani ochdi:', notification);
      });
    } catch (e) {
      console.warn('Push bildirishnomalarni ishga tushirishda xatolik:', e);
    }
  }
};
