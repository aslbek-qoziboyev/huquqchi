<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useAssistantStore } from '../stores/assistant';
import { useLawsStore } from '../stores/laws';
import { useDocumentsStore } from '../stores/documents';
import { 
  MessageSquareText, 
  FileText, 
  Plus, 
  ArrowRight, 
  Bookmark, 
  Calendar, 
  FileCheck, 
  Download, 
  Trash2 
} from 'lucide-vue-next';

const router = useRouter();
const authStore = useAuthStore();
const assistantStore = useAssistantStore();
const lawsStore = useLawsStore();
const documentsStore = useDocumentsStore();

onMounted(async () => {
  await Promise.all([
    lawsStore.fetchLaws(),
    documentsStore.fetchGeneratedDocuments()
  ]);
});

const startNewQuestion = () => {
  assistantStore.startNewSession();
  router.push('/assistant');
};

const handleDownload = (docTitle: string) => {
  alert(`"${docTitle}" hujjati muvaffaqiyatli yuklab olindi (DOCX / PDF tayyor).`);
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
    <!-- Welcome Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-primary-900 via-primary-800 to-slate-900 text-white shadow-lg">
      <div class="space-y-2">
        <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-primary-200">
          <span>Shaxsiy huquqiy kabinet</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Xush kelibsiz, {{ authStore.user?.fullName || 'Fuqaro' }}!
        </h1>
        <p class="text-xs sm:text-sm text-primary-100/80 max-w-xl">
          Bu yerda siz o‘z huquqiy murojaatlaringiz, saqlab qo‘yilgan qonun moddalari va rasmiy arizalaringizni kuzatib borishingiz mumkin.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <button
          @click="startNewQuestion"
          class="px-5 py-3 rounded-xl bg-white text-primary-900 hover:bg-primary-50 font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center space-x-2 whitespace-nowrap"
        >
          <Plus class="w-4 h-4 text-primary-700" />
          <span>Yangi huquqiy savol</span>
        </button>
      </div>
    </div>

    <!-- Quick Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <!-- Stat 1 -->
      <router-link
        to="/assistant"
        class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-primary-400 transition-all flex items-center space-x-4"
      >
        <div class="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center">
          <MessageSquareText class="w-6 h-6" />
        </div>
        <div>
          <div class="text-2xl font-bold text-slate-900 dark:text-white">
            {{ assistantStore.sessions.length }}
          </div>
          <div class="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Huquqiy suhbatlar
          </div>
        </div>
      </router-link>

      <!-- Stat 2 -->
      <router-link
        to="/laws"
        class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-400 transition-all flex items-center space-x-4"
      >
        <div class="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
          <Bookmark class="w-6 h-6" />
        </div>
        <div>
          <div class="text-2xl font-bold text-slate-900 dark:text-white">
            {{ lawsStore.savedLaws.length }}
          </div>
          <div class="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Saqlangan qonunlar
          </div>
        </div>
      </router-link>

      <!-- Stat 3 -->
      <router-link
        to="/documents"
        class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-400 transition-all flex items-center space-x-4"
      >
        <div class="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
          <FileCheck class="w-6 h-6" />
        </div>
        <div>
          <div class="text-2xl font-bold text-slate-900 dark:text-white">
            {{ documentsStore.generatedDocuments.length }}
          </div>
          <div class="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Yaratilgan hujjatlar
          </div>
        </div>
      </router-link>
    </div>

    <!-- Main Grid: Recent Conversations & Saved Documents -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Section 1: So‘nggi Huquqiy Savollar -->
      <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div class="flex items-center space-x-2">
            <MessageSquareText class="w-5 h-5 text-primary-600" />
            <h2 class="font-bold text-base text-slate-900 dark:text-white">
              So‘nggi huquqiy murojaatlar
            </h2>
          </div>
          <router-link to="/assistant" class="text-xs font-semibold text-primary-600 hover:underline">
            Barchasi
          </router-link>
        </div>

        <div v-if="assistantStore.sessions.length === 0" class="py-8 text-center text-xs text-slate-400">
          Hali hech qanday savol berilmadi.
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="session in assistantStore.sessions"
            :key="session.id"
            @click="assistantStore.selectSession(session.id); router.push('/assistant');"
            class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors flex items-center justify-between group"
          >
            <div class="space-y-1 pr-2">
              <div class="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-primary-600 transition-colors">
                {{ session.title }}
              </div>
              <div class="text-[11px] text-slate-400 flex items-center space-x-2">
                <span>{{ session.messages.length }} ta xabar</span>
                <span>•</span>
                <span>Faol sessiya</span>
              </div>
            </div>
            <ArrowRight class="w-4 h-4 text-slate-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
          </div>
        </div>

        <div class="pt-2">
          <button
            @click="startNewQuestion"
            class="w-full py-2.5 rounded-xl border border-dashed border-primary-300 dark:border-primary-800/70 hover:bg-primary-50 dark:hover:bg-primary-950/30 text-xs font-semibold text-primary-600 dark:text-primary-400 transition-colors flex items-center justify-center space-x-1.5"
          >
            <Plus class="w-3.5 h-3.5" />
            <span>Yangi vaziyat bo‘yicha savol berish</span>
          </button>
        </div>
      </div>

      <!-- Section 2: Yaratilgan Hujjatlar -->
      <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div class="flex items-center space-x-2">
            <FileText class="w-5 h-5 text-purple-600" />
            <h2 class="font-bold text-base text-slate-900 dark:text-white">
              Shakllantirilgan hujjatlar
            </h2>
          </div>
          <router-link to="/documents" class="text-xs font-semibold text-purple-600 hover:underline">
            Yangi ariza yaratish
          </router-link>
        </div>

        <div v-if="documentsStore.generatedDocuments.length === 0" class="py-8 text-center text-xs text-slate-400">
          Hozircha saqlangan hujjatlar mavjud emas. Shablonlar bo‘limidan yangi ariza yarating.
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="doc in documentsStore.generatedDocuments"
            :key="doc.id"
            class="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex items-center justify-between"
          >
            <div class="space-y-1">
              <div class="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {{ doc.title }}
              </div>
              <div class="text-[11px] text-slate-400 flex items-center space-x-1.5">
                <Calendar class="w-3 h-3" />
                <span>{{ doc.createdAt }}</span>
              </div>
            </div>

            <div class="flex items-center space-x-2">
              <button
                @click="handleDownload(doc.title)"
                title="Yuklab olish"
                class="p-1.5 rounded-lg text-slate-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950/50 transition-colors"
              >
                <Download class="w-4 h-4" />
              </button>
              <button
                @click="documentsStore.deleteDocument(doc.id)"
                title="O‘chirish"
                class="p-1.5 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div class="pt-2">
          <router-link
            to="/documents"
            class="w-full py-2.5 rounded-xl border border-dashed border-purple-300 dark:border-purple-800/70 hover:bg-purple-50 dark:hover:bg-purple-950/30 text-xs font-semibold text-purple-600 dark:text-purple-400 transition-colors flex items-center justify-center space-x-1.5"
          >
            <Plus class="w-3.5 h-3.5" />
            <span>Shablonlar katalogiga o‘tish</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Section 3: Saqlangan Qonunlar -->
    <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div class="flex items-center space-x-2">
          <Bookmark class="w-5 h-5 text-emerald-600" />
          <h2 class="font-bold text-base text-slate-900 dark:text-white">
            Saqlangan qonunlar va kodekslar
          </h2>
        </div>
        <router-link to="/laws" class="text-xs font-semibold text-emerald-600 hover:underline">
          Qonunlar qidiruvi
        </router-link>
      </div>

      <div v-if="lawsStore.savedLaws.length === 0" class="py-6 text-center text-xs text-slate-400">
        Hali birorta qonun xatcho‘pga qo‘shilmagan. Qonunlar ro‘yxatidan o‘zingizga keraklisini saqlab qo‘yishingiz mumkin.
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="law in lawsStore.savedLaws"
          :key="law.id"
          class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-300 transition-all flex flex-col justify-between"
        >
          <div class="space-y-1.5">
            <span class="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
              {{ law.type }}
            </span>
            <h4 class="text-xs font-bold text-slate-900 dark:text-white">
              {{ law.title }}
            </h4>
            <p class="text-[11px] text-slate-500 dark:text-slate-400">
              {{ law.articles.length }} ta asosiy modda
            </p>
          </div>

          <div class="pt-3 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <router-link
              :to="'/laws/' + law.id"
              class="text-xs font-semibold text-primary-600 hover:underline flex items-center space-x-1"
            >
              <span>O‘qish</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </router-link>
            <button
              @click="lawsStore.toggleSave(law.id)"
              class="text-xs text-slate-400 hover:text-red-500"
            >
              Olib tashlash
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
