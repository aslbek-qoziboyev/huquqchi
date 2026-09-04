<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { Lock, Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-vue-next';

const router = useRouter();
const authStore = useAuthStore();

const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const errorMsg = ref('');
const isSuccess = ref(false);

const handleReset = async () => {
  errorMsg.value = '';
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Parollar bir-biriga mos kelmadi.';
    return;
  }
  if (password.value.length < 6) {
    errorMsg.value = 'Parol kamida 6 ta belgidan iborat bo‘lishi shart.';
    return;
  }

  try {
    await authStore.resetPassword(password.value);
    isSuccess.value = true;
    setTimeout(() => {
      router.push('/auth/login');
    }, 2000);
  } catch (err: any) {
    errorMsg.value = err.message || 'Parolni yangilashda xatolik yuz berdi.';
  }
};
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md space-y-6">
      <div class="text-center space-y-2">
        <h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Yangi parol o‘rnatish
        </h1>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          Hisobingiz uchun kuchli yangi parol kiriting
        </p>
      </div>

      <div class="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div v-if="isSuccess" class="text-center space-y-3 py-4">
          <div class="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 class="w-6 h-6" />
          </div>
          <h3 class="font-bold text-sm text-slate-900 dark:text-white">
            Parol muvaffaqiyatli o‘zgartirildi!
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Siz 2 soniyadan so‘ng kirish sahifasiga yo‘naltirilasiz...
          </p>
        </div>

        <template v-else>
          <div v-if="errorMsg" class="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 flex items-start space-x-2 text-xs text-red-700 dark:text-red-300">
            <AlertCircle class="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{{ errorMsg }}</span>
          </div>

          <form @submit.prevent="handleReset" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Yangi parol
              </label>
              <div class="relative">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  minlength="6"
                  placeholder="Kamida 6 ta belgi"
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

            <div>
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Yangi parolni tasdiqlang
              </label>
              <div class="relative">
                <input
                  v-model="confirmPassword"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  placeholder="Parolni qayta kiriting"
                  class="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-white"
                />
                <Lock class="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <button
              type="submit"
              :disabled="authStore.loading"
              class="w-full py-3 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm shadow-md shadow-primary-500/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              <Loader2 v-if="authStore.loading" class="w-4 h-4 animate-spin" />
              <span v-else>Parolni saqlash</span>
            </button>
          </form>
        </template>
      </div>
    </div>
  </div>
</template>
