<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { Mail, ArrowLeft, CheckCircle2, Loader2, AlertCircle } from 'lucide-vue-next';

const authStore = useAuthStore();
const email = ref('');
const isSent = ref(false);
const errorMsg = ref('');

const handleSubmit = async () => {
  errorMsg.value = '';
  if (!email.value) {
    errorMsg.value = 'Iltimos, elektron pochta manzilingizni kiriting.';
    return;
  }
  try {
    await authStore.forgotPassword(email.value);
    isSent.value = true;
  } catch (err: any) {
    errorMsg.value = err.message || 'Xatolik yuz berdi.';
  }
};
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md space-y-6">
      <div class="text-center space-y-2">
        <h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Parolni tiklash
        </h1>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          Ro‘yxatdan o‘tgan emailingizga parolni tiklash havolasini yuboramiz
        </p>
      </div>

      <div class="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div v-if="isSent" class="text-center space-y-4 py-4">
          <div class="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 class="w-6 h-6" />
          </div>
          <h3 class="font-bold text-sm text-slate-900 dark:text-white">
            Tiklash havolasi yuborildi!
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            <strong>{{ email }}</strong> manziliga maxsus havola yuborildi. Pochtani tekshiring va parolingizni yangilang.
          </p>
          <router-link
            to="/auth/reset-password"
            class="inline-block px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-semibold"
          >
            Yangi parolni kiritish
          </router-link>
        </div>

        <template v-else>
          <div v-if="errorMsg" class="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 flex items-start space-x-2 text-xs text-red-700 dark:text-red-300">
            <AlertCircle class="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{{ errorMsg }}</span>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Elektron pochta manzilingiz
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

            <button
              type="submit"
              :disabled="authStore.loading"
              class="w-full py-3 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm shadow-md shadow-primary-500/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              <Loader2 v-if="authStore.loading" class="w-4 h-4 animate-spin" />
              <span v-else>Tiklash havolasini yuborish</span>
            </button>
          </form>
        </template>
      </div>

      <div class="text-center">
        <router-link to="/auth/login" class="inline-flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-primary-600">
          <ArrowLeft class="w-3.5 h-3.5" />
          <span>Kirish sahifasiga qaytish</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
