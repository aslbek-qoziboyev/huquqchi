<script setup lang="ts">
import { FolderSearch } from 'lucide-vue-next';

withDefaults(
  defineProps<{
    title: string;
    description?: string;
    actionText?: string;
  }>(),
  {
    description: 'Hech qanday ma’lumot topilmadi.',
    actionText: ''
  }
);

const emit = defineEmits<{
  (e: 'action'): void;
}>();
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30 my-4">
    <div class="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-3">
      <FolderSearch class="w-6 h-6" />
    </div>
    <h3 class="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
      {{ title }}
    </h3>
    <p class="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-4">
      {{ description }}
    </p>
    <button
      v-if="actionText"
      @click="emit('action')"
      class="px-4 py-2 text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/50 hover:bg-primary-100 dark:hover:bg-primary-900/50 rounded-xl transition-colors"
    >
      {{ actionText }}
    </button>
  </div>
</template>
