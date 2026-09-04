<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { 
  Scale, 
  MessageSquareText, 
  BookOpen, 
  FileText, 
  LayoutDashboard, 
  User as UserIcon, 
  LogOut, 
  Sun, 
  Moon, 
  Menu, 
  X,
  ShieldCheck
} from 'lucide-vue-next';

defineProps<{
  isDarkMode: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggleDarkMode'): void;
}>();

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const isMobileMenuOpen = ref(false);

const handleLogout = async () => {
  await authStore.logout();
  router.push('/');
  isMobileMenuOpen.value = false;
};

const isActive = (path: string) => {
  if (path === '/' && route.path === '/') return true;
  if (path !== '/' && route.path.startsWith(path)) return true;
  return false;
};
</script>

<template>
  <header class="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-3 group">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-700 to-primary-500 flex items-center justify-center text-white shadow-md shadow-primary-500/20 group-hover:scale-105 transition-transform duration-200">
            <Scale class="w-5 h-5 text-white" />
          </div>
          <div class="flex flex-col">
            <span class="font-extrabold text-lg tracking-tight bg-gradient-to-r from-primary-900 to-primary-600 dark:from-white dark:to-primary-300 bg-clip-text text-transparent">
              Mening Huquqim
            </span>
            <span class="text-[10px] uppercase font-semibold tracking-wider text-slate-500 dark:text-slate-400">
              Raqamli huquqiy portal
            </span>
          </div>
        </router-link>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center space-x-1">
          <router-link 
            to="/" 
            class="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            :class="isActive('/') ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/50' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'"
          >
            Bosh sahifa
          </router-link>

          <router-link 
            to="/assistant" 
            class="px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5"
            :class="isActive('/assistant') ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/50' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'"
          >
            <MessageSquareText class="w-4 h-4" />
            <span>Huquqiy Yordamchi</span>
          </router-link>

          <router-link 
            to="/laws" 
            class="px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5"
            :class="isActive('/laws') ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/50' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'"
          >
            <BookOpen class="w-4 h-4" />
            <span>Qonunlar bazasi</span>
          </router-link>

          <router-link 
            to="/documents" 
            class="px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5"
            :class="isActive('/documents') ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/50' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'"
          >
            <FileText class="w-4 h-4" />
            <span>Hujjatlar generatori</span>
          </router-link>

          <router-link 
            v-if="authStore.isAuthenticated"
            to="/dashboard" 
            class="px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5"
            :class="isActive('/dashboard') ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/50' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'"
          >
            <LayoutDashboard class="w-4 h-4" />
            <span>Kabinet</span>
          </router-link>
        </nav>

        <!-- Right Side Actions (Dark Mode, Auth) -->
        <div class="hidden md:flex items-center space-x-3">
          <!-- Dark Mode Toggle -->
          <button 
            @click="emit('toggleDarkMode')"
            aria-label="Rang sxemasini almashtirish"
            class="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Sun v-if="isDarkMode" class="w-5 h-5 text-amber-400" />
            <Moon v-else class="w-5 h-5 text-slate-600" />
          </button>

          <!-- Auth Status -->
          <template v-if="authStore.isAuthenticated">
            <div class="flex items-center space-x-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <router-link 
                to="/profile"
                class="flex items-center space-x-2 p-1.5 pr-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div class="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  {{ authStore.user?.fullName?.charAt(0) || 'U' }}
                </div>
                <div class="flex flex-col text-left">
                  <span class="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-tight max-w-[110px] truncate">
                    {{ authStore.user?.fullName }}
                  </span>
                  <span class="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center">
                    <ShieldCheck class="w-3 h-3 mr-0.5 inline" /> Faol
                  </span>
                </div>
              </router-link>

              <button 
                @click="handleLogout"
                title="Tizimdan chiqish"
                class="p-2 text-slate-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                <LogOut class="w-4 h-4" />
              </button>
            </div>
          </template>

          <template v-else>
            <router-link 
              to="/auth/login"
              class="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Kirish
            </router-link>
            <router-link 
              to="/auth/register"
              class="px-4 py-2 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 active:scale-95 rounded-xl shadow-md shadow-primary-500/20 transition-all duration-150"
            >
              Ro‘yxatdan o‘tish
            </router-link>
          </template>
        </div>

        <!-- Mobile Menu Trigger -->
        <div class="flex items-center space-x-2 md:hidden">
          <button 
            @click="emit('toggleDarkMode')"
            aria-label="Rang sxemasini almashtirish"
            class="p-2 text-slate-500 dark:text-slate-400 rounded-lg"
          >
            <Sun v-if="isDarkMode" class="w-5 h-5 text-amber-400" />
            <Moon v-else class="w-5 h-5 text-slate-600" />
          </button>
          
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            <X v-if="isMobileMenuOpen" class="w-6 h-6" />
            <Menu v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Drawer Menu -->
    <div 
      v-if="isMobileMenuOpen"
      class="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-3"
    >
      <div class="flex flex-col space-y-1">
        <router-link 
          to="/" 
          @click="isMobileMenuOpen = false"
          class="px-3 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2"
          :class="isActive('/') ? 'text-primary-600 bg-primary-50 dark:bg-primary-950/50' : 'text-slate-700 dark:text-slate-200'"
        >
          <span>Bosh sahifa</span>
        </router-link>

        <router-link 
          to="/assistant" 
          @click="isMobileMenuOpen = false"
          class="px-3 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2"
          :class="isActive('/assistant') ? 'text-primary-600 bg-primary-50 dark:bg-primary-950/50' : 'text-slate-700 dark:text-slate-200'"
        >
          <MessageSquareText class="w-4 h-4" />
          <span>Huquqiy Yordamchi</span>
        </router-link>

        <router-link 
          to="/laws" 
          @click="isMobileMenuOpen = false"
          class="px-3 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2"
          :class="isActive('/laws') ? 'text-primary-600 bg-primary-50 dark:bg-primary-950/50' : 'text-slate-700 dark:text-slate-200'"
        >
          <BookOpen class="w-4 h-4" />
          <span>Qonunlar bazasi</span>
        </router-link>

        <router-link 
          to="/documents" 
          @click="isMobileMenuOpen = false"
          class="px-3 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2"
          :class="isActive('/documents') ? 'text-primary-600 bg-primary-50 dark:bg-primary-950/50' : 'text-slate-700 dark:text-slate-200'"
        >
          <FileText class="w-4 h-4" />
          <span>Hujjatlar generatori</span>
        </router-link>

        <router-link 
          v-if="authStore.isAuthenticated"
          to="/dashboard" 
          @click="isMobileMenuOpen = false"
          class="px-3 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2"
          :class="isActive('/dashboard') ? 'text-primary-600 bg-primary-50 dark:bg-primary-950/50' : 'text-slate-700 dark:text-slate-200'"
        >
          <LayoutDashboard class="w-4 h-4" />
          <span>Foydalanuvchi kabineti</span>
        </router-link>

        <router-link 
          v-if="authStore.isAuthenticated"
          to="/profile" 
          @click="isMobileMenuOpen = false"
          class="px-3 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2"
          :class="isActive('/profile') ? 'text-primary-600 bg-primary-50 dark:bg-primary-950/50' : 'text-slate-700 dark:text-slate-200'"
        >
          <UserIcon class="w-4 h-4" />
          <span>Profil va Sozlamalar</span>
        </router-link>
      </div>

      <div class="pt-3 border-t border-slate-200 dark:border-slate-800">
        <template v-if="authStore.isAuthenticated">
          <div class="flex items-center justify-between mb-3 px-2">
            <span class="text-sm font-medium text-slate-600 dark:text-slate-300">{{ authStore.user?.fullName }}</span>
            <button 
              @click="handleLogout"
              class="text-xs font-semibold text-red-600 dark:text-red-400 flex items-center space-x-1"
            >
              <LogOut class="w-3.5 h-3.5" />
              <span>Chiqish</span>
            </button>
          </div>
        </template>
        <template v-else>
          <div class="grid grid-cols-2 gap-2">
            <router-link 
              to="/auth/login" 
              @click="isMobileMenuOpen = false"
              class="text-center py-2.5 px-4 text-sm font-semibold rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200"
            >
              Kirish
            </router-link>
            <router-link 
              to="/auth/register" 
              @click="isMobileMenuOpen = false"
              class="text-center py-2.5 px-4 text-sm font-semibold rounded-xl bg-primary-600 text-white shadow-sm"
            >
              Ro‘yxatdan o‘tish
            </router-link>
          </div>
        </template>
      </div>
    </div>
  </header>
</template>
