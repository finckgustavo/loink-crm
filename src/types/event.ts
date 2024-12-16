export interface Event {
  id: string;
  title: string;
  description: string | null;
  date: string;
  user_id: string;
  created_at: string;
}

export interface EventFormData {
  title: string;
  description: string;
  date: string;
}