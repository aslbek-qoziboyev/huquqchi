import { defineStore } from 'pinia';
import { Law } from '../types/laws';
import { LawsService } from '../services/laws';

export const useLawsStore = defineStore('laws', {
  state: () => ({
    laws: [] as Law[],
    loading: false,
    error: null as string | null,
  }),
  getters: {
    savedLaws(): Law[] {
      return this.laws.filter(l => l.saved);
    }
  },
  actions: {
    async fetchLaws() {
      this.loading = true;
      this.error = null;
      try {
        this.laws = await LawsService.getLaws();
      } catch (err: any) {
        this.error = err.message || 'Qonunlarni yuklashda xatolik';
      } finally {
        this.loading = false;
      }
    },
    async searchLaws(query: string, category?: string) {
      this.loading = true;
      this.error = null;
      try {
        this.laws = await LawsService.searchLaws(query, category);
      } catch (err: any) {
        this.error = err.message || 'Qidiruvda xatolik yuz berdi';
      } finally {
        this.loading = false;
      }
    },
    async toggleSave(lawId: string) {
      try {
        const isSaved = await LawsService.toggleSaveLaw(lawId);
        const law = this.laws.find(l => l.id === lawId);
        if (law) {
          law.saved = isSaved;
        }
      } catch (err: any) {
        console.error('Saqlashda xatolik:', err);
      }
    }
  }
});
