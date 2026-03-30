export interface IExternalLink {
  id?: string;
  user_id: string;
  name: string;
  url: string;
}

export interface IAdresses {
    id?: string;
    user_id: string;
    city?: string;
    state?: string;
    country?: string;
}

export interface IProfile {
  id?: string;
  user_id: string;
  name?: string;
  email?: string;
  phone?: string;
  description?: string;
}