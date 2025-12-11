'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Player } from '@/lib/types';
import { playerProfilePath } from '@/lib/players';

interface Props {
  player: Player;
}

function rosterDots(player: Player) {
  const years = String(player.letter_years || '')
    .split(',')
    .map((y) => y.trim())
    .filter(Boolean)
    .map((y) => y.slice(-2));
  return years.map((y) => (
    <span key={y} className="dot" title={y}>
      {y}
    </span>
  ));
}

export default function PlayerCard({ player }: Props) {
  const [flipped, setFlipped] = useState(false);
  const router = useRouter();
  const name = player.display_name || [player.first, player.last].filter(Boolean).join(' ');
  const classOf = player.grad_class ? String(player.grad_class) : '';
  const bg = player.front_img || '/assets/img/default.png';
  const profileHref = playerProfilePath(player);

  const handleCardClick = () => {
    if (profileHref === '#') return;
    router.push(profileHref);
  };

  return (
    <article className={`card ${flipped ? 'is-flipped' : ''}`} aria-label={name}>
      <div className="card-inner">
        <div className="flip">
          <div
            className="face front"
            onDoubleClick={(e) => {
              e.preventDefault();
              setFlipped((v) => !v);
            }}
            onClick={(e) => {
              if (e.detail === 2) return;
              handleCardClick();
            }}
          >
            <div className="bg" style={{ backgroundImage: `url('${bg}')` }} />
            <div className="shade" />
            <div className="cap">
              <div className="name">{name}</div>
              <div className="meta-small">{player.team || ''}</div>
            </div>
            <div className="chips">
              {player.status ? <span className="chip">{player.status}</span> : null}
              {classOf ? <span className="chip">CLASS OF {classOf}</span> : null}
            </div>
            <div className="dots">{rosterDots(player)}</div>
          </div>
          <div
            className="face back"
            onDoubleClick={(e) => {
              e.preventDefault();
              setFlipped((v) => !v);
            }}
            onClick={(e) => {
              if (e.detail === 2) return;
              handleCardClick();
            }}
          >
            <div className="back-head">
              <strong style={{ font: "900 16px 'Bebas Neue'" }}>{name}</strong>
              <a className="icon-btn" href={profileHref} style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '10px', color: '#111' }}>
                <i className="ri-user-line" />&nbsp;Profile
              </a>
            </div>
            <div className="back-body">
              <p>
                <strong>Level:</strong> {player.level || '—'}
              </p>
              <p>
                <strong>Status:</strong> {player.status || '—'}
              </p>
              <p>
                <strong>Class of:</strong> {classOf || '—'}
              </p>
              <p>
                <strong>Team:</strong> {player.team || '—'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
