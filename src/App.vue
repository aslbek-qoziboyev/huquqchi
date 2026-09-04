<script setup lang="ts">
import { onMounted, ref, provide } from 'vue';
import AppNavbar from './components/layout/AppNavbar.vue';
import AppFooter from './components/layout/AppFooter.vue';
import MobileBottomNav from './components/layout/MobileBottomNav.vue';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();
const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

provide('isDarkMode', isDarkMode);
provide('toggleDarkMode', toggleDarkMode);

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    isDarkMode.value = true;
    document.documentElement.classList.add('dark');
  } else {
    isDarkMode.value = false;
    document.documentElement.classList.remove('dark');
  }

  // Initialize auth session
  authStore.initialize();
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
    <!-- Top Navigation -->
    <AppNavbar :is-dark-mode="isDarkMode" @toggle-dark-mode="toggleDarkMode" />

    <!-- Main Content Area -->
    <main class="flex-grow pb-16 md:pb-0">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer (Only on desktop/tablet, or bottom on landing) -->
    <AppFooter />

    <!-- Mobile Bottom Navigation Bar -->
    <MobileBottomNav />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
