// Footer.jsx
import { useState, useEffect } from 'react';
import './Footer.css';

export default function Footer() {
  const [isDark, setIsDark] = useState(true);
  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const maxPosition = 200; 

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      setPosition(maxPosition);
      document.body.classList.add('light-mode');
    } else {
      setIsDark(true);
      setPosition(0);
      document.body.classList.remove('light-mode');
    }
  }, []);

  const updateTheme = (newPosition, dark) => {
    if (newPosition > maxPosition / 2 && dark) {
      setIsDark(false);
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else if (newPosition <= maxPosition / 2 && !dark) {
      setIsDark(true);
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX - position);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX - position);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newPosition = Math.max(0, Math.min(maxPosition, e.clientX - startX));
    setPosition(newPosition);
    updateTheme(newPosition, isDark);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const newPosition = Math.max(0, Math.min(maxPosition, e.touches[0].clientX - startX));
    setPosition(newPosition);
    updateTheme(newPosition, isDark);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (position > maxPosition / 2) {
      setPosition(maxPosition);
      setIsDark(false);
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      setPosition(0);
      setIsDark(true);
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Snap to nearest position
    if (position > maxPosition / 2) {
      setPosition(maxPosition);
      setIsDark(false);
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      setPosition(0);
      setIsDark(true);
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <footer 
      className={`footer ${isDark ? 'footer-dark' : 'footer-light'}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-copyright">
            <p>© 2025 Muhammad Saad • Colophon</p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h3 className="footer-heading">Elsewhere</h3>
              <ul className="footer-list">
                <li><a href="#" className="footer-link">Github</a></li>
                <li><a href="#" className="footer-link">Testimonials</a></li>
                <li><a href="#" className="footer-link">CV</a></li>
                <li><a href="#" className="footer-link">LinkedIn</a></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="footer-column">
              <h3 className="footer-heading">Contact</h3>
              <ul className="footer-list">
                <li><a href="#" className="footer-link">Message</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Theme Toggle Slider */}
        <div className="toggle-container">
          <div className="toggle-timeline">
            {/* Markers */}
            <div className="toggle-markers">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={`toggle-marker ${i % 5 === 0 ? 'toggle-marker-tall' : ''}`}
                />
              ))}
            </div>

            {/* Toggle Button */}
            <button
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              className={`toggle-button ${isDark ? 'toggle-button-dark' : 'toggle-button-light'} ${
                isDragging ? 'toggle-button-dragging' : ''
              }`}
              style={{
                transform: `translateX(${position}px)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease-out',
              }}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              <svg
                className="toggle-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isDark ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}