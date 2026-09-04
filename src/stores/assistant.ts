import { defineStore } from 'pinia';
import { Message, ChatSession } from '../types/assistant';
import { AssistantService } from '../services/assistant';

const createDefaultSession = (): ChatSession => ({
  id: 'default',
  title: 'Yangi huquqiy suhbat',
  messages: [
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Assalomu alaykum! Men sizning raqamli huquqiy yordamchingizman. Muammoingizni oddiy tilda batafsil yozing, men uning huquqiy asosi va qonuniy yechimini topib beraman. Masalan:\n\n*“Internetdan telefon sotib oldim. Telefon nosoz chiqdi. Sotuvchi pulimni qaytarmayapti. Nima qilishim mumkin?”*\n*“Ish beruvchim navbatdagi mehnat ta’tiliga chiqishimga ruxsat bermayapti. Huquqlarim qanday?”*',
      createdAt: new Date()
    }
  ],
  createdAt: new Date()
});

export const useAssistantStore = defineStore('assistant', {
  state: () => ({
    sessions: [createDefaultSession()] as ChatSession[],
    currentSessionId: 'default' as string,
    loading: false,
    error: null as string | null,
  }),
  getters: {
    currentSession(state): ChatSession {
      const found = state.sessions.find(s => s.id === state.currentSessionId);
      return found || state.sessions[0];
    },
    messages(): Message[] {
      return this.currentSession?.messages || [];
    }
  },
  actions: {
    async sendMessage(text: string) {
      if (!text.trim()) return;

      const userMsg: Message = {
        id: 'msg-' + Math.random().toString(36).substring(2, 9),
        role: 'user',
        content: text,
        createdAt: new Date()
      };

      // Add to session
      const session = this.currentSession;
      session.messages.push(userMsg);

      // Adjust title from the first query if it's default
      if (session.title === 'Yangi huquqiy suhbat') {
        session.title = text.length > 30 ? text.substring(0, 30) + '...' : text;
      }

      this.loading = true;
      this.error = null;

      try {
        const aiResponse = await AssistantService.generateResponse(text);
        session.messages.push(aiResponse);
      } catch (err: any) {
        this.error = err.message || 'Javob olishda xatolik yuz berdi';
        session.messages.push({
          id: 'error-msg',
          role: 'assistant',
          content: 'Kechirasiz, tizimda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.',
          createdAt: new Date()
        });
      } finally {
        this.loading = false;
      }
    },
    startNewSession() {
      const newId = 'session-' + Date.now();
      const newSession: ChatSession = {
        id: newId,
        title: 'Yangi huquqiy suhbat',
        messages: [
          {
            id: 'welcome-' + newId,
            role: 'assistant',
            content: 'Assalomu alaykum! Men sizning raqamli huquqiy yordamchingizman. Yangi murojaatingizni bayon qiling.',
            createdAt: new Date()
          }
        ],
        createdAt: new Date()
      };
      this.sessions.unshift(newSession);
      this.currentSessionId = newId;
      return newId;
    },
    selectSession(id: string) {
      this.currentSessionId = id;
    },
    deleteSession(id: string) {
      this.sessions = this.sessions.filter(s => s.id !== id);
      if (this.sessions.length === 0) {
        this.sessions.push(createDefaultSession());
      }
      if (this.currentSessionId === id) {
        this.currentSessionId = this.sessions[0].id;
      }
    }
  }
});
