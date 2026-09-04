<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { Scale, Lock, Mail, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-vue-next';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const errorMsg = ref('');

const handleLogin = async () => {
  errorMsg.value = '';
  if (!email.value || !password.value) {
    errorMsg.value = 'Iltimos, elektron pochta va parolni kiriting.';
    return;
  }
  try {
    await authStore.login(email.value, password.value);
    const redirectPath = (route.query.redirect as string) || '/dashboard';
    router.push(redirectPath);
  } catch (err: any) {
    errorMsg.value = err.message || 'Kirishda xatolik yuz berdi.';
  }
};

const fillDemoAccount = () => {
  email.value = 'fuqaro@meninghuquqim.uz';
  password.value = 'parol12345';
  handleLogin();
};
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md space-y-6">
      <!-- Header -->
      <div class="text-center space-y-2">
        <div class="inline-flex w-12 h-12 rounded-2xl bg-primary-600 items-center justify-center text-white shadow-md shadow-primary-500/20 mb-2">
          <Scale class="w-6 h-6" />
        </div>
        <h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Tizimga kirish
        </h1>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          Shaxsiy huquqiy kabinetingizga kirish uchun ma’lumotlarni kiriting
        </p>
      </div>

      <!-- Card -->
      <div class="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <!-- Error Alert -->
        <div v-if="errorMsg" class="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 flex items-start space-x-2 text-xs text-red-700 dark:text-red-300">
          <AlertCircle class="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{{ errorMsg }}</span>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Email -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Elektron pochta
            </label>
            <div class="relative">
              <input
                v-model="email"
                type="email"
                required
                placeholder="misol@pochta.uz"
                class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-white"
              />
              <Mail class="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <!-- Password -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Parol
              </label>
              <router-link
                to="/auth/forgot-password"
                class="text-[11px] font-semibold text-primary-600 dark:text-primary-400 hover:underline"
              >
                Parolni unutdingizmi?
              </router-link>
            </div>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="••••••••"
                class="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-white"
              />
              <Lock class="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
              >
                <EyeOff v-if="showPassword" class="w-4 h-4" />
                <Eye v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="authStore.loading"
            class="w-full py-3 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 active:scale-[0.99] text-white font-semibold text-sm shadow-md shadow-primary-500/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
          >
            <Loader2 v-if="authStore.loading" class="w-4 h-4 animate-spin" />
            <span v-else>Kirish</span>
          </button>
        </form>

        <div class="relative flex py-1 items-center">
          <div class="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          <span class="flex-shrink mx-3 text-[11px] text-slate-400 uppercase tracking-wider">yoki</span>
          <div class="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
        </div>

        <!-- Quick Demo Login -->
        <button
          @click="fillDemoAccount"
          type="button"
          class="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs transition-colors flex items-center justify-center space-x-1.5"
        >
          <span>⚡ Tezkor sinov (Demo hisob bilan kirish)</span>
        </button>
      </div>

      <!-- Footer Link -->
      <div class="text-center text-xs text-slate-500 dark:text-slate-400">
        Hisobingiz yo‘qmi?
        <router-link to="/auth/register" class="font-semibold text-primary-600 dark:text-primary-400 hover:underline ml-1">
          Ro‘yxatdan o‘tish
        </router-link>
      </div>
    </div>
  </div>
</template>
