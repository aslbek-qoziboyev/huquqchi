<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { 
  Scale, 
  MessageSquareText, 
  BookOpen, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ChevronDown, 
  Briefcase, 
  ShoppingCart, 
  Heart, 
  Shield, 
  Home, 
  GraduationCap, 
  Coins, 
  Award, 
  Car, 
  Globe, 
  Key, 
  Lock,
  Search
} from 'lucide-vue-next';
import { LEGAL_CATEGORIES } from '../constants/legalCategories';

const router = useRouter();

// FAQ accordions state
const activeFaq = ref<number | null>(null);
const toggleFaq = (index: number) => {
  activeFaq.value = activeFaq.value === index ? null : index;
};

const iconMap: Record<string, any> = {
  Briefcase,
  ShoppingCart,
  Scale,
  Heart,
  Shield,
  Home,
  GraduationCap,
  Coins,
  Award,
  Car,
  Globe,
  Key
};

const faqs = [
  {
    q: '“Mening Huquqim” platformasidan foydalanish bepulmi?',
    a: 'Ha, platformaning asosiy imkoniyatlari — sun’iy intellekt orqali dastlabki huquqiy tahlil olish, O‘zbekiston Respublikasi qonunlar bazasidan qidirish va namunaviy hujjatlar yaratish barcha fuqarolar uchun bepul taqdim etiladi.'
  },
  {
    q: 'Tizim bergan javoblar qaysi huquqiy manbalarga asoslanadi?',
    a: 'Barcha javoblar O‘zbekiston Respublikasining amaldagi qonunchiligi (Mehnat kodeksi, Fuqarolik kodeksi, Iste’molchilar huquqlarini himoya qilish to‘g‘risidagi qonun va lex.uz rasmiy bazasi)dagi moddalarga tayangan holda shakllantiriladi.'
  },
  {
    q: 'Platforma professional advokat yoki sud o‘rnini bosa oladimi?',
    a: 'Yo‘q. “Mening Huquqim” axborot-tahliliy va konsultatsion yordamchi hisoblanadi. U sizga o‘z huquqlaringizni tushunish va qonuniy yo‘nalishni belgilashda yordam beradi, ammo litsenziyaga ega professional advokat yoki sud organlarining rasmiy vakolatini almashtirmaydi.'
  },
  {
    q: 'Shaxsiy ma’lumotlarim va arizalarim xavfsizligi qanday ta’minlanadi?',
    a: 'Siz kiritgan barcha savollar va yaratilgan arizalar shifrlangan holda saqlanadi hamda uchinchi shaxslarga yoki tijoriy tashkilotlarga mutlaqo berilmaydi.'
  },
  {
    q: 'Yaratilgan arizalarni qanday formatda yuklab olish mumkin?',
    a: 'Tizimda shakllantirilgan rasmiy arizalar, talabnomalar va shikoyatlarni DOCX (Word), PDF formatlarida yuklab olish yoki chop etish mumkin.'
  }
];

const quickSearchQuery = ref('');
const handleQuickSearch = () => {
  if (quickSearchQuery.value.trim()) {
    router.push({ path: '/laws', query: { q: quickSearchQuery.value.trim() } });
  } else {
    router.push('/laws');
  }
};
</script>

<template>
  <div class="space-y-24 pb-16">
    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-12 md:pt-20 pb-16 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-primary-50/50 via-white to-white dark:from-slate-900/50 dark:via-slate-950 dark:to-slate-950">
      <div class="absolute inset-0 bg-[radial-gradient(#1d7fc1_1px,transparent_1px)] [background-size:24px_24px] opacity-10 dark:opacity-20 pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div class="text-center max-w-3xl mx-auto space-y-6">
          <div class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-primary-100 dark:bg-primary-950/70 border border-primary-200 dark:border-primary-800/80 text-primary-700 dark:text-primary-300 text-xs font-semibold shadow-xs">
            <Sparkles class="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
            <span>O‘zbekiston fuqarolari uchun birinchi raqamli huquqiy portal</span>
          </div>

          <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Mening Huquqim
          </h1>

          <p class="text-xl sm:text-2xl font-medium text-slate-700 dark:text-slate-200 space-y-1">
            <span class="text-primary-600 dark:text-primary-400">Huquqlaringizni biling.</span>
            <span class="mx-2 text-slate-400">•</span>
            <span>Qonunni tushuning.</span>
            <span class="mx-2 text-slate-400">•</span>
            <span class="text-emerald-600 dark:text-emerald-400">To‘g‘ri harakat qiling.</span>
          </p>

          <p class="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Muammoingizni oddiy so‘zlar bilan bayon qiling. Sun’iy intellekt yordamchisi qonuniy asosni topib beradi, huquqlaringizni tushuntiradi va rasmiy ariza tayyorlaydi.
          </p>

          <!-- Dual CTAs -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <router-link
              to="/assistant"
              class="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-base shadow-lg shadow-primary-600/25 hover:shadow-primary-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center space-x-2"
            >
              <MessageSquareText class="w-5 h-5" />
              <span>Huquqimni tekshirish</span>
              <ArrowRight class="w-4 h-4 ml-1" />
            </router-link>

            <router-link
              to="/assistant"
              class="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 font-semibold text-base shadow-sm hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
            >
              <ShieldCheck class="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <span>Huquqiy yordam olish</span>
            </router-link>
          </div>

          <!-- Quick Search Bar in Hero -->
          <div class="pt-6 max-w-xl mx-auto">
            <form @submit.prevent="handleQuickSearch" class="relative flex items-center">
              <input
                v-model="quickSearchQuery"
                type="text"
                placeholder="Masalan: Mehnat ta’tili, jarima shikoyati, telefonni qaytarish..."
                class="w-full pl-11 pr-28 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-md text-slate-800 dark:text-slate-100 placeholder-slate-400"
              />
              <Search class="absolute left-4 w-4 h-4 text-slate-400" />
              <button
                type="submit"
                class="absolute right-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold rounded-xl transition-colors"
              >
                Qidirish
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Asosiy Imkoniyatlar (Features) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <h2 class="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
          Platforma imkoniyatlari
        </h2>
        <p class="text-3xl font-extrabold text-slate-900 dark:text-white">
          Huquqiy himoyangiz uchun barcha vositalar bitta joyda
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Feature 1 -->
        <div class="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative group">
          <div class="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-950/70 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <MessageSquareText class="w-7 h-7" />
          </div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">
            AI Huquqiy Yordamchi
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Oddiy so‘zlar bilan vaziyatingizni yozing. Tizim muammoni tahlil qilib, huquqlaringiz, qonuniy asos va bosqichma-bosqich harakatlar rejasini tuzib beradi.
          </p>
          <router-link to="/assistant" class="inline-flex items-center text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline">
            <span>Savol berish</span>
            <ArrowRight class="w-3.5 h-3.5 ml-1" />
          </router-link>
        </div>

        <!-- Feature 2 -->
        <div class="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative group">
          <div class="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <BookOpen class="w-7 h-7" />
          </div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Qonunlar qidiruvi
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Kodekslar, qonunlar va me’yoriy hujjatlar bo‘yicha tezkor semantik qidiruv. Har bir moddaning amaldagi matni va lex.uz rasmiy manbasiga to‘g‘ridan-to‘g‘ri havola.
          </p>
          <router-link to="/laws" class="inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
            <span>Qonunlarni ko‘rish</span>
            <ArrowRight class="w-3.5 h-3.5 ml-1" />
          </router-link>
        </div>

        <!-- Feature 3 -->
        <div class="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative group">
          <div class="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <FileText class="w-7 h-7" />
          </div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Hujjatlar generatori
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Shikoyat, talabnoma va arizalarni advokatsiz, qonun talablariga mos ravishda avtomatik to‘ldiring hamda DOCX yoki PDF formatlarida darhol yuklab oling.
          </p>
          <router-link to="/documents" class="inline-flex items-center text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline">
            <span>Shablon tanlash</span>
            <ArrowRight class="w-3.5 h-3.5 ml-1" />
          </router-link>
        </div>
      </div>
    </section>

    <!-- Qanday ishlaydi? (How it works) -->
    <section class="bg-slate-100/70 dark:bg-slate-900/40 py-16 border-y border-slate-200 dark:border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <h2 class="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            Oddiy va tushunarli jarayon
          </h2>
          <p class="text-3xl font-extrabold text-slate-900 dark:text-white">
            Qanday ishlaydi?
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <!-- Step 1 -->
          <div class="flex flex-col items-center text-center p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div class="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg mb-5 shadow-md shadow-primary-500/30">
              1
            </div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white mb-2">
              Muammoni bayon qiling
            </h3>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Oddiy tilda savolingizni yozing: do‘kon pulingizni qaytarmayaptimi yoki ta’tilingiz berilmayaptimi?
            </p>
          </div>

          <!-- Step 2 -->
          <div class="flex flex-col items-center text-center p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div class="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg mb-5 shadow-md shadow-primary-500/30">
              2
            </div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white mb-2">
              Huquqiy tahlilni oling
            </h3>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              AI tizimi tegishli qonun moddalari, aniq huquqlaringiz va harakatlar ketma-ketligini taqdim etadi.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="flex flex-col items-center text-center p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div class="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg mb-5 shadow-md shadow-primary-500/30">
              3
            </div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white mb-2">
              Hujjatni tayyorlang
            </h3>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Birgina tugma orqali tayyor ariza yoki da’vo talabnomasini shakllantirib, chop eting yoki yuklab oling.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Huquqiy Mavzular (12 Categories) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <h2 class="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-2">
            Qamrab olingan sohalar
          </h2>
          <p class="text-3xl font-extrabold text-slate-900 dark:text-white">
            Huquqiy mavzular katalogi
          </p>
        </div>
        <router-link to="/laws" class="mt-4 md:mt-0 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline flex items-center">
          <span>Barcha qonunlar bazasi</span>
          <ArrowRight class="w-4 h-4 ml-1" />
        </router-link>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <router-link
          v-for="cat in LEGAL_CATEGORIES"
          :key="cat.id"
          :to="{ path: '/laws', query: { cat: cat.id } }"
          class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center mb-3 group-hover:bg-primary-50 dark:group-hover:bg-primary-950 group-hover:text-primary-600 transition-colors">
              <component :is="iconMap[cat.icon] || Scale" class="w-5 h-5" />
            </div>
            <h4 class="font-bold text-sm text-slate-900 dark:text-white mb-1">
              {{ cat.name }}
            </h4>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
              {{ cat.description }}
            </p>
          </div>
          <div class="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] font-semibold text-primary-600 dark:text-primary-400">
            <span>Ko‘rish</span>
            <ArrowRight class="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </router-link>
      </div>
    </section>

    <!-- Security & Privacy Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="rounded-3xl bg-gradient-to-r from-primary-900 to-slate-900 text-white p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div class="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-10 translate-y-10">
          <Lock class="w-80 h-80" />
        </div>

        <div class="max-w-2xl relative space-y-6">
          <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold">
            <Lock class="w-3.5 h-3.5" />
            <span>Kafolatlangan xavfsizlik va maxfiylik</span>
          </div>

          <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Sizning shaxsiy ma’lumotlaringiz va huquqiy sirlaringiz himoyada
          </h2>

          <p class="text-sm text-slate-300 leading-relaxed">
            Biz foydalanuvchilar maxfiyligini birinchi o‘ringa qo‘yamiz. Siz tizimda tuzgan arizalar va yuborgan savollaringiz shaxsiy profilingizda faqat o‘zingiz uchun ochiq bo‘lib, hech qanday uchinchi tomon agentliklariga oshkor qilinmaydi.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div class="flex items-center space-x-2.5 text-xs text-slate-200">
              <CheckCircle2 class="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Shifrlangan ma’lumotlar almashinuvi</span>
            </div>
            <div class="flex items-center space-x-2.5 text-xs text-slate-200">
              <CheckCircle2 class="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Hech qanday noqonuniy kuzatuvlar yo‘q</span>
            </div>
            <div class="flex items-center space-x-2.5 text-xs text-slate-200">
              <CheckCircle2 class="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>O‘zbekiston Lex.uz qonuniy integratsiyasi</span>
            </div>
            <div class="flex items-center space-x-2.5 text-xs text-slate-200">
              <CheckCircle2 class="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Hujjatlarni xavfsiz eksport qilish</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 space-y-3">
        <h2 class="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
          Savollarga javoblar
        </h2>
        <p class="text-3xl font-extrabold text-slate-900 dark:text-white">
          Tez-tez beriladigan savollar
        </p>
      </div>

      <div class="space-y-3">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-colors"
        >
          <button
            @click="toggleFaq(index)"
            class="w-full px-6 py-4 text-left flex items-center justify-between font-semibold text-sm text-slate-800 dark:text-slate-100 focus:outline-none"
          >
            <span>{{ faq.q }}</span>
            <ChevronDown
              class="w-4 h-4 text-slate-400 transition-transform duration-200"
              :class="{ 'rotate-180 text-primary-600': activeFaq === index }"
            />
          </button>
          <div
            v-show="activeFaq === index"
            class="px-6 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60"
          >
            {{ faq.a }}
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom CTA Banner -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="p-8 sm:p-12 rounded-3xl bg-primary-50 dark:bg-primary-950/40 border border-primary-200/80 dark:border-primary-900/60 text-center space-y-5">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Huquqlaringizni himoya qilishni bugunoq boshlang
        </h2>
        <p class="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Qonuniy savollaringiz bormi? Shunchaki yozing va bir necha soniyada batafsil huquqiy tahlil oling.
        </p>
        <div class="pt-2">
          <router-link
            to="/assistant"
            class="inline-flex items-center space-x-2 px-7 py-3.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm shadow-lg shadow-primary-600/30 transition-all"
          >
            <MessageSquareText class="w-4 h-4" />
            <span>Huquqiy yordamchidan bepul foydalanish</span>
            <ArrowRight class="w-4 h-4 ml-1" />
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
