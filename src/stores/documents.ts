import { defineStore } from 'pinia';
import { DocumentTemplate, GeneratedDocument } from '../types/documents';
import { DocumentService } from '../services/documents';

export const useDocumentsStore = defineStore('documents', {
  state: () => ({
    templates: [] as DocumentTemplate[],
    generatedDocuments: [] as GeneratedDocument[],
    activeTemplate: null as DocumentTemplate | null,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchTemplates() {
      this.loading = true;
      this.error = null;
      try {
        this.templates = await DocumentService.getTemplates();
      } catch (err: any) {
        this.error = err.message || 'Shablonlarni yuklashda xatolik';
      } finally {
        this.loading = false;
      }
    },
    async fetchTemplateById(id: string) {
      this.loading = true;
      this.error = null;
      this.activeTemplate = null;
      try {
        const t = await DocumentService.getTemplateById(id);
        if (t) {
          this.activeTemplate = t;
        } else {
          this.error = 'Shablon topilmadi';
        }
      } catch (err: any) {
        this.error = err.message || 'Shablonni yuklashda xatolik';
      } finally {
        this.loading = false;
      }
    },
    async generateDocument(templateId: string, fieldsData: Record<string, string>) {
      this.loading = true;
      this.error = null;
      try {
        const doc = await DocumentService.generateDocument(templateId, fieldsData);
        // Refresh generated list
        await this.fetchGeneratedDocuments();
        return doc;
      } catch (err: any) {
        this.error = err.message || 'Hujjat yaratishda xatolik';
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async fetchGeneratedDocuments() {
      this.loading = true;
      this.error = null;
      try {
        this.generatedDocuments = await DocumentService.getGeneratedDocuments();
      } catch (err: any) {
        this.error = err.message || 'Yaratilgan hujjatlarni yuklashda xatolik';
      } finally {
        this.loading = false;
      }
    },
    async deleteDocument(id: string) {
      try {
        await DocumentService.deleteDocument(id);
        this.generatedDocuments = this.generatedDocuments.filter(d => d.id !== id);
      } catch (err: any) {
        console.error('Hujjatni o‘chirishda xatolik:', err);
      }
    }
  }
});
