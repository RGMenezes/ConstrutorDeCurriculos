export interface ISkill {
  id?: string;
  user_id: string;
  name: string;
  category: string;
  created_at?: string; // ISO datetime string
  updated_at?: string; // ISO datetime string
}
