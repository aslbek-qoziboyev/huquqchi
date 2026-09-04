<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLawsStore } from '../stores/laws';
import { Law, Article } from '../types/laws';
import { 
  ArrowLeft, 
  Bookmark, 
  BookmarkCheck, 
  ExternalLink, 
  Calendar, 
  CheckCircle2, 
  Search, 
  Copy, 
  Check 
} from 'lucide-vue-next';
import LoadingSpinner from '../components/common/LoadingSpinner.vue';

const route = useRoute();
const router = useRouter();
const lawsStore = useLawsStore();

const articleSearch = ref('');
const copiedArticleId = ref<string | null>(null);

const law = computed<Law | undefined>(() => {
  const id = route.params.id as string;
  return lawsStore.laws.find(l => l.id === id);
});

const filteredArticles = computed<Article[]>(() => {
  if (!law.value) return [];
  if (!articleSearch.value.trim()) return law.value.articles;
  const q = articleSearch.value.toLowerCase();
  return law.value.articles.filter(a => 
    a.number.includes(q) ||
    (a.title && a.title.toLowerCase().includes(q)) ||
    a.content.toLowerCase().includes(q)
  );
});

onMounted(async () => {
  if (lawsStore.laws.length === 0) {
    await lawsStore.fetchLaws();
  }
});

const copyArticleText = (art: Article) => {
  const text = `${art.number}-modda. ${art.title || ''}\n\n${art.content}\n\n(Manba: ${law.value?.title} — Mening Huquqim)`;
  navigator.clipboard.writeText(text);
  copiedArticleId.value = art.id;
  setTimeout(() => {
    copiedArticleId.value = null;
  }, 2000);
};
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
    <!-- Back Button -->
    <div>
      <button
        @click="router.back()"
        class="inline-flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-primary-600 transition-colors"
      >
        <ArrowLeft class="w-4 h-4" />
        <span>Qonunlar ro‘yxatiga qaytish</span>
      </button>
    </div>

    <LoadingSpinner v-if="lawsStore.loading" text="Qonun ma’lumotlari yuklanmoqda..." />

    <!-- Not Found -->
    <div v-else-if="!law" class="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
      <h3 class="text-base font-bold text-slate-900 dark:text-white">Qonun topilmadi</h3>
      <p class="text-xs text-slate-500">Kechirasiz, so‘ralgan qonun ma’lumotlari bazadan topilmadi.</p>
      <router-link to="/laws" class="inline-block px-4 py-2 bg-primary-600 text-white rounded-xl text-xs font-semibold">
        Qonunlar qidiruviga o‘tish
      </router-link>
    </div>

    <!-- Law Detail Body -->
    <div v-else class="space-y-6">
      <!-- Law Header Card -->
      <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center space-x-2">
            <span class="px-3 py-1 rounded-lg text-xs font-bold bg-primary-100 dark:bg-primary-950/70 text-primary-700 dark:text-primary-300">
              {{ law.type }}
            </span>
            <span class="inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 class="w-3.5 h-3.5" />
              <span>{{ law.status }}</span>
            </span>
          </div>

          <div class="flex items-center space-x-2">
            <a
              v-if="law.sourceUrl"
              :href="law.sourceUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 flex items-center space-x-1.5 transition-colors"
            >
              <span>Lex.uz rasmiy manba</span>
              <ExternalLink class="w-3.5 h-3.5" />
            </a>

            <button
              @click="lawsStore.toggleSave(law.id)"
              class="px-3.5 py-1.5 rounded-xl font-semibold text-xs transition-colors flex items-center space-x-1.5"
              :class="law.saved ? 'bg-primary-50 dark:bg-primary-950/70 text-primary-600 border border-primary-200 dark:border-primary-800' : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'"
            >
              <BookmarkCheck v-if="law.saved" class="w-4 h-4 text-primary-600" />
              <Bookmark v-else class="w-4 h-4" />
              <span>{{ law.saved ? 'Saqlangan' : 'Saqlash' }}</span>
            </button>
          </div>
        </div>

        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
          {{ law.title }}
        </h1>

        <div class="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
          <div class="flex items-center space-x-1.5">
            <Calendar class="w-3.5 h-3.5" />
            <span>Qabul qilingan: {{ law.adoptedDate }}</span>
          </div>
          <div>•</div>
          <div>Jami moddalar: {{ law.articles.length }} ta</div>
        </div>
      </div>

      <!-- Articles Search within Law -->
      <div class="relative">
        <input
          v-model="articleSearch"
          type="text"
          placeholder="Ushbu qonun moddalari orasidan qidirish (raqam yoki matn)..."
          class="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-white shadow-xs"
        />
        <Search class="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
      </div>

      <!-- Articles List -->
      <div class="space-y-4">
        <div
          v-for="art in filteredArticles"
          :key="art.id"
          class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
        >
          <div class="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div class="flex items-center space-x-2">
              <span class="w-7 h-7 rounded-lg bg-primary-100 dark:bg-primary-950/70 text-primary-700 dark:text-primary-300 font-bold text-xs flex items-center justify-center">
                {{ art.number }}
              </span>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white">
                {{ art.number }}-modda{{ art.title ? `. ${art.title}` : '' }}
              </h3>
            </div>

            <button
              @click="copyArticleText(art)"
              title="Modda matnidan nusxa olish"
              class="p-1.5 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center space-x-1 text-xs"
            >
              <Check v-if="copiedArticleId === art.id" class="w-4 h-4 text-emerald-500" />
              <Copy v-else class="w-4 h-4" />
              <span class="text-[10px] hidden sm:inline">
                {{ copiedArticleId === art.id ? 'Nusxalandi!' : 'Nusxa olish' }}
              </span>
            </button>
          </div>

          <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {{ art.content }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
