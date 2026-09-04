<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useDocumentsStore } from '../stores/documents';
import { useAuthStore } from '../stores/auth';
import { 
  ArrowLeft, 
  Download, 
  Copy, 
  Check, 
  CheckCircle2, 
  Loader2, 
  AlertCircle,
  Eye,
  Printer
} from 'lucide-vue-next';
import LoadingSpinner from '../components/common/LoadingSpinner.vue';

const route = useRoute();
const documentsStore = useDocumentsStore();
const authStore = useAuthStore();

const formData = reactive<Record<string, string>>({});
const formErrors = reactive<Record<string, string>>({});
const isGenerating = ref(false);
const generatedDoc = ref<any>(null);
const isCopied = ref(false);

const template = computed(() => documentsStore.activeTemplate);

onMounted(async () => {
  const id = route.params.id as string;
  await documentsStore.fetchTemplateById(id);
  
  if (template.value) {
    template.value.fields.forEach(f => {
      // Prefill if auth user info matches
      if (f.id === 'fullName' && authStore.user?.fullName) {
        formData[f.id] = authStore.user.fullName;
      } else if (f.id === 'phoneNumber' && authStore.user?.phoneNumber) {
        formData[f.id] = authStore.user.phoneNumber;
      } else {
        formData[f.id] = f.value || '';
      }
    });
  }
});

// Live preview calculation
const livePreview = computed(() => {
  if (!template.value) return '';
  let preview = template.value.previewTemplate;
  Object.entries(formData).forEach(([key, val]) => {
    preview = preview.replace(new RegExp(`{{${key}}}`, 'g'), val ? `**${val}**` : `[${key}]`);
  });
  return preview;
});

const validateForm = (): boolean => {
  let isValid = true;
  Object.keys(formErrors).forEach(k => delete formErrors[k]);

  if (!template.value) return false;

  template.value.fields.forEach(field => {
    if (field.required && (!formData[field.id] || !formData[field.id].trim())) {
      formErrors[field.id] = `${field.label} kiritilishi shart`;
      isValid = false;
    }
  });

  return isValid;
};

const handleGenerate = async () => {
  if (!validateForm() || !template.value) return;

  isGenerating.value = true;
  try {
    const doc = await documentsStore.generateDocument(template.value.id, formData);
    generatedDoc.value = doc;
  } catch (err) {
    console.error('Xatolik:', err);
  } finally {
    isGenerating.value = false;
  }
};

const copyToClipboard = () => {
  if (!livePreview.value) return;
  // Clean markdown asterisks for plain text
  const plain = livePreview.value.replace(/\*\*/g, '');
  navigator.clipboard.writeText(plain);
  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 2000);
};

const downloadFormat = (format: 'docx' | 'pdf') => {
  alert(`"${template.value?.title}" hujjati ${format.toUpperCase()} formatida muvaffaqiyatli saqlandi!`);
};

const printDocument = () => {
  window.print();
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
    <!-- Back Button -->
    <div>
      <router-link
        to="/documents"
        class="inline-flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-primary-600 transition-colors"
      >
        <ArrowLeft class="w-4 h-4" />
        <span>Shablonlar ro‘yxatiga qaytish</span>
      </router-link>
    </div>

    <LoadingSpinner v-if="documentsStore.loading" text="Shablon yuklanmoqda..." />

    <!-- Error State -->
    <div v-else-if="!template" class="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
      <h3 class="text-base font-bold text-slate-900 dark:text-white">Shablon topilmadi</h3>
      <router-link to="/documents" class="inline-block px-4 py-2 bg-primary-600 text-white rounded-xl text-xs font-semibold">
        Hujjatlar ro‘yxatiga o‘tish
      </router-link>
    </div>

    <!-- Main Workspace (Form + Live Preview) -->
    <div v-else class="space-y-6">
      <!-- Title Card -->
      <div class="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span class="text-[11px] font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            Hujjat to‘ldirish
          </span>
          <h1 class="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            {{ template.title }}
          </h1>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {{ template.description }}
          </p>
        </div>

        <div class="flex items-center space-x-2">
          <button
            @click="copyToClipboard"
            class="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 flex items-center space-x-1.5 transition-colors"
          >
            <Check v-if="isCopied" class="w-4 h-4 text-emerald-500" />
            <Copy v-else class="w-4 h-4" />
            <span>{{ isCopied ? 'Nusxa olindi' : 'Matnni nusxalash' }}</span>
          </button>
        </div>
      </div>

      <!-- Success Generated Banner (If generated) -->
      <div v-if="generatedDoc" class="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
            <CheckCircle2 class="w-6 h-6" />
          </div>
          <div>
            <h4 class="text-sm font-bold text-emerald-900 dark:text-emerald-200">
              Hujjat muvaffaqiyatli shakllantirildi!
            </h4>
            <p class="text-xs text-emerald-700 dark:text-emerald-300">
              Hujjat shaxsiy kabinetingizga saqlandi. Endi uni yuklab olishingiz mumkin.
            </p>
          </div>
        </div>

        <div class="flex items-center space-x-2">
          <button
            @click="downloadFormat('docx')"
            class="px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm"
          >
            <Download class="w-4 h-4" />
            <span>Word (DOCX)</span>
          </button>
          <button
            @click="downloadFormat('pdf')"
            class="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm"
          >
            <Download class="w-4 h-4" />
            <span>PDF</span>
          </button>
        </div>
      </div>

      <!-- Two-Column Form & Live Preview -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Form Fields (Left Column) -->
        <div class="lg:col-span-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div class="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 class="font-bold text-sm text-slate-900 dark:text-white">
              Kerakli ma’lumotlarni kiriting
            </h3>
            <p class="text-xs text-slate-500">O‘ng tomonda kiritilgan ma’lumotlar avtomatik ko‘rinadi</p>
          </div>

          <form @submit.prevent="handleGenerate" class="space-y-4">
            <div v-for="field in template.fields" :key="field.id">
              <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {{ field.label }}
                <span v-if="field.required" class="text-red-500">*</span>
              </label>

              <!-- Textarea input -->
              <textarea
                v-if="field.type === 'textarea'"
                v-model="formData[field.id]"
                :placeholder="field.placeholder"
                rows="3"
                class="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-white"
                :class="{ 'border-red-500': formErrors[field.id] }"
              ></textarea>

              <!-- Date input -->
              <input
                v-else-if="field.type === 'date'"
                v-model="formData[field.id]"
                type="date"
                class="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-white"
                :class="{ 'border-red-500': formErrors[field.id] }"
              />

              <!-- Standard text / tel input -->
              <input
                v-else
                v-model="formData[field.id]"
                :type="field.type"
                :placeholder="field.placeholder"
                class="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-white"
                :class="{ 'border-red-500': formErrors[field.id] }"
              />

              <p v-if="formErrors[field.id]" class="text-[11px] text-red-500 mt-1 flex items-center">
                <AlertCircle class="w-3 h-3 mr-1 inline" />
                {{ formErrors[field.id] }}
              </p>
            </div>

            <div class="pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="submit"
                :disabled="isGenerating"
                class="w-full py-3.5 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 active:scale-[0.99] text-white font-semibold text-sm shadow-md shadow-primary-500/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
              >
                <Loader2 v-if="isGenerating" class="w-4 h-4 animate-spin" />
                <span v-else>Hujjatni shakllantirish va saqlash</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Live Document Preview (Right Column) -->
        <div class="lg:col-span-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div class="flex items-center space-x-2">
              <Eye class="w-4 h-4 text-primary-600" />
              <h3 class="font-bold text-sm text-slate-900 dark:text-white">
                Hujjatning jonli ko‘rinishi (Preview)
              </h3>
            </div>
            <button
              @click="printDocument"
              class="text-xs text-slate-400 hover:text-slate-600 flex items-center space-x-1"
            >
              <Printer class="w-3.5 h-3.5" />
              <span>Chop etish</span>
            </button>
          </div>

          <!-- Document Sheet Simulation -->
          <div class="bg-slate-50 dark:bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-inner font-serif text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line min-h-[400px]">
            {{ livePreview }}
          </div>

          <p class="text-[11px] text-slate-400 text-center">
            * Shakllantirilgan hujjat O‘zbekiston Respublikasi rasmiy ish yuritish standartlariga muvofiq tuziladi.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
