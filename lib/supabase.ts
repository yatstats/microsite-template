import { createClient } from '@supabase/supabase-js';

let supabaseClient = null as ReturnType<typeof createClient> | null;

export function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error('Supabase environment variables are missing.');
  }

  if (!supabaseClient) {
    supabaseClient = createClient(url, serviceKey, {
      auth: { persistSession: false },
    });
  }

  return supabaseClient;
}
