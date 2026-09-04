<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAssistantStore } from '../stores/assistant';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  FileEdit, 
  ExternalLink, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Scale, 
  Info, 
  Loader2, 
  ChevronRight 
} from 'lucide-vue-next';

const router = useRouter();
const assistantStore = useAssistantStore();

const userInput = ref('');
const chatContainer = ref<HTMLElement | null>(null);

const suggestedQuestions = [
  'Internetdan telefon sotib oldim. Telefon nosoz chiqdi. Sotuvchi pulimni qaytarmayapti. Nima qilishim mumkin?',
  'Ish beruvchim navbatdagi yillik mehnat ta’tilini berishdan bosh tortyapti. Nima qilishim kerak?',
  'Xarid qilingan kiyimni do‘konga 14 kun ichida qaytarsam bo‘ladimi?'
];

const scrollToBottom = async () => {
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

onMounted(() => {
  scrollToBottom();
});

watch(
  () => assistantStore.messages.length,
  () => {
    scrollToBottom();
  }
);

const handleSend = async () => {
  if (!userInput.value.trim() || assistantStore.loading) return;
  const text = userInput.value;
  userInput.value = '';
  await assistantStore.sendMessage(text);
  scrollToBottom();
};

const sendSuggested = (q: string) => {
  userInput.value = q;
  handleSend();
};

const createNewChat = () => {
  assistantStore.startNewSession();
  scrollToBottom();
};

const navigateToDoc = (templateId: string) => {
  router.push(`/documents/create/${templateId}`);
};
</script>

<template>
  <div class="h-[calc(100vh-4rem)] flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950 overflow-hidden">
    <!-- Desktop Sessions Sidebar -->
    <aside class="hidden md:flex flex-col w-72 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-4 space-y-4">
      <button
        @click="createNewChat"
        class="w-full py-2.5 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center justify-center space-x-2"
      >
        <Plus class="w-4 h-4" />
        <span>Yangi huquqiy suhbat</span>
      </button>

      <div class="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 pt-2">
        Murojaatlar tarixi
      </div>

      <div class="flex-grow overflow-y-auto space-y-1.5 pr-1">
        <div
          v-for="session in assistantStore.sessions"
          :key="session.id"
          @click="assistantStore.selectSession(session.id); scrollToBottom();"
          class="p-2.5 rounded-xl text-xs font-medium cursor-pointer transition-all flex items-center justify-between group"
          :class="assistantStore.currentSessionId === session.id 
            ? 'bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800/80 font-semibold' 
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'"
        >
          <span class="truncate pr-2">{{ session.title }}</span>
          <button
            v-if="assistantStore.sessions.length > 1"
            @click.stop="assistantStore.deleteSession(session.id)"
            class="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-500 transition-opacity"
          >
            <Trash2 class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
        <div class="font-semibold text-slate-700 dark:text-slate-300 flex items-center">
          <Info class="w-3.5 h-3.5 mr-1 text-primary-600" />
          <span>Ishonchli AI tizimi</span>
        </div>
        <p>Javoblar faqat O‘zbekiston Respublikasi amaldagi qonunlariga tayangan holda beriladi.</p>
      </div>
    </aside>

    <!-- Main Chat Workspace -->
    <div class="flex-grow flex flex-col h-full overflow-hidden">
      <!-- Chat Header -->
      <div class="py-3 px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-9 h-9 rounded-xl bg-primary-600 text-white flex items-center justify-center shadow-sm">
            <Bot class="w-5 h-5" />
          </div>
          <div>
            <h2 class="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
              <span>AI Huquqiy Maslahatchi</span>
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                Online
              </span>
            </h2>
            <p class="text-[11px] text-slate-500 dark:text-slate-400">
              Muammoni yozing — qonuniy yechim va ariza shablonini oling
            </p>
          </div>
        </div>

        <button
          @click="createNewChat"
          class="md:hidden p-2 rounded-lg bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 text-xs font-semibold flex items-center space-x-1"
        >
          <Plus class="w-4 h-4" />
          <span>Yangi</span>
        </button>
      </div>

      <!-- Messages Area -->
      <div ref="chatContainer" class="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6">
        <!-- Suggested Questions (If chat has only welcome message) -->
        <div v-if="assistantStore.messages.length <= 1" class="max-w-2xl mx-auto py-2 space-y-3">
          <div class="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
            <Sparkles class="w-3.5 h-3.5 text-primary-600" />
            <span>Ommabop huquqiy vaziyatlardan birini tanlang:</span>
          </div>
          <div class="flex flex-col gap-2">
            <button
              v-for="(q, idx) in suggestedQuestions"
              :key="idx"
              @click="sendSuggested(q)"
              class="p-3 text-left rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary-400 dark:hover:border-primary-600 hover:bg-primary-50/40 dark:hover:bg-primary-950/20 text-xs text-slate-700 dark:text-slate-300 transition-all flex items-center justify-between group"
            >
              <span>“{{ q }}”</span>
              <ChevronRight class="w-4 h-4 text-slate-400 group-hover:text-primary-600 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
            </button>
          </div>
        </div>

        <!-- Chat Bubbles -->
        <div
          v-for="msg in assistantStore.messages"
          :key="msg.id"
          class="flex flex-col space-y-2 max-w-3xl"
          :class="msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'"
        >
          <div class="flex items-start space-x-2.5" :class="msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''">
            <!-- Avatar -->
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold shadow-xs"
              :class="msg.role === 'user' ? 'bg-slate-700 dark:bg-slate-600' : 'bg-primary-600'"
            >
              <User v-if="msg.role === 'user'" class="w-4 h-4" />
              <Scale v-else class="w-4 h-4" />
            </div>

            <!-- Message Container -->
            <div
              class="p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed"
              :class="msg.role === 'user' 
                ? 'bg-primary-600 text-white shadow-md max-w-md rounded-tr-xs' 
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-800 dark:text-slate-100 w-full rounded-tl-xs space-y-4'"
            >
              <!-- Regular Text or Welcome -->
              <div v-if="!msg.structuredContent" class="whitespace-pre-line">
                {{ msg.content }}
              </div>

              <!-- Structured AI Response -->
              <div v-else class="space-y-4">
                <!-- 1. Muammo -->
                <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
                  <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                    Vaziyat tahlili
                  </div>
                  <div class="font-semibold text-slate-900 dark:text-white">
                    {{ msg.structuredContent.muammo }}
                  </div>
                </div>

                <!-- 2. Sizning huquqlaringiz -->
                <div>
                  <div class="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-2 flex items-center space-x-1.5">
                    <ShieldCheck class="w-4 h-4" />
                    <span>Sizning qonuniy huquqlaringiz</span>
                  </div>
                  <ul class="space-y-2">
                    <li
                      v-for="(h, idx) in msg.structuredContent.huquqlar"
                      :key="idx"
                      class="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2 class="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{{ h }}</span>
                    </li>
                  </ul>
                </div>

                <!-- 3. Huquqiy asos -->
                <div class="p-3.5 rounded-xl border" :class="msg.structuredContent.huquqiyAsos.tekshirishZarur ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60' : 'bg-primary-50/50 dark:bg-primary-950/30 border-primary-200/70 dark:border-primary-900/50'">
                  <div class="flex items-center justify-between mb-1.5">
                    <div class="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Huquqiy asos (Qonunchilik)
                    </div>
                    <span
                      v-if="msg.structuredContent.huquqiyAsos.tekshirishZarur"
                      class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200"
                    >
                      Aniq huquqiy asosni tasdiqlash kerak
                    </span>
                    <span
                      v-else
                      class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                    >
                      Tasdiqlangan qonun
                    </span>
                  </div>

                  <div class="text-xs font-bold text-slate-900 dark:text-white">
                    {{ msg.structuredContent.huquqiyAsos.qonunNomi }}
                  </div>
                  <div class="text-[11px] text-slate-600 dark:text-slate-400">
                    Modda: <span class="font-semibold">{{ msg.structuredContent.huquqiyAsos.modda }}</span>
                  </div>
                </div>

                <!-- 4. Nima qilish kerak? -->
                <div>
                  <div class="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2">
                    Nima qilish kerak? (Bosqichma-bosqich harakatlar)
                  </div>
                  <div class="space-y-2">
                    <div
                      v-for="(qadam, idx) in msg.structuredContent.nimaQilishKarak"
                      :key="idx"
                      class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 flex items-start space-x-2.5 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <span class="w-5 h-5 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                        {{ idx + 1 }}
                      </span>
                      <span class="leading-relaxed">{{ qadam }}</span>
                    </div>
                  </div>
                </div>

                <!-- 5. Hujjat yaratish CTA -->
                <div v-if="msg.structuredContent.hujjatYaratishCTA" class="pt-2">
                  <button
                    @click="navigateToDoc(msg.structuredContent.hujjatYaratishCTA.templateId)"
                    class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold text-xs shadow-md shadow-primary-600/20 transition-all flex items-center justify-center space-x-2"
                  >
                    <FileEdit class="w-4 h-4" />
                    <span>{{ msg.structuredContent.hujjatYaratishCTA.buttonText }}</span>
                  </button>
                </div>

                <!-- Sources References -->
                <div v-if="msg.sources && msg.sources.length > 0" class="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <div class="text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center space-x-1">
                    <ExternalLink class="w-3 h-3" />
                    <span>Rasmiy qonuniy manbalar (Lex.uz):</span>
                  </div>
                  <div class="flex flex-wrap gap-1.5">
                    <a
                      v-for="src in msg.sources"
                      :key="src.id"
                      href="https://lex.uz"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[11px] text-primary-600 dark:text-primary-400 font-medium transition-colors"
                    >
                      <span>{{ src.article }}</span>
                      <ExternalLink class="w-2.5 h-2.5 ml-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Typing / Loading Indicator -->
        <div v-if="assistantStore.loading" class="flex items-start space-x-2.5 max-w-xl">
          <div class="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold shadow-xs">
            <Scale class="w-4 h-4" />
          </div>
          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-tl-xs flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
            <Loader2 class="w-4 h-4 animate-spin text-primary-600" />
            <span class="animate-pulse">Qonunchilik bazasi tahlil qilinmoqda... Javob tayyorlanmoqda...</span>
          </div>
        </div>
      </div>

      <!-- Legal Disclaimer Mini-Bar -->
      <div class="px-4 py-1.5 bg-amber-50/90 dark:bg-amber-950/40 border-t border-amber-200/60 dark:border-amber-900/40 text-[11px] text-amber-800 dark:text-amber-300 text-center">
        Eslatma: AI tahlili ma’lumot uchun beriladi va advokat yoki sud o‘rnini bosmaydi.
      </div>

      <!-- Input Bar -->
      <div class="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <form @submit.prevent="handleSend" class="max-w-4xl mx-auto flex items-end gap-2">
          <textarea
            v-model="userInput"
            @keydown.enter.exact.prevent="handleSend"
            rows="2"
            placeholder="Huquqiy muammoingizni oddiy so‘zlar bilan yozing... (Enter bosib yuboring)"
            class="flex-grow p-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none text-slate-900 dark:text-white"
          ></textarea>

          <button
            type="submit"
            :disabled="!userInput.trim() || assistantStore.loading"
            class="h-12 w-12 rounded-2xl bg-primary-600 hover:bg-primary-700 active:scale-95 text-white flex items-center justify-center shadow-md shadow-primary-500/20 disabled:opacity-50 transition-all flex-shrink-0"
          >
            <Send class="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
