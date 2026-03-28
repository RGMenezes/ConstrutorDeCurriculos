export interface ILanguage {
  id?: string;
  user_id: string;
  language: string;
  proficiency: string;
  created_at?: string; // ISO datetime string
  updated_at?: string; // ISO datetime string
}
