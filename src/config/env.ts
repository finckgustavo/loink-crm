export const env = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
} as const;

// Validate environment variables
Object.entries(env.supabase).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing environment variable: VITE_SUPABASE_${key.toUpperCase()}`);
  }
});