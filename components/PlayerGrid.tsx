'use client';

import React from 'react';
import { Player } from '@/lib/types';
import PlayerCard from './PlayerCard';

export default function PlayerGrid({ players }: { players: Player[] }) {
  return (
    <section className="page-section">
      <div className="grid" aria-label="Active alumni grid">
        {players.map((p) => (
          <PlayerCard
            key={p.id || p.slug || `${p.display_name}-${p.grad_class}`}
            player={p}
          />
        ))}
      </div>
    </section>
  );
}
