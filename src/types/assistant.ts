export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
  // Specific structured output for AI Legal Assistant when role is 'assistant'
  structuredContent?: {
    muammo: string;
    huquqlar: string[];
    huquqiyAsos: {
      qonunNomi: string;
      modda: string;
      band?: string;
      tekshirishZarur: boolean;
    };
    nimaQilishKarak: string[];
    hujjatYaratishCTA?: {
      templateId: string;
      buttonText: string;
    };
  };
  sources?: Source[];
}

export interface Source {
  id: string;
  title: string;
  article: string;
  link?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}
