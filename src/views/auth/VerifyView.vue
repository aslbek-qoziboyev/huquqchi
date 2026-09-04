<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { ShieldCheck, Loader2, AlertCircle } from 'lucide-vue-next';

const router = useRouter();
const authStore = useAuthStore();

const code = ref('123456');
const errorMsg = ref('');

const handleVerify = async () => {
  errorMsg.value = '';
  if (!code.value || code.value.length < 6) {
    errorMsg.value = '6 xonali tasdiqlash kodini to‘liq kiriting.';
    return;
  }

  try {
    await authStore.verifyEmail(code.value);
    router.push('/dashboard');
  } catch (err: any) {
    errorMsg.value = err.message || 'Tasdiqlash kodi noto‘g‘ri.';
  }
};
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md space-y-6">
      <div class="text-center space-y-2">
        <div class="inline-flex w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2">
          <ShieldCheck class="w-6 h-6" />
        </div>
        <h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Elektron pochtani tasdiqlash
        </h1>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          <strong>{{ authStore.user?.email || 'pochtangiz' }}</strong> ga yuborilgan 6 xonali kodni kiriting
        </p>
      </div>

      <div class="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div v-if="errorMsg" class="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 flex items-start space-x-2 text-xs text-red-700 dark:text-red-300">
          <AlertCircle class="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{{ errorMsg }}</span>
        </div>

        <form @submit.prevent="handleVerify" class="space-y-5">
          <div>
            <label class="block text-xs font-semibold text-center text-slate-700 dark:text-slate-300 mb-2">
              Tasdiqlash kodi
            </label>
            <input
              v-model="code"
              type="text"
              maxlength="6"
              required
              class="w-full text-center tracking-[0.6em] text-2xl font-bold py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <p class="text-[11px] text-center text-slate-400 mt-2">
              (Sinov uchun standart kod: <span class="font-mono font-bold text-primary-600">123456</span>)
            </p>
          </div>

          <button
            type="submit"
            :disabled="authStore.loading"
            class="w-full py-3 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm shadow-md shadow-primary-500/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
          >
            <Loader2 v-if="authStore.loading" class="w-4 h-4 animate-spin" />
            <span v-else>Tasdiqlash va Kabinetga o‘tish</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
