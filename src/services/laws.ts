import { Law } from '../types/laws';
import { LAWS_DATA } from '../constants/lawsData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const LawsService = {
  async getLaws(): Promise<Law[]> {
    await delay(300);
    const saved = localStorage.getItem('saved_laws');
    const savedIds: string[] = saved ? JSON.parse(saved) : [];
    return LAWS_DATA.map(law => ({
      ...law,
      saved: savedIds.includes(law.id)
    }));
  },

  async searchLaws(query: string, category?: string): Promise<Law[]> {
    await delay(400);
    let laws = await this.getLaws();
    if (category) {
      laws = laws.filter(l => l.category === category);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      laws = laws.filter(l => 
        l.title.toLowerCase().includes(q) ||
        l.shortTitle.toLowerCase().includes(q) ||
        l.type.toLowerCase().includes(q) ||
        l.articles.some(a => 
          a.number.includes(q) || 
          (a.title && a.title.toLowerCase().includes(q)) || 
          a.content.toLowerCase().includes(q)
        )
      );
    }
    return laws;
  },

  async toggleSaveLaw(lawId: string): Promise<boolean> {
    const saved = localStorage.getItem('saved_laws');
    let savedIds: string[] = saved ? JSON.parse(saved) : [];
    if (savedIds.includes(lawId)) {
      savedIds = savedIds.filter(id => id !== lawId);
    } else {
      savedIds.push(lawId);
    }
    localStorage.setItem('saved_laws', JSON.stringify(savedIds));
    return savedIds.includes(lawId);
  }
};
