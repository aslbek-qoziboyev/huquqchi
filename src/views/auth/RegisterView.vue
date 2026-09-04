<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { Scale, Lock, Mail, User, Phone, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-vue-next';

const router = useRouter();
const authStore = useAuthStore();

const fullName = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const agreeTerms = ref(true);
const showPassword = ref(false);
const errorMsg = ref('');

const handleRegister = async () => {
  errorMsg.value = '';
  if (!fullName.value || !email.value || !password.value) {
    errorMsg.value = 'Iltimos, barcha majburiy maydonlarni to‘ldiring.';
    return;
  }
  if (!agreeTerms.value) {
    errorMsg.value = 'Foydalanish shartlariga rozilik bildirishingiz kerak.';
    return;
  }
  try {
    await authStore.register(fullName.value, email.value, password.value, phone.value);
    router.push('/auth/verify');
  } catch (err: any) {
    errorMsg.value = err.message || 'Ro‘yxatdan o‘tishda xatolik yuz berdi.';
  }
};
</script>

<template>
  <div class="min-h-[85vh] flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md space-y-6">
      <!-- Header -->
      <div class="text-center space-y-2">
        <div class="inline-flex w-12 h-12 rounded-2xl bg-primary-600 items-center justify-center text-white shadow-md shadow-primary-500/20 mb-2">
          <Scale class="w-6 h-6" />
        </div>
        <h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Yangi hisob yaratish
        </h1>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          Huquqlaringizni himoya qilish va hujjatlar yaratish uchun ro‘yxatdan o‘ting
        </p>
      </div>

      <!-- Card -->
      <div class="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <!-- Error Alert -->
        <div v-if="errorMsg" class="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/60 flex items-start space-x-2 text-xs text-red-700 dark:text-red-300">
          <AlertCircle class="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{{ errorMsg }}</span>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <!-- Full Name -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              To‘liq ism-sharifingiz <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                v-model="fullName"
                type="text"
                required
                placeholder="Rustamov Anvar Aliyevich"
                class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-white"
              />
              <User class="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Elektron pochta <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                v-model="email"
                type="email"
                required
                placeholder="anvar@pochta.uz"
                class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-white"
              />
              <Mail class="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Telefon raqami (ixtiyoriy)
            </label>
            <div class="relative">
              <input
                v-model="phone"
                type="tel"
                placeholder="+998 (90) 123-45-67"
                class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-white"
              />
              <Phone class="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Parol <span class="text-red-500">*</span>
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

          <!-- Terms Checkbox -->
          <div class="flex items-start space-x-2 pt-1">
            <input
              id="terms"
              v-model="agreeTerms"
              type="checkbox"
              class="mt-1 h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
            />
            <label for="terms" class="text-xs text-slate-600 dark:text-slate-400 leading-tight">
              Foydalanish shartlari va maxfiylik siyosatiga roziman.
            </label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="authStore.loading"
            class="w-full py-3 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 active:scale-[0.99] text-white font-semibold text-sm shadow-md shadow-primary-500/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
          >
            <Loader2 v-if="authStore.loading" class="w-4 h-4 animate-spin" />
            <span v-else>Ro‘yxatdan o‘tish</span>
          </button>
        </form>
      </div>

      <!-- Footer Link -->
      <div class="text-center text-xs text-slate-500 dark:text-slate-400">
        Allaqachon hisobingiz bormi?
        <router-link to="/auth/login" class="font-semibold text-primary-600 dark:text-primary-400 hover:underline ml-1">
          Kirish
        </router-link>
      </div>
    </div>
  </div>
</template>
