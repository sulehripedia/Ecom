import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Twitter, Linkedin, Github, Instagram, Facebook, Mail } from 'lucide-react';

const StaggeredMenu = ({
  position = 'right',
  colors = ['#B19EEF', '#5227FF'],
  items = [
    { label: 'Home', link: '/', ariaLabel: 'Navigate to Home' },
    { label: 'About', link: '/about', ariaLabel: 'Navigate to About' },
    { label: 'Work', link: '/work', ariaLabel: 'Navigate to Work' },
    { label: 'Contact', link: '/contact', ariaLabel: 'Navigate to Contact' },
    { label: 'Projects', link: '/projects', ariaLabel: 'Navigate to Project' }
  ],
  socialItems = [
    { label: 'Twitter', link: '#twitter', icon: 'twitter' },
    { label: 'LinkedIn', link: '#linkedin', icon: 'linkedin' },
    { label: 'GitHub', link: '#github', icon: 'github' }
  ],
  displaySocials = true,
  displayItemNumbering = true,
  className = 'NEXUS LTD',
  logoText = 'NEXUS LTD',
  menuButtonColor = '#fff',
  openMenuButtonColor = '#000',
  accentColor = '#5227FF',
  changeMenuColorOnOpen = true,
  isFixed = true,
  onMenuOpen,
  onMenuClose
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef(null);
  const overlayRef = useRef(null);
  const busyRef = useRef(false);

  const toggleMenu = useCallback(() => {
    if (busyRef.current) return;

    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      document.body.style.overflow = 'hidden';
    } else {
      onMenuClose?.();
      document.body.style.overflow = '';
    }
  }, [onMenuOpen, onMenuClose]);

  const handleItemClick = useCallback(() => {
    if (open) {
      toggleMenu();
    }
  }, [open, toggleMenu]);

  // This effect ensures that if the component unmounts, the body scroll is restored.
  useLayoutEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const getIcon = (iconName) => {
    const iconProps = { size: 20, strokeWidth: 2 };
    const icons = {
      twitter: <Twitter {...iconProps} />,
      linkedin: <Linkedin {...iconProps} />,
      github: <Github {...iconProps} />,
      instagram: <Instagram {...iconProps} />,
      facebook: <Facebook {...iconProps} />,
      mail: <Mail {...iconProps} />
    };
    return icons[iconName?.toLowerCase()] || null;
  };
  
  // This IIFE (Immediately Invoked Function Expression) calculates the layer colors.
  const layerColors = (() => {
    const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];
    let arr = [...raw];
    if (arr.length >= 3) {
      const mid = Math.floor(arr.length / 2);
      arr.splice(mid, 1);
    }
    return arr;
  })();

  return (
    <div
      className={`${className} staggered-menu-wrapper ${isFixed ? 'fixed-wrapper' : ''}`}
      style={{ '--sm-accent': accentColor }}
      data-position={position}
      data-open={open || undefined}
    >
      {/* Overlay for mobile */}
      <div
        ref={overlayRef}
        className={`sm-overlay ${open ? 'sm-overlay-active' : ''}`}
        onClick={toggleMenu}
        aria-hidden="true"
      />

      {/* Animated layers */}
      <div className="sm-prelayers" aria-hidden="true">
        {layerColors.map((c, i) => (
          <div
            key={i}
            className={`sm-prelayer ${open ? 'sm-prelayer-open' : ''}`}
            style={{
              background: c,
              transitionDelay: `${i * 50}ms`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="staggered-menu-header" aria-label="Main navigation header">
        <div className="sm-logo" aria-label="Logo">
          <a href="#home" onClick={handleItemClick} style={{textDecoration: 'none'}}>
            <span className="sm-logo-text">{logoText}</span>
          </a>
        </div>
        <button
          className="sm-toggle"
          style={{ color: open && changeMenuColorOnOpen ? openMenuButtonColor : menuButtonColor }}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
        >
          <span className="sm-toggle-text" aria-hidden="true">
            {open ? 'Close' : 'Menu'}
          </span>
          <span className={`sm-icon ${open ? 'sm-icon-open' : ''}`} aria-hidden="true">
            <span className="sm-icon-line" />
            <span className="sm-icon-line sm-icon-line-v" />
          </span>
        </button>
      </header>

      {/* Menu Panel */}
      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className={`staggered-menu-panel ${open ? 'sm-panel-open' : ''}`}
        aria-hidden={!open}
      >
        <div className="sm-panel-inner">
          <nav aria-label="Main navigation">
            <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
              {items && items.length ? (
                items.map((it, idx) => (
                  <li
                    className="sm-panel-itemWrap"
                    key={it.label + idx}
                    style={{
                      transitionDelay: open ? `${150 + idx * 80}ms` : '0ms'
                    }}
                  >
                    <a
                      className="sm-panel-item"
                      href={it.link}
                      aria-label={it.ariaLabel}
                      data-index={idx + 1}
                      onClick={handleItemClick}
                    >
                      <span className="sm-panel-itemLabel">{it.label}</span>
                    </a>
                  </li>
                ))
              ) : (
                <li className="sm-panel-itemWrap" aria-hidden="true">
                  <span className="sm-panel-item">
                    <span className="sm-panel-itemLabel">No items</span>
                  </span>
                </li>
              )}
            </ul>
          </nav>

          {displaySocials && socialItems && socialItems.length > 0 && (
            <div
              className="sm-socials"
              aria-label="Social links"
              style={{
                transitionDelay: open ? `${150 + items.length * 80 + 100}ms` : '0ms'
              }}
            >
              <h3 className="sm-socials-title">Connect</h3>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((s, i) => (
                  <li key={s.label + i} className="sm-socials-item">
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link"
                      onClick={handleItemClick}
                      aria-label={s.label}
                    >
                      {s.icon && <span className="sm-socials-icon">{getIcon(s.icon)}</span>}
                      <span className="sm-socials-label">{s.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .staggered-menu-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          z-index: 1000;
        }

        .staggered-menu-wrapper.fixed-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
        }
        
        /* === FIX START === */
        /*
         * The broad selector (' > * ') was removed.
         * Instead, we explicitly enable pointer events only on the header and panel.
         * The overlay manages its own pointer events based on its 'active' state.
        */
        .staggered-menu-wrapper.fixed-wrapper > .staggered-menu-header,
        .staggered-menu-wrapper.fixed-wrapper > .staggered-menu-panel {
          pointer-events: auto;
        }
        /* === FIX END === */

        .staggered-menu-header {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: clamp(1rem, 4vw, 2rem);
          background: transparent;
          /* pointer-events are enabled by the parent wrapper rule */
          z-index: 30;
        }

        .staggered-menu-header > * {
           pointer-events: auto; /* Children of header are interactive */
        }

        .sm-logo {
          display: flex;
          align-items: center;
          user-select: none;
          z-index: 31;
        }

        .sm-logo-text {
          font-size: clamp(1.25rem, 3vw, 1.75rem);
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.02em;
          transition: color 0.3s ease;
        }

        .staggered-menu-wrapper[data-open] .sm-logo-text {
          color: #000;
        }

        .sm-toggle {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: clamp(0.4rem, 1.5vw, 0.6rem);
          background: transparent;
          border: none;
          cursor: pointer;
          font-weight: 600;
          font-size: clamp(0.875rem, 2vw, 1rem);
          line-height: 1;
          padding: 0.75rem 1rem;
          border-radius: 2rem;
          transition: all 0.3s ease;
          z-index: 31;
          -webkit-tap-highlight-color: transparent;
        }

        .sm-toggle:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .sm-toggle:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: 4px;
        }

        .sm-toggle:active {
          transform: scale(0.95);
        }

        .sm-toggle-text {
          display: inline-block;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .sm-icon {
          position: relative;
          width: 16px;
          height: 16px;
          flex: 0 0 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sm-icon-open {
          transform: rotate(225deg);
        }

        .sm-icon-line {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 100%;
          height: 2px;
          background: currentColor;
          border-radius: 2px;
          transform: translate(-50%, -50%);
          transition: transform 0.3s ease;
        }

        .sm-icon-line-v {
          transform: translate(-50%, -50%) rotate(90deg);
        }

        .sm-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s ease;
          z-index: 9;
        }

        .sm-overlay-active {
          opacity: 1;
          background: rgba(0, 0, 0, 0.4);
          pointer-events: auto;
        }

        .sm-prelayers {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: min(420px, 90vw);
          pointer-events: none;
          z-index: 10;
        }

        [data-position='left'] .sm-prelayers {
          right: auto;
          left: 0;
        }

        .sm-prelayer {
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          width: 100%;
          transform: translateX(100%);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        [data-position='left'] .sm-prelayer {
          right: auto;
          left: 0;
          transform: translateX(-100%);
        }

        .sm-prelayer-open {
          transform: translateX(0);
        }

        .staggered-menu-panel {
          position: fixed;
          top: 0;
          right: 0;
          width: min(420px, 90vw);
          height: 100%;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          padding: clamp(5rem, 12vh, 7rem) clamp(1.5rem, 4vw, 2.5rem) clamp(2rem, 5vh, 3rem);
          overflow-y: auto;
          overflow-x: hidden;
          z-index: 20;
          transform: translateX(100%);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        [data-position='left'] .staggered-menu-panel {
          right: auto;
          left: 0;
          transform: translateX(-100%);
        }

        .sm-panel-open {
          transform: translateX(0);
        }

        .sm-panel-inner {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: clamp(1rem, 3vh, 1.5rem);
        }

        .sm-panel-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: clamp(0.5rem, 2vh, 1rem);
        }

        .sm-panel-itemWrap {
          position: relative;
          overflow: hidden;
          line-height: 1;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .staggered-menu-wrapper[data-open] .sm-panel-itemWrap {
          opacity: 1;
          transform: translateY(0);
        }

        .sm-panel-item {
          position: relative;
          color: #000;
          font-weight: 700;
          font-size: clamp(2rem, 8vw, 3.5rem);
          cursor: pointer;
          line-height: 1.1;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          transition: color 0.3s ease;
          display: inline-block;
          text-decoration: none;
          padding: clamp(0.25rem, 1vh, 0.5rem) 0;
          -webkit-tap-highlight-color: transparent;
        }

        .sm-panel-item:hover,
        .sm-panel-item:focus-visible {
          color: var(--sm-accent, #5227FF);
        }

        .sm-panel-item:focus-visible {
          outline: 2px solid var(--sm-accent, #5227FF);
          outline-offset: 4px;
        }

        .sm-panel-itemLabel {
          display: inline-block;
        }

        .sm-panel-list[data-numbering] {
          counter-reset: smItem;
        }

        .sm-panel-list[data-numbering] .sm-panel-item::after {
          counter-increment: smItem;
          content: counter(smItem, decimal-leading-zero);
          position: absolute;
          top: 0.2em;
          right: -1.5em;
          font-size: clamp(0.75rem, 2vw, 1rem);
          font-weight: 400;
          color: var(--sm-accent, #5227FF);
          letter-spacing: 0;
          pointer-events: none;
          user-select: none;
          opacity: 0.6;
        }

        .sm-socials {
          margin-top: auto;
          padding-top: clamp(1.5rem, 4vh, 2.5rem);
          display: flex;
          flex-direction: column;
          gap: clamp(0.75rem, 2vh, 1rem);
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .staggered-menu-wrapper[data-open] .sm-socials {
          opacity: 1;
          transform: translateY(0);
        }

        .sm-socials-title {
          margin: 0;
          font-size: clamp(0.875rem, 2vw, 1rem);
          font-weight: 600;
          color: var(--sm-accent, #5227FF);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .sm-socials-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: clamp(1rem, 3vw, 1.5rem);
          flex-wrap: wrap;
        }

        .sm-socials-link {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          font-weight: 600;
          color: #111;
          text-decoration: none;
          position: relative;
          padding: 0.5rem 0;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.3s ease, transform 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .sm-socials-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        .sm-socials-label {
          display: inline-block;
        }

        .sm-socials-link::after {
          content: '';
          position: absolute;
          bottom: 0.25rem;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--sm-accent, #5227FF);
          transition: width 0.3s ease;
        }

        .sm-socials-link:hover,
        .sm-socials-link:focus-visible {
          color: var(--sm-accent, #5227FF);
          transform: translateY(-2px);
        }

        .sm-socials-link:hover .sm-socials-icon,
        .sm-socials-link:focus-visible .sm-socials-icon {
          transform: scale(1.1);
        }

        .sm-socials-link:active {
          transform: translateY(0);
        }

        .sm-socials-link:hover::after,
        .sm-socials-link:focus-visible::after {
          width: 100%;
        }

        .sm-socials-link:focus-visible {
          outline: 2px solid var(--sm-accent, #5227FF);
          outline-offset: 4px;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .staggered-menu-panel {
            width: 100vw;
            padding: clamp(4rem, 10vh, 6rem) clamp(1.5rem, 5vw, 2rem) clamp(2rem, 5vh, 3rem);
          }

          .sm-prelayers {
            width: 100vw;
          }

          .sm-panel-item {
            font-size: clamp(2.5rem, 10vw, 4rem);
            letter-spacing: -0.03em;
          }

          .sm-toggle {
            padding: 0.625rem 0.875rem;
          }

          .sm-panel-list[data-numbering] .sm-panel-item::after {
            right: -1.2em;
            font-size: 0.875rem;
          }
        }

        /* Smooth scrolling for menu panel */
        .staggered-menu-panel {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
        }

        .staggered-menu-panel::-webkit-scrollbar {
          width: 6px;
        }

        .staggered-menu-panel::-webkit-scrollbar-track {
          background: transparent;
        }

        .staggered-menu-panel::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }

        .staggered-menu-panel::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
