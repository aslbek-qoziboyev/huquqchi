<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDocumentsStore } from '../stores/documents';
import { 
  FileText, 
  FileEdit, 
  Download, 
  Trash2, 
  CheckCircle2, 
  Calendar, 
  ArrowRight,
  Sparkles,
  FileCheck
} from 'lucide-vue-next';
import LoadingSpinner from '../components/common/LoadingSpinner.vue';
import EmptyState from '../components/common/EmptyState.vue';

const router = useRouter();
const documentsStore = useDocumentsStore();

const activeTab = ref<'templates' | 'my-docs'>('templates');

onMounted(async () => {
  await Promise.all([
    documentsStore.fetchTemplates(),
    documentsStore.fetchGeneratedDocuments()
  ]);
});

const selectTemplate = (templateId: string) => {
  router.push(`/documents/create/${templateId}`);
};

const handleDownload = (docTitle: string, format: 'docx' | 'pdf') => {
  alert(`"${docTitle}" hujjati ${format.toUpperCase()} formatida muvaffaqiyatli tayyorlandi va yuklab olindi!`);
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
    <!-- Header -->
    <div class="space-y-3">
      <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/70 text-xs font-semibold text-purple-700 dark:text-purple-300">
        <FileText class="w-3.5 h-3.5" />
        <span>Avtomatlashtirilgan Yuridik Hujjatlar Generatori</span>
      </div>
      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Rasmiy arizalar va shikoyatlar tayyorlash
      </h1>
      <p class="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
        Shablonni tanlang, ma’lumotlarni kiriting va qonun talablariga to‘liq mos keladigan tayyor yuridik hujjatni oling.
      </p>
    </div>

    <!-- Tabs Navigation -->
    <div class="flex border-b border-slate-200 dark:border-slate-800 space-x-6">
      <button
        @click="activeTab = 'templates'"
        class="pb-3 text-sm font-semibold transition-all relative"
        :class="activeTab === 'templates' 
          ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400' 
          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'"
      >
        <span>Tayyor shablonlar ({{ documentsStore.templates.length }})</span>
      </button>

      <button
        @click="activeTab = 'my-docs'"
        class="pb-3 text-sm font-semibold transition-all relative"
        :class="activeTab === 'my-docs' 
          ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400' 
          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'"
      >
        <span>Mening yaratgan hujjatlarim ({{ documentsStore.generatedDocuments.length }})</span>
      </button>
    </div>

    <LoadingSpinner v-if="documentsStore.loading" text="Hujjatlar yuklanmoqda..." />

    <!-- Templates Tab -->
    <div v-else-if="activeTab === 'templates'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="tpl in documentsStore.templates"
          :key="tpl.id"
          class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5"
        >
          <div class="space-y-3">
            <div class="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <FileEdit class="w-5 h-5" />
            </div>

            <h3 class="text-base font-bold text-slate-900 dark:text-white">
              {{ tpl.title }}
            </h3>

            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {{ tpl.description }}
            </p>

            <div class="pt-2 text-[11px] text-slate-400 flex items-center space-x-2">
              <Sparkles class="w-3.5 h-3.5 text-purple-500" />
              <span>Kerakli maydonlar: {{ tpl.fields.length }} ta</span>
            </div>
          </div>

          <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center">
              <CheckCircle2 class="w-3.5 h-3.5 mr-1" /> Standart qonuniy shakl
            </span>

            <button
              @click="selectTemplate(tpl.id)"
              class="px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center space-x-1.5"
            >
              <span>To‘ldirish</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- My Documents Tab -->
    <div v-else class="space-y-6">
      <EmptyState
        v-if="documentsStore.generatedDocuments.length === 0"
        title="Hali hujjat yaratilmagan"
        description="Siz hali birorta ham ariza yoki talabnoma shakllantirmadingiz. Shablonlar bo‘limiga o‘tib, birinchi hujjatingizni yarating."
        action-text="Shablon tanlash"
        @action="activeTab = 'templates'"
      />

      <div v-else class="space-y-4">
        <div
          v-for="doc in documentsStore.generatedDocuments"
          :key="doc.id"
          class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div class="flex items-start space-x-4">
            <div class="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center flex-shrink-0 mt-1">
              <FileCheck class="w-6 h-6" />
            </div>
            <div class="space-y-1">
              <h3 class="text-base font-bold text-slate-900 dark:text-white">
                {{ doc.title }}
              </h3>
              <div class="text-xs text-slate-400 flex items-center space-x-2">
                <Calendar class="w-3.5 h-3.5" />
                <span>Yaratilgan sana: {{ doc.createdAt }}</span>
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-2 self-end md:self-center">
            <!-- Download DOCX -->
            <button
              @click="handleDownload(doc.title, 'docx')"
              class="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center space-x-1.5 transition-colors"
            >
              <Download class="w-3.5 h-3.5 text-blue-600" />
              <span>Word (DOCX)</span>
            </button>

            <!-- Download PDF -->
            <button
              @click="handleDownload(doc.title, 'pdf')"
              class="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center space-x-1.5 transition-colors"
            >
              <Download class="w-3.5 h-3.5 text-red-600" />
              <span>PDF</span>
            </button>

            <!-- Delete -->
            <button
              @click="documentsStore.deleteDocument(doc.id)"
              title="O‘chirish"
              class="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
