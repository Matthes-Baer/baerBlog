export interface Post {
  id: number;
  date: string;
  title: string;
  description: string;
  content: string;
  code?: string;
  tags: string[];
}
