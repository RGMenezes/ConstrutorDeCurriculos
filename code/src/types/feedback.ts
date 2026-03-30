export interface IFeedback {
  id?: string;
  user_id: string;
  name: string;
  position: string;
  company: string;
  contact?: string;
  relationship: string;
  feedback?: string; // campo markdown
  link_name?: string;
  link_url?: string;
  created_at?: string; // ISO datetime string
  updated_at?: string; // ISO datetime string
}
