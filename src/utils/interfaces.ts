export interface Post {
  id: number;
  date: string;
  title: string;
  description: string;
  content: string;
  code?: string;
  codeLanguage: string;
  tag: string;
}
