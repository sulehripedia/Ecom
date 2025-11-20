import React from 'react';
import Threads from './Threads';
import './HeroWithThreads.css';

// Main Hero Component with proper Threads integration
export default function HeroWithThreads({
  title = "Hi.  I'm Sáád.",
  subtitle = "A Developer.",
  description = "I'm passionate about creating performant, scalable, and user-centric online experiences.",
  showIcons = true
}) {
  return (
    <header className="hw-hero">
      {/* Threads background with proper mouse interaction */}
      <div className="hw-threads-bg">
        <Threads
          color={[0.7, 0.5, 1]}
          amplitude={1.2}
          distance={0.15}
          enableMouseInteraction={true}
        />
      </div>

      {/* Gradient overlays */}
      <div className="hw-overlay-gradient"></div>
      <div className="hw-overlay-vignette"></div>

      {/* Content wrapper */}
      <div className="hw-content-wrapper">
        <div className="hw-content-inner">
          {/* Main content */}
          <div className="hw-text-content">
            {/* Name with gradient effect */}
            <h1 className="hw-title">
              <h1 className="hw-title-gradient">{title}</h1><br />
              <h1 className="hw-title-gradient">{subtitle}</h1>
            </h1>
            
            {/* Subtitle and description */}
            <div className="hw-subtitle-wrapper">
              <p className="hw-description">{description}</p>
            </div>
          </div>

          {/* CTA buttons */}
          {/* <div className="hw-cta-container">
            <a href={ctaPrimary.href} className="hw-btn hw-btn-primary">
              <span className="hw-btn-content">
                {ctaPrimary.label}
                <svg className="hw-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              <div className="hw-btn-overlay"></div>
            </a>

            <a href={ctaSecondary.href} className="hw-btn hw-btn-secondary">
              <span className="hw-btn-content">
                {ctaSecondary.label}
                <svg className="hw-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
            </a>
          </div> */}

          {/* Feature badges */}
          {/* {showIcons && (
            <div className="hw-badges">
              <div className="hw-badge hw-badge-purple">
                <div className="hw-badge-icon-wrapper">
                  <svg className="hw-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
                  </svg>
                </div>
                <span className="hw-badge-text">Shopify Expert</span>
              </div>

              <div className="hw-badge hw-badge-blue">
                <div className="hw-badge-icon-wrapper">
                  <svg className="hw-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <span className="hw-badge-text">Headless Commerce</span>
              </div>

              <div className="hw-badge hw-badge-pink">
                <div className="hw-badge-icon-wrapper">
                  <svg className="hw-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <span className="hw-badge-text">Fast Delivery</span>
              </div>
            </div>
          )}*/}
        </div>
      </div> 

      {/* Scroll indicator */}
      {/* <a href="#work" className="hw-scroll-indicator" aria-label="Scroll to work">
        <div className="hw-scroll-content">
          <span className="hw-scroll-text">Scroll</span>
          <div className="hw-scroll-mouse">
            <div className="hw-scroll-dot"></div>
          </div>
        </div>
      </a> */}
    </header>
  );
}