<script setup lang="ts">
import { ref, inject, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { 
  Mail, 
  Phone, 
  ShieldCheck, 
  Moon, 
  Sun, 
  Bell, 
  LogOut, 
  Check, 
  KeyRound
} from 'lucide-vue-next';

const router = useRouter();
const authStore = useAuthStore();

const isDarkMode = inject<Ref<boolean>>('isDarkMode');
const toggleDarkMode = inject<() => void>('toggleDarkMode');

const notifyEmail = ref(true);
const saveSuccess = ref(false);

const handleSaveSettings = () => {
  saveSuccess.value = true;
  setTimeout(() => {
    saveSuccess.value = false;
  }, 2500);
};

const handleLogout = async () => {
  await authStore.logout();
  router.push('/');
};
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
    <!-- Header -->
    <div class="space-y-2">
      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Foydalanuvchi profili va sozlamalar
      </h1>
      <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        Shaxsiy ma’lumotlaringiz, xavfsizlik va dastur sozlamalarini boshqaring
      </p>
    </div>

    <!-- User Information Card -->
    <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div class="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div class="w-20 h-20 rounded-3xl bg-primary-600 text-white flex items-center justify-center font-bold text-3xl shadow-md shadow-primary-500/30">
          {{ authStore.user?.fullName?.charAt(0) || 'U' }}
        </div>
        <div class="space-y-1.5 text-center sm:text-left flex-grow">
          <div class="flex flex-col sm:flex-row sm:items-center gap-2">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white">
              {{ authStore.user?.fullName || 'Fuqaro' }}
            </h2>
            <span class="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 self-center sm:self-auto">
              <ShieldCheck class="w-3.5 h-3.5" />
              <span>Tasdiqlangan foydalanuvchi</span>
            </span>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            ID: <span class="font-mono">{{ authStore.user?.id || 'usr-12345' }}</span>
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 flex items-center space-x-3">
          <Mail class="w-5 h-5 text-primary-600 flex-shrink-0" />
          <div class="truncate">
            <div class="text-[10px] uppercase font-bold text-slate-400">Elektron pochta</div>
            <div class="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
              {{ authStore.user?.email || 'aniqlanmagan' }}
            </div>
          </div>
        </div>

        <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 flex items-center space-x-3">
          <Phone class="w-5 h-5 text-primary-600 flex-shrink-0" />
          <div>
            <div class="text-[10px] uppercase font-bold text-slate-400">Telefon raqam</div>
            <div class="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {{ authStore.user?.phoneNumber || '+998 (90) 123-45-67' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Application Settings -->
    <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <h3 class="font-bold text-base text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
        Tizim sozlamalari
      </h3>

      <!-- Dark Mode Switch -->
      <div class="flex items-center justify-between">
        <div class="space-y-0.5">
          <div class="text-xs font-semibold text-slate-900 dark:text-white flex items-center space-x-1.5">
            <Sun v-if="!isDarkMode" class="w-4 h-4 text-amber-500" />
            <Moon v-else class="w-4 h-4 text-primary-400" />
            <span>Qorong‘i mavzu (Dark mode)</span>
          </div>
          <div class="text-[11px] text-slate-500">
            Tungi vaqtda ko‘zni charchatmaslik uchun interfeys rangini o‘zgartirish
          </div>
        </div>

        <button
          @click="toggleDarkMode && toggleDarkMode()"
          type="button"
          class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
          :class="isDarkMode ? 'bg-primary-600' : 'bg-slate-200 dark:bg-slate-700'"
        >
          <span
            class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            :class="isDarkMode ? 'translate-x-5' : 'translate-x-0'"
          />
        </button>
      </div>

      <!-- Notifications -->
      <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
        <div class="space-y-0.5">
          <div class="text-xs font-semibold text-slate-900 dark:text-white flex items-center space-x-1.5">
            <Bell class="w-4 h-4 text-primary-600" />
            <span>Elektron pochta xabarnomalari</span>
          </div>
          <div class="text-[11px] text-slate-500">
            Yangi qonunlar qabul qilinganda yoki murojaat holati o‘zgarganda xabar olish
          </div>
        </div>

        <button
          @click="notifyEmail = !notifyEmail"
          type="button"
          class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
          :class="notifyEmail ? 'bg-primary-600' : 'bg-slate-200 dark:bg-slate-700'"
        >
          <span
            class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            :class="notifyEmail ? 'translate-x-5' : 'translate-x-0'"
          />
        </button>
      </div>

      <!-- Security Section -->
      <div class="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
        <div class="flex items-center justify-between">
          <div class="space-y-0.5">
            <div class="text-xs font-semibold text-slate-900 dark:text-white flex items-center space-x-1.5">
              <KeyRound class="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <span>Xavfsizlik va Seans</span>
            </div>
            <div class="text-[11px] text-slate-500">
              JWT token va shifrlangan seans himoyasi faol
            </div>
          </div>
          <router-link
            to="/auth/reset-password"
            class="text-xs font-semibold text-primary-600 hover:underline"
          >
            Parolni yangilash
          </router-link>
        </div>
      </div>

      <!-- Save settings feedback -->
      <div class="pt-4 flex items-center justify-between">
        <span v-if="saveSuccess" class="text-xs text-emerald-600 font-semibold flex items-center">
          <Check class="w-4 h-4 mr-1" /> Sozlamalar saqlandi!
        </span>
        <span v-else></span>

        <button
          @click="handleSaveSettings"
          class="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold shadow-sm transition-all"
        >
          Sozlamalarni saqlash
        </button>
      </div>
    </div>

    <!-- Danger Zone / Logout -->
    <div class="p-6 rounded-3xl bg-red-50/60 dark:bg-red-950/20 border border-red-200/80 dark:border-red-900/40 flex items-center justify-between">
      <div class="space-y-1">
        <div class="text-xs font-bold text-red-800 dark:text-red-300">
          Tizimdan chiqish
        </div>
        <div class="text-[11px] text-red-600 dark:text-red-400">
          Joriy seansni yakunlash va shaxsiy kabinetdan chiqish
        </div>
      </div>

      <button
        @click="handleLogout"
        class="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center space-x-1.5"
      >
        <LogOut class="w-4 h-4" />
        <span>Chiqish</span>
      </button>
    </div>
  </div>
</template>
