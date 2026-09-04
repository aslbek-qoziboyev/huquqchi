import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Network } from '@capacitor/network';
import { Router } from 'vue-router';

export const MobileAppService = {
  async initialize(router: Router) {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    try {
      // 1. Configure Status Bar
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({ color: '#0f5283' });
    } catch (e) {
      console.warn('Status Bar setup error:', e);
    }

    try {
      // 2. Handle Android Hardware Back Button
      App.addListener('backButton', ({ canGoBack }) => {
        const currentPath = router.currentRoute.value.path;
        if (currentPath === '/' || currentPath === '/dashboard') {
          App.exitApp();
        } else if (canGoBack) {
          router.back();
        } else {
          router.push('/dashboard');
        }
      });
    } catch (e) {
      console.warn('Back button listener error:', e);
    }

    try {
      // 3. Network connection listener
      Network.addListener('networkStatusChange', status => {
        if (!status.connected) {
          console.warn('Internet aloqasi uzildi');
        }
      });
    } catch (e) {
      console.warn('Network listener error:', e);
    }
  }
};
