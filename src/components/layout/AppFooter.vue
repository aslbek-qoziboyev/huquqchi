<script setup lang="ts">
import { Scale, ShieldCheck, Heart } from 'lucide-vue-next';
</script>

<template>
  <footer class="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 pt-12 pb-16 md:pb-12 text-slate-600 dark:text-slate-400 text-sm transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <!-- Brand / About -->
        <div class="space-y-4 md:col-span-1">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white">
              <Scale class="w-4 h-4" />
            </div>
            <span class="font-bold text-base text-slate-900 dark:text-white">Mening Huquqim</span>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            O‘zbekiston Respublikasi fuqarolarining huquqiy savodxonligini oshirish va huquqiy himoyani soddalashtirish uchun yaratilgan zamonaviy platforma.
          </p>
          <div class="flex items-center space-x-2 text-xs text-emerald-600 dark:text-emerald-400">
            <ShieldCheck class="w-4 h-4" />
            <span>O‘zbekiston qonunchiligiga asoslangan</span>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold text-xs tracking-wider uppercase text-slate-900 dark:text-white mb-4">
            Asosiy bo‘limlar
          </h4>
          <ul class="space-y-2.5 text-xs">
            <li>
              <router-link to="/assistant" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                AI Huquqiy Yordamchi
              </router-link>
            </li>
            <li>
              <router-link to="/laws" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Qonunlar qidiruvi (Lex.uz)
              </router-link>
            </li>
            <li>
              <router-link to="/documents" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Hujjatlar generatori
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Shaxsiy kabinet
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Topics -->
        <div>
          <h4 class="font-semibold text-xs tracking-wider uppercase text-slate-900 dark:text-white mb-4">
            Ommabop sohalar
          </h4>
          <ul class="space-y-2.5 text-xs">
            <li>
              <router-link to="/laws?cat=mehnat" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Mehnat huquqi va ta’tillar
              </router-link>
            </li>
            <li>
              <router-link to="/laws?cat=istemolchi" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Iste’molchilar huquqlari va qaytarish
              </router-link>
            </li>
            <li>
              <router-link to="/laws?cat=oila" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Oila huquqi va aliment
              </router-link>
            </li>
            <li>
              <router-link to="/laws?cat=uy-joy" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Uy-joy va mulk huquqi
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Legal Disclaimer & Privacy -->
        <div class="space-y-3">
          <h4 class="font-semibold text-xs tracking-wider uppercase text-slate-900 dark:text-white mb-4">
            Huquqiy eslatma
          </h4>
          <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-900/60 text-amber-900 dark:text-amber-300 text-[11px] leading-relaxed">
            <strong>Eslatma:</strong> Platforma axborot va konsultatsion maqsadlarda taqdim etiladi hamda litsenziyalangan professional advokat yoki sud o‘rnini bosmaydi.
          </div>
          <p class="text-[11px] text-slate-400 dark:text-slate-500">
            Shaxsiy ma’lumotlar xavfsizligi qat’iy kafolatlanadi. Ma’lumotlar uchinchi shaxslarga berilmaydi.
          </p>
        </div>
      </div>

      <div class="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-500 space-y-3 sm:space-y-0">
        <div>
          © {{ new Date().getFullYear() }} Mening Huquqim. Barcha huquqlar himoyalangan.
        </div>
        <div class="flex items-center space-x-4">
          <span class="hover:underline cursor-pointer">Maxfiylik siyosati</span>
          <span>•</span>
          <span class="hover:underline cursor-pointer">Foydalanish shartlari</span>
          <span>•</span>
          <span class="flex items-center">
            O‘zbekiston fuqarolari uchun <Heart class="w-3 h-3 text-red-500 inline ml-1" />
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>
