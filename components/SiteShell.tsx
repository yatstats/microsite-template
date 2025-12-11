'use client';

import React, { useMemo, useState } from 'react';

interface SiteShellProps {
  children: React.ReactNode;
  schoolName?: string;
  locationText?: string;
  programText?: string;
}

export default function SiteShell({
  children,
  schoolName = 'Your High School',
  locationText = 'Microsite',
  programText = 'Active Alumni',
}: SiteShellProps) {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  const bodyClass = useMemo(() => {
    return `${leftOpen ? 'drawer-left-open' : ''} ${rightOpen ? 'drawer-right-open' : ''}`.trim();
  }, [leftOpen, rightOpen]);

  return (
    <div className={bodyClass}>
      <header className="header">
        <div className="container topbar">
          <div className="left-icons">
            <button className="icon-btn" aria-label="Menu" onClick={() => setLeftOpen(true)}>
              <i className="ri-menu-line" />
            </button>
            <button className="icon-btn" aria-label="Account" onClick={() => setRightOpen(true)}>
              <i className="ri-user-3-line" />
            </button>
          </div>

          <nav className="topnav hide-sm" aria-label="Top Navigation">
            <span className="nav-pair">
              <span className="thin">WHERE THEY</span>
              <span className="bold">YAT?</span>
            </span>
            <span className="nav-pair">
              <span className="thin">ACTIVE ALUMNI</span>
              <span className="bold">NEWS</span>
            </span>
            <span className="nav-pair">
              <span className="thin">NEXT-LEVEL</span>
              <span className="bold">ALL-TIME LIST</span>
            </span>
            <span className="nav-pair">
              <span className="thin">THE</span>
              <span className="bold">CURRENT TEAM</span>
            </span>
            <span className="nav-pair">
              <span className="thin">MENTORSHIP</span>
              <span className="bold">MARKETPLACE</span>
            </span>
            <span className="nav-pair">
              <span className="thin">PARTNERSHIP</span>
              <span className="bold">PROGRAM</span>
            </span>
            <span className="nav-pair">
              <span className="thin">YAT?STATS</span>
              <span className="bold">FAQ’S</span>
            </span>
          </nav>

          <div className="wordmark-wrap">
            <span className="wordmark-text">YAT?STATS</span>
          </div>
        </div>

        <div className="hr-y" />

        <div className="container schoolrow">
          <div className="ham-logo" aria-hidden>
            <i className="ri-shield-star-line" />
          </div>
          <div className="schooltext">
            <div className="small">{locationText}</div>
            <div className="big1">{schoolName}</div>
            <div className="big2">{programText}</div>
          </div>
        </div>

        <div className="hr-y" />
      </header>

      <div className="drawer-mask" onClick={() => { setLeftOpen(false); setRightOpen(false); }} />

      <aside className="drawer" id="drawerLeft" aria-label="Left drawer">
        <h3>Player Profile Search</h3>
        <div className="pad" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p className="small" style={{ margin: 0, color: 'var(--muted)' }}>
            Search opens when player data is loaded.
          </p>
          <p style={{ opacity: 0.7, margin: 0, fontSize: 12 }}>Powered by live roster data.</p>
        </div>
        <button className="icon-btn close-btn" onClick={() => setLeftOpen(false)}>
          <i className="ri-close-line" />
        </button>
      </aside>

      <aside className="drawer drawer-right" id="drawerRight" aria-label="Filters drawer">
        <h3>Filters</h3>
        <div className="pad">
          <p style={{ margin: 0, color: 'var(--muted)' }}>Filters will be wired to live data.</p>
        </div>
        <button className="icon-btn close-btn" onClick={() => setRightOpen(false)}>
          <i className="ri-close-line" />
        </button>
      </aside>

      {children}
    </div>
  );
}
