export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'date' | 'select' | 'tel';
  placeholder?: string;
  required: boolean;
  value: string;
  options?: string[]; // for select type
  validationError?: string;
}

export interface DocumentTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  fields: FormField[];
  previewTemplate: string; // A markdown or string template with placeholders like {{fullName}}
}

export interface GeneratedDocument {
  id: string;
  templateId: string;
  title: string;
  createdAt: string;
  content: string; // compiled document text
  fieldsData: Record<string, string>;
  downloadUrls: {
    docx: string;
    pdf: string;
  };
}
