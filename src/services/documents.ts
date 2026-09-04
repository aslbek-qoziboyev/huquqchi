import { DocumentTemplate, GeneratedDocument } from '../types/documents';
import { DOCUMENT_TEMPLATES } from '../constants/documentTemplates';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const DocumentService = {
  async getTemplates(): Promise<DocumentTemplate[]> {
    await delay(300);
    return DOCUMENT_TEMPLATES;
  },

  async getTemplateById(id: string): Promise<DocumentTemplate | null> {
    await delay(200);
    const t = DOCUMENT_TEMPLATES.find(x => x.id === id);
    if (!t) return null;
    return JSON.parse(JSON.stringify(t));
  },

  async generateDocument(templateId: string, fieldsData: Record<string, string>): Promise<GeneratedDocument> {
    await delay(1200);
    const template = DOCUMENT_TEMPLATES.find(x => x.id === templateId);
    if (!template) {
      throw new Error('Shablon topilmadi.');
    }

    // Replace placeholders e.g., {{fullName}} with field values
    let compiledContent = template.previewTemplate;
    Object.entries(fieldsData).forEach(([key, val]) => {
      compiledContent = compiledContent.replace(new RegExp(`{{${key}}}`, 'g'), val || `[${key}]`);
    });

    const docId = 'doc-' + Math.random().toString(36).substring(2, 9);
    const newDoc: GeneratedDocument = {
      id: docId,
      templateId,
      title: template.title,
      createdAt: new Date().toLocaleDateString('uz-UZ'),
      content: compiledContent,
      fieldsData,
      downloadUrls: {
        docx: `#download-docx-${docId}`,
        pdf: `#download-pdf-${docId}`
      }
    };

    const saved = localStorage.getItem('generated_documents');
    const list: GeneratedDocument[] = saved ? JSON.parse(saved) : [];
    list.unshift(newDoc);
    localStorage.setItem('generated_documents', JSON.stringify(list));

    return newDoc;
  },

  async getGeneratedDocuments(): Promise<GeneratedDocument[]> {
    await delay(300);
    const saved = localStorage.getItem('generated_documents');
    return saved ? JSON.parse(saved) : [];
  },

  async deleteDocument(id: string): Promise<void> {
    await delay(200);
    const saved = localStorage.getItem('generated_documents');
    if (saved) {
      let list: GeneratedDocument[] = JSON.parse(saved);
      list = list.filter(d => d.id !== id);
      localStorage.setItem('generated_documents', JSON.stringify(list));
    }
  }
};
