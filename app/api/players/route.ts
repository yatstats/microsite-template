import { NextResponse } from 'next/server';
import { getPlayersForHsid } from '@/lib/players';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const hsid = searchParams.get('hsid') || process.env.YAT_BASE_HSID;

  if (!hsid) {
    return NextResponse.json({ error: 'hsid is required' }, { status: 400 });
  }

  try {
    const players = await getPlayersForHsid(hsid);
    return NextResponse.json({ players });
  } catch (error) {
    console.error('Failed to fetch players', error);
    return NextResponse.json({ error: 'Failed to fetch players' }, { status: 500 });
  }
}
