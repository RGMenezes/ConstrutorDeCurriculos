export interface IFormation {
  id?: string;
  user_id: string;
  degree: string;
  institution: string;
  type: string;
  status: string;
  start_date: string; // ISO date string
  end_date?: string; // ISO date string | null
  created_at?: string; // ISO datetime string
  updated_at?: string; // ISO datetime string
}
