<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLawsStore } from '../stores/laws';
import { LEGAL_CATEGORIES } from '../constants/legalCategories';
import { 
  Search, 
  BookOpen, 
  Bookmark, 
  BookmarkCheck, 
  ExternalLink, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Filter 
} from 'lucide-vue-next';
import LoadingSpinner from '../components/common/LoadingSpinner.vue';
import EmptyState from '../components/common/EmptyState.vue';

const route = useRoute();
const router = useRouter();
const lawsStore = useLawsStore();

const searchQuery = ref((route.query.q as string) || '');
const selectedCategory = ref((route.query.cat as string) || '');

const handleSearch = () => {
  router.replace({
    query: {
      ...(searchQuery.value ? { q: searchQuery.value } : {}),
      ...(selectedCategory.value ? { cat: selectedCategory.value } : {})
    }
  });
  lawsStore.searchLaws(searchQuery.value, selectedCategory.value);
};

const selectCategory = (catId: string) => {
  selectedCategory.value = selectedCategory.value === catId ? '' : catId;
  handleSearch();
};

onMounted(() => {
  if (searchQuery.value || selectedCategory.value) {
    lawsStore.searchLaws(searchQuery.value, selectedCategory.value);
  } else {
    lawsStore.fetchLaws();
  }
});

watch(() => route.query, (newQuery) => {
  searchQuery.value = (newQuery.q as string) || '';
  selectedCategory.value = (newQuery.cat as string) || '';
  lawsStore.searchLaws(searchQuery.value, selectedCategory.value);
});
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
    <!-- Header -->
    <div class="space-y-3">
      <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-950/70 text-xs font-semibold text-primary-700 dark:text-primary-300">
        <BookOpen class="w-3.5 h-3.5" />
        <span>O‘zbekiston Respublikasi Qonunchilik Bazasi</span>
      </div>
      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Qonunlar va Kodekslar qidiruvi
      </h1>
      <p class="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
        Amaldagi kodekslar, qonunlar va ularning moddalari bo‘yicha tezkor qidiruv. Rasmiy Lex.uz bazasi integratsiyasi.
      </p>
    </div>

    <!-- Search & Filters Container -->
    <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <!-- Search Input -->
      <div class="relative">
        <input
          v-model="searchQuery"
          @input="handleSearch"
          type="text"
          placeholder="Qonun nomi, modda raqami (masalan '151') yoki kalit so‘z kiriting..."
          class="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-white"
        />
        <Search class="absolute left-4 top-4 w-4 h-4 text-slate-400" />
      </div>

      <!-- Categories Pills -->
      <div>
        <div class="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 flex items-center space-x-1.5">
          <Filter class="w-3.5 h-3.5" />
          <span>Huquqiy sohalar bo‘yicha filtr:</span>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            @click="selectCategory('')"
            class="px-3 py-1.5 rounded-xl text-xs font-medium transition-colors"
            :class="!selectedCategory ? 'bg-primary-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'"
          >
            Barchasi
          </button>
          <button
            v-for="cat in LEGAL_CATEGORIES"
            :key="cat.id"
            @click="selectCategory(cat.id)"
            class="px-3 py-1.5 rounded-xl text-xs font-medium transition-colors"
            :class="selectedCategory === cat.id ? 'bg-primary-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <LoadingSpinner v-if="lawsStore.loading" text="Qonunlar qidirilmoqda..." />

    <!-- Error State -->
    <div v-else-if="lawsStore.error" class="p-4 rounded-2xl bg-red-50 text-red-700 text-xs border border-red-200">
      {{ lawsStore.error }}
    </div>

    <!-- Empty State -->
    <EmptyState
      v-else-if="lawsStore.laws.length === 0"
      title="Qonun topilmadi"
      description="Kiritilgan so‘rov bo‘yicha qonun yoki modda topilmadi. Qidiruv so‘zini o‘zgartirib ko‘ring yoki barcha qonunlarni tanlang."
      action-text="Filtrlarni tozalash"
      @action="selectedCategory = ''; searchQuery = ''; handleSearch();"
    />

    <!-- Laws List -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="law in lawsStore.laws"
        :key="law.id"
        class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
      >
        <div class="space-y-3">
          <!-- Top Row: Type & Status & Bookmark -->
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300">
                {{ law.type }}
              </span>
              <span class="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 class="w-3.5 h-3.5" />
                <span>{{ law.status }}</span>
              </span>
            </div>

            <button
              @click="lawsStore.toggleSave(law.id)"
              :title="law.saved ? 'Saqlanganlardan o‘chirish' : 'Saqlab qo‘yish'"
              class="p-2 rounded-xl transition-colors"
              :class="law.saved ? 'text-primary-600 bg-primary-50 dark:bg-primary-950/60' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'"
            >
              <BookmarkCheck v-if="law.saved" class="w-5 h-5" />
              <Bookmark v-else class="w-5 h-5" />
            </button>
          </div>

          <!-- Law Title -->
          <h2 class="text-base font-bold text-slate-900 dark:text-white leading-snug">
            {{ law.title }}
          </h2>

          <div class="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-2">
            <Calendar class="w-3.5 h-3.5" />
            <span>Qabul qilingan: {{ law.adoptedDate }}</span>
          </div>

          <!-- Articles Snippets Preview -->
          <div class="space-y-1.5 pt-1">
            <div class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Asosiy moddalar ({{ law.articles.length }} ta):
            </div>
            <div
              v-for="art in law.articles.slice(0, 2)"
              :key="art.id"
              class="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/80 text-xs text-slate-700 dark:text-slate-300"
            >
              <div class="font-semibold text-primary-700 dark:text-primary-400 mb-0.5">
                {{ art.number }}-modda{{ art.title ? `: ${art.title}` : '' }}
              </div>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                {{ art.content }}
              </p>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <a
            v-if="law.sourceUrl"
            :href="law.sourceUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-xs font-semibold text-slate-500 hover:text-primary-600 flex items-center space-x-1"
          >
            <span>Lex.uz da ko‘rish</span>
            <ExternalLink class="w-3 h-3" />
          </a>

          <router-link
            :to="'/laws/' + law.id"
            class="px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold transition-all flex items-center space-x-1.5 shadow-sm"
          >
            <span>Barcha moddalarni o‘qish</span>
            <ArrowRight class="w-3.5 h-3.5" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
