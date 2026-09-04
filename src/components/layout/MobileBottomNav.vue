<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Home, MessageSquareText, BookOpen, FileText, User as UserIcon } from 'lucide-vue-next';
import { useAuthStore } from '../../stores/auth';

const route = useRoute();
const authStore = useAuthStore();

const isActive = (path: string) => {
  if (path === '/' && route.path === '/') return true;
  if (path !== '/' && route.path.startsWith(path)) return true;
  return false;
};
</script>

<template>
  <nav class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-lg">
    <router-link 
      to="/" 
      class="flex flex-col items-center justify-center w-14 py-1 rounded-lg transition-colors"
      :class="isActive('/') ? 'text-primary-600 dark:text-primary-400 font-semibold' : 'text-slate-500 dark:text-slate-400'"
    >
      <Home class="w-5 h-5 mb-0.5" />
      <span class="text-[10px]">Asosiy</span>
    </router-link>

    <router-link 
      to="/assistant" 
      class="flex flex-col items-center justify-center w-14 py-1 rounded-lg transition-colors"
      :class="isActive('/assistant') ? 'text-primary-600 dark:text-primary-400 font-semibold' : 'text-slate-500 dark:text-slate-400'"
    >
      <MessageSquareText class="w-5 h-5 mb-0.5" />
      <span class="text-[10px]">Yordamchi</span>
    </router-link>

    <router-link 
      to="/laws" 
      class="flex flex-col items-center justify-center w-14 py-1 rounded-lg transition-colors"
      :class="isActive('/laws') ? 'text-primary-600 dark:text-primary-400 font-semibold' : 'text-slate-500 dark:text-slate-400'"
    >
      <BookOpen class="w-5 h-5 mb-0.5" />
      <span class="text-[10px]">Qonunlar</span>
    </router-link>

    <router-link 
      to="/documents" 
      class="flex flex-col items-center justify-center w-14 py-1 rounded-lg transition-colors"
      :class="isActive('/documents') ? 'text-primary-600 dark:text-primary-400 font-semibold' : 'text-slate-500 dark:text-slate-400'"
    >
      <FileText class="w-5 h-5 mb-0.5" />
      <span class="text-[10px]">Hujjatlar</span>
    </router-link>

    <router-link 
      :to="authStore.isAuthenticated ? '/dashboard' : '/auth/login'" 
      class="flex flex-col items-center justify-center w-14 py-1 rounded-lg transition-colors"
      :class="isActive('/dashboard') || isActive('/profile') || isActive('/auth') ? 'text-primary-600 dark:text-primary-400 font-semibold' : 'text-slate-500 dark:text-slate-400'"
    >
      <UserIcon class="w-5 h-5 mb-0.5" />
      <span class="text-[10px]">{{ authStore.isAuthenticated ? 'Kabinet' : 'Kirish' }}</span>
    </router-link>
  </nav>
</template>
