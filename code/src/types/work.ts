export interface IWork {
  id?: string;
  user_id: string;
  company: string;
  position: string;
  start_date: string; // ISO date string
  end_date?: string; // ISO date string | null
  description?: string;
  created_at?: string; // ISO datetime string
  updated_at?: string; // ISO datetime string
}
