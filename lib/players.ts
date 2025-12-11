import { getSupabaseClient } from './supabase';
import { Player } from './types';

function activeStatuses() {
  return (process.env.YAT_ACTIVE_STATUSES || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function buildBaseQuery(hsid: string) {
  const supabase = getSupabaseClient();
  const hsidFilter = `hsid.eq.${hsid},high_school_id.eq.${hsid}`;
  return supabase.from('players').select('*').or(hsidFilter);
}

export async function getPlayersForHsid(hsid: string): Promise<Player[]> {
  const statuses = activeStatuses();
  try {
    const query = statuses.length
      ? buildBaseQuery(hsid).in('status', statuses)
      : buildBaseQuery(hsid).eq('active', true);
    const { data, error } = await query.order('last', { ascending: true }).order('display_name', {
      ascending: true,
      nullsFirst: false,
    });
    if (error) throw error;
    return data ?? [];
  } catch (primaryError) {
    console.warn('Primary player query failed, retrying without status filter', primaryError);
    const { data, error } = await buildBaseQuery(hsid)
      .order('last', { ascending: true })
      .order('display_name', { ascending: true });
    if (error) throw error;
    return data ?? [];
  }
}

export function playerProfilePath(player: Player) {
  const slug = (player.slug || '').trim();
  const id = (player.id || '').trim();
  if (slug) return `/profile/${encodeURIComponent(slug)}`;
  if (id) return `/profile/${encodeURIComponent(id)}`;
  return '#';
}
