<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';

withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg';
    text?: string;
  }>(),
  {
    size: 'md',
    text: 'Yuklanmoqda...'
  }
);
</script>

<template>
  <div class="flex flex-col items-center justify-center p-8 space-y-3">
    <Loader2 
      class="animate-spin text-primary-600 dark:text-primary-400"
      :class="{
        'w-5 h-5': size === 'sm',
        'w-8 h-8': size === 'md',
        'w-12 h-12': size === 'lg',
      }"
    />
    <p v-if="text" class="text-xs text-slate-500 dark:text-slate-400 animate-pulse font-medium">
      {{ text }}
    </p>
  </div>
</template>
