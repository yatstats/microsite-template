import PlayerGrid from '@/components/PlayerGrid';
import SiteShell from '@/components/SiteShell';
import { Player } from '@/lib/types';

function getHsid(): string | null {
  return process.env.YAT_BASE_HSID || '5004';
}

function resolveBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  return 'http://localhost:3000';
}

async function fetchPlayers(hsid: string): Promise<Player[]> {
  const baseUrl = resolveBaseUrl();
  const response = await fetch(`${baseUrl}/api/players?hsid=${encodeURIComponent(hsid)}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch players');
  }

  const data = await response.json();
  return data.players || [];
}

export default async function HomePage() {
  const hsid = getHsid();

  if (!hsid) {
    console.error('YAT_BASE_HSID is not configured');
    return (
      <SiteShell>
        <main className="container">
          <section className="hero">
            <div className="hero-grid">
              <div className="tagline">
                <span className="tag-grey">WHERE THEY</span>
                <span className="tag-bold">YAT?</span>
              </div>
            </div>
          </section>
          <div className="error-state">Missing YAT_BASE_HSID configuration.</div>
        </main>
      </SiteShell>
    );
  }

  let players: Player[] = [];
  let error: string | null = null;
  try {
    players = await fetchPlayers(hsid);
  } catch (err) {
    error = 'Failed to load players for this school.';
    console.error('Player fetch failed', err);
  }

  return (
    <SiteShell schoolName={`HSID ${hsid}`} locationText="Microsite" programText="Active Alumni">
      <main className="container">
        <section className="hero">
          <div className="hero-grid">
            <div className="tagline">
              <span className="tag-grey">WHERE THEY</span>
              <span className="tag-bold">YAT?</span>
              <div className="tag-duo hide-sm">
                <div className="tag-swap">
                  <span className="tag-grey">ACTIVE ALUMNI</span>
                  <span className="tag-bold">NEWS</span>
                </div>
                <div className="tag-swap">
                  <span className="tag-grey">NEXT-LEVEL</span>
                  <span className="tag-bold">ALL-TIME LIST</span>
                </div>
              </div>
            </div>
            <div className="crumbs">HOME &gt; WHERE THEY YAT?</div>
          </div>
        </section>

        <div className="hr-y" />

        {error ? (
          <div className="error-state">{error}</div>
        ) : players.length === 0 ? (
          <div className="empty-state">No players found yet for this school.</div>
        ) : (
          <PlayerGrid players={players} />
        )}
      </main>
    </SiteShell>
  );
}
