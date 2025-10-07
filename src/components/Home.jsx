import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

// --- STYLE COMPONENT ---
// To keep everything in one file, we'll inject the CSS via a <style> tag.
const Style = () => (
  <style>{`
    /* Import Fonts */
    @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&family=Roboto:wght@400;500;700&display=swap');

    /* General Setup */
    :root {
        --brand-purple: #8b5cf6;
        --brand-pink: #ec4899;
        --brand-light-purple: #a78bfa;
        --background-dark: #050510;
        --background-med: rgba(15, 15, 30, 0.5);
        --text-muted: rgba(167, 139, 250, 0.6);
        --font-body: 'Roboto', sans-serif;
        --font-display: 'Fira Code', monospace;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        cursor: none !important;
    }

    html {
        scroll-behavior: smooth;
    }

    body {
        font-family: var(--font-body);
        background: var(--background-dark);
        color: white;
        overflow-x: hidden;
    }
    
    h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-display);
    }


    /* Custom Cursor */
    .custom-cursor {
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        mix-blend-mode: difference;
        transition: width 0.2s, height 0.2s;
    }

    .cursor-ring {
        border: 2px solid var(--brand-light-purple);
        border-radius: 50%;
        width: 24px;
        height: 24px;
        transition: all 0.2s;
    }

    .cursor-ring.hover {
        width: 48px;
        height: 48px;
        border-color: var(--brand-pink);
    }

    .cursor-dot {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 4px;
        height: 4px;
        background: var(--brand-light-purple);
        border-radius: 50%;
        transform: translate(-50%, -50%);
    }

    .cursor-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background: rgba(167, 139, 250, 0.2);
        width: 32px;
        height: 32px;
        transition: all 0.3s;
        animation: pulse 2s ease-in-out infinite;
    }

    .cursor-glow.hover {
        width: 64px;
        height: 64px;
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 0.4;
            transform: translate(-50%, -50%) scale(1);
        }
        50% {
            opacity: 0.1;
            transform: translate(-50%, -50%) scale(1.5);
        }
    }

    /* Header & Navigation */
    header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background: linear-gradient(180deg, rgba(5, 5, 16, 0.7), rgba(5, 5, 16, 0.4));
        backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(139, 92, 246, 0.2);
        padding: 5px 0;
    }

    .header-container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .logo-container {
        display: flex;
        align-items: center;
        gap: 15px;
        text-decoration: none;
    }

    .logo-icon {
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, var(--brand-purple), var(--brand-pink));
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        padding: 10px;
        transition: transform 0.3s;
    }
    .logo-container:hover .logo-icon {
        transform: rotate(-10deg) scale(1.1);
    }

    .logo-text h1 {
        font-size: 24px;
        font-weight: 600;
        background: linear-gradient(90deg, var(--brand-light-purple), var(--brand-pink));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    .logo-text p {
        font-size: 12px;
        color: var(--text-muted);
    }

    nav {
        display: flex;
        align-items: center;
        gap: 40px;
    }

    nav a {
        color: rgba(167, 139, 250, 0.8);
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        transition: color 0.3s;
        position: relative;
    }
    nav a:not(.cta-button)::after {
        content: '';
        position: absolute;
        width: 0;
        height: 1px;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--brand-light-purple);
        transition: all 0.3s;
    }
    nav a:hover:not(.cta-button)::after {
        width: 100%;
    }


    nav a:hover {
        color: var(--brand-light-purple);
    }

    .cta-button {
        padding: 10px 24px;
        background: linear-gradient(90deg, var(--brand-purple), var(--brand-pink));
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.3s;
    }

    .cta-button:hover {
        box-shadow: 0 10px 40px rgba(139, 92, 246, 0.5);
    }
    
    /* Mobile Menu */
    .mobile-menu-button {
        display: none;
        z-index: 1001;
        background: none;
        border: none;
    }
    
    .mobile-menu-button .line {
        width: 28px;
        height: 2px;
        background-color: var(--brand-light-purple);
        margin: 6px 0;
        transition: transform 0.3s, opacity 0.3s;
    }
    
    .mobile-nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(5, 5, 16, 0.95);
        backdrop-filter: blur(10px);
        z-index: 1000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 40px;
        transform: translateY(-100%);
        transition: transform 0.4s ease-in-out;
    }

    .mobile-nav.active {
        transform: translateY(0);
    }

    .mobile-nav a {
        font-size: 24px;
        color: var(--brand-light-purple);
        text-decoration: none;
    }
    
    .mobile-menu-button.active .line1 {
        transform: rotate(-45deg) translate(-7px, 6px);
    }
    .mobile-menu-button.active .line2 {
        opacity: 0;
    }
    .mobile-menu-button.active .line3 {
        transform: rotate(45deg) translate(-7px, -6px);
    }

    /* 3D Canvas */
    #canvas-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    /* Content & Page Transitions */
    .page-wrapper {
        transition: opacity 0.5s ease-in-out;
    }
    .page-wrapper.fading {
        opacity: 0;
    }

    .content-wrapper {
        position: relative;
        z-index: 10;
        pointer-events: none;
    }

    .section {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 120px 40px;
        pointer-events: auto;
    }

    /* Scroll Animations */
    .fade-in-up {
        opacity: 0;
        transform: translateY(40px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }

    .fade-in-up.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .fade-in-up.visible.delay-1 { transition-delay: 0.1s; }
    .fade-in-up.visible.delay-2 { transition-delay: 0.2s; }
    .fade-in-up.visible.delay-3 { transition-delay: 0.3s; }
    .fade-in-up.visible.delay-4 { transition-delay: 0.4s; }


    /* Hero Section */
    .hero-content {
        text-align: center;
        max-width: 1000px;
    }

    .badge {
        display: inline-block;
        padding: 8px 16px;
        background: rgba(139, 92, 246, 0.1);
        border: 1px solid rgba(139, 92, 246, 0.3);
        border-radius: 50px;
        margin-bottom: 30px;
    }

    .badge span {
        color: var(--brand-light-purple);
        font-size: 14px;
        font-weight: 500;
    }

    .hero-title {
        font-size: 80px;
        font-weight: 600;
        line-height: 1.2;
        margin-bottom: 30px;
    }
    
    .gradient-text-1 {
        background: linear-gradient(90deg, #a78bfa, #ec4899, #a78bfa);
        -webkit-background-clip: text; background-clip: text;
        color: transparent;
    }

    .gradient-text-2 {
        background: linear-gradient(90deg, #ec4899, #a78bfa, #60a5fa);
        -webkit-background-clip: text; background-clip: text;
        color: transparent;
    }

    .hero-description {
        font-size: 20px;
        color: rgba(167, 139, 250, 0.8);
        margin-bottom: 40px;
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
        line-height: 1.6;
    }

    .button-group {
        display: flex;
        gap: 20px;
        justify-content: center;
        flex-wrap: wrap;
    }

    .primary-button, .secondary-button {
        padding: 16px 32px;
        border-radius: 12px;
        font-size: 18px;
        font-weight: 500;
        transition: all 0.3s;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-family: var(--font-body);
    }
    
    .primary-button {
        background: linear-gradient(90deg, var(--brand-purple), var(--brand-pink));
        color: white;
        border: none;
        gap: 10px;
    }

    .primary-button:hover {
        box-shadow: 0 20px 60px rgba(139, 92, 246, 0.5);
        transform: translateY(-2px);
    }

    .secondary-button {
        background: transparent;
        color: var(--brand-light-purple);
        border: 2px solid rgba(139, 92, 246, 0.5);
    }

    .secondary-button:hover {
        background: rgba(139, 92, 246, 0.1);
    }

    /* Generic Card & Grid Styles */
    .glow-card {
        position: relative;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0));
        backdrop-filter: blur(20px);
        border-image-source: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
        border-image-slice: 1;
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        padding: 40px;
        transition: all 0.3s;
        overflow: hidden;
        z-index: 1;
        height: 100%;
    }

    .glow-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1));
        border-radius: 20px;
        filter: blur(40px);
        opacity: 0;
        transition: opacity 0.4s;
        z-index: -1;
    }

    .glow-card:hover::before {
        opacity: 1;
    }
    
    .particle-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
    }
    
    .section-header {
        text-align: center;
        margin-bottom: 80px;
    }

    .section-title {
        font-size: 56px;
        font-weight: 600;
        color: white;
        margin-bottom: 20px;
    }

    .section-subtitle {
        font-size: 20px;
        color: rgba(167, 139, 250, 0.8);
        max-width: 600px;
        margin: 0 auto;
    }

    /* Stats Section */
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 30px;
        max-width: 1200px;
        width: 100%;
    }

    .stat-card {
        text-align: center;
    }

    .stat-number {
        font-size: 48px;
        font-weight: 600;
        background: linear-gradient(90deg, var(--brand-light-purple), var(--brand-pink));
        -webkit-background-clip: text; background-clip: text;
        color: transparent;
        margin-bottom: 10px;
    }

    .stat-label {
        color: var(--text-muted);
        font-size: 14px;
        font-weight: 500;
    }
    
    /* Services Section */
    .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 40px;
        max-width: 1400px;
        width: 100%;
        align-items: stretch;
        perspective: 1000px;
    }

    .service-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: transform 0.3s, box-shadow 0.3s;
        cursor: pointer;
        transform-style: preserve-3d;
    }
    
    .service-card.rotating {
        animation: rotate-out 0.8s ease-in-out forwards;
    }

    @keyframes rotate-out {
      0% {
        transform: rotateY(0deg) scale(1);
        opacity: 1;
      }
      100% {
        transform: rotateY(360deg) scale(0.8);
        opacity: 0;
      }
    }


    .service-card:hover {
        transform: translateY(-10px);
        border-image-source: linear-gradient(135deg, var(--brand-light-purple), var(--brand-pink));
    }
    
    .service-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .service-icon {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--brand-purple), var(--brand-pink));
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        flex-shrink: 0;
    }
    .service-icon svg {
        width: 100%;
        height: 100%;
        stroke: white;
    }

    .service-title {
        font-size: 24px;
        font-weight: 600;
        margin-right: 20px;
    }

    .service-features {
      list-style-type: none;
      margin: 20px 0;
    }
    .service-features li {
      margin-bottom: 10px;
      color: rgba(167, 139, 250, 0.8);
      font-size: 15px;
      display: flex;
      align-items: center;
    }
    .service-features li::before {
      content: '✓';
      color: var(--brand-pink);
      margin-right: 10px;
      font-weight: bold;
    }
    
    .service-deliverables {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid rgba(139, 92, 246, 0.2);
    }
    .service-deliverables h4 {
        font-family: var(--font-display);
        font-size: 14px;
        color: var(--brand-light-purple);
        margin-bottom: 10px;
    }
    .service-deliverables p {
        font-size: 14px;
        line-height: 1.6;
        color: var(--text-muted);
    }


    .service-tech {
      font-size: 12px;
      color: var(--text-muted);
      border-top: 1px solid rgba(139, 92, 246, 0.2);
      padding-top: 15px;
      margin-top: auto; /* Pushes to the bottom */
      font-family: var(--font-display);
    }
    .service-tech strong {
      color: var(--brand-light-purple);
    }
    
    /* Service/Project Detail Page */
    .detail-page {
        position: relative;
        z-index: 20;
        width: 100%;
        min-height: 100vh;
        background: var(--background-dark);
        animation: page-fade-in 0.8s forwards;
        padding: 150px 40px 60px;
    }

    @keyframes page-fade-in {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .back-button {
      position: fixed;
      top: 100px;
      left: 40px;
      z-index: 30;
      background: var(--background-med);
      border: 1px solid rgba(139, 92, 246, 0.3);
      color: var(--brand-light-purple);
      padding: 10px 20px;
      border-radius: 50px;
      font-family: var(--font-body);
      font-weight: 500;
      transition: all 0.3s;
    }
    .back-button:hover {
        background: var(--brand-purple);
        color: white;
    }
    
    .detail-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    .detail-header {
        display: flex;
        align-items: center;
        gap: 30px;
        margin-bottom: 30px;
        padding-bottom: 30px;
        border-bottom: 1px solid rgba(139, 92, 246, 0.2);
    }
    
    .detail-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 30px;
    }
    .detail-tags span {
        background: var(--background-med);
        padding: 5px 12px;
        border-radius: 50px;
        font-family: var(--font-display);
        font-size: 12px;
    }
    
    .detail-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 40px;
    }
    .detail-description p {
        line-height: 1.8;
        color: rgba(255,255,255,0.8);
        margin-bottom: 20px;
    }
    .detail-sidebar h4 {
      margin-bottom: 15px;
      color: var(--brand-light-purple);
    }
    .detail-projects .project-item {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 15px;
    }
    .detail-projects img {
      width: 50px;
      height: 50px;
      border-radius: 8px;
      object-fit: cover;
    }
    
    .project-featured-image {
        width: 100%;
        height: 450px;
        border-radius: 20px;
        object-fit: cover;
        margin-bottom: 40px;
    }
    .project-timeline {
        display: flex;
        gap: 30px;
        margin-bottom: 30px;
        font-family: var(--font-display);
        color: var(--text-muted);
    }

    /* Work Section */
    .work-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      max-width: 1400px;
      width: 100%;
    }

    .work-card {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      height: 400px;
      transition: all 0.5s ease;
      background: #111;
      cursor: pointer;
    }
    
    .work-card:nth-child(1) { grid-column: 1 / 3; }
    .work-card:nth-child(2) { grid-column: 3 / 4; grid-row: 1 / 3; height: 810px;}
    .work-card:nth-child(3) { grid-column: 1 / 2; }
    .work-card:nth-child(4) { grid-column: 2 / 3; }

    .work-card-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    
    .work-card:hover .work-card-bg {
      transform: scale(1.1);
    }

    .work-card-video {
      position: absolute;
      top: 50%;
      left: 50%;
      min-width: 100%;
      min-height: 100%;
      width: auto;
      height: auto;
      transform: translate(-50%, -50%);
      z-index: 1;
      opacity: 0;
      transition: opacity 0.5s ease;
    }

    .work-card-overlay {
      position: absolute;
      inset: 0;
      z-index: 2;
      background: linear-gradient(to top, rgba(5, 5, 16, 0.9) 10%, rgba(5, 5, 16, 0.2) 70%, transparent 100%);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 30px;
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    
    .work-card:hover .work-card-overlay, .work-card:hover .work-card-video {
        opacity: 1;
    }

    .work-card-content {
      transform: translateY(20px);
      transition: transform 0.5s ease;
    }
    .work-card:hover .work-card-content {
      transform: translateY(0);
    }
    
    .work-card-title {
        font-size: 28px;
        margin-bottom: 10px;
        font-weight: 600;
        color: white;
    }
    .work-card-desc {
         color: rgba(255, 255, 255, 0.8);
         margin-bottom: 20px;
    }
    
    /* About Section */
    .about-container {
        display: flex;
        align-items: center;
        gap: 60px;
        max-width: 1200px;
    }
    .about-content, .about-image {
        flex: 1;
    }
    .about-image {
        background: linear-gradient(135deg, var(--brand-purple), var(--brand-pink));
        border-radius: 20px;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 100px;
        padding: 40px;
    }
    .about-image svg {
        width: 100px;
        height: 100px;
        stroke: white;
    }

    /* FAQ Section */
    .faq-container {
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        gap: 60px;
        max-width: 1400px;
        align-items: center;
    }
    .faq-accordion {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .faq-item {
        background: var(--background-med);
        border: 1px solid rgba(139, 92, 246, 0.3);
        border-radius: 12px;
        overflow: hidden;
    }
    .faq-question {
        width: 100%;
        text-align: left;
        padding: 20px;
        font-size: 18px;
        font-weight: 600;
        background: none;
        border: none;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: var(--font-display);
    }
    .faq-question::after {
        content: '+';
        font-size: 24px;
        color: var(--brand-light-purple);
        transition: transform 0.3s;
    }
    .faq-item.active .faq-question::after {
        transform: rotate(45deg);
    }
    .faq-answer {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.4s ease-out, padding 0.4s ease-out;
        color: rgba(167, 139, 250, 0.8);
        line-height: 1.6;
    }
    .faq-answer p {
        padding: 0 20px 20px;
    }
    .faq-trust-panel {
        position: relative;
        border-radius: 20px;
        overflow: hidden;
        height: 100%;
    }
    .faq-trust-panel img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .faq-trust-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(5, 5, 16, 0.9), rgba(5, 5, 16, 0.4));
        padding: 40px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        text-align: center;
    }
    .trust-indicators {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-bottom: 30px;
        flex-wrap: wrap;
    }
    .trust-indicator {
        background: var(--background-med);
        padding: 10px 15px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 500;
    }
    .faq-trust-overlay h3 {
        font-size: 24px;
        margin-bottom: 20px;
    }
    
    /* Contact Section */
    .contact-form {
        max-width: 700px;
        width: 100%;
    }
    .form-group {
        margin-bottom: 25px;
        position: relative;
    }
    .form-group svg {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-muted);
        transition: color 0.3s;
        pointer-events: none;
    }
    .form-group input, .form-group textarea, .form-group select {
        width: 100%;
        padding: 15px 15px 15px 50px;
        background: var(--background-med);
        border: 1px solid rgba(139, 92, 246, 0.3);
        border-radius: 12px;
        color: white;
        font-size: 16px;
        transition: border-color 0.3s;
        font-family: var(--font-body);
    }
    .form-group select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-image: url('data:image/svg+xml;utf8,<svg fill="rgb(167, 139, 250)" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
        background-repeat: no-repeat;
        background-position: right 15px top 50%;
    }
    .form-group textarea {
        padding: 15px;
        min-height: 150px;
        resize: vertical;
    }
    .form-group:focus-within svg {
         color: var(--brand-light-purple);
    }
    .form-group input:focus, .form-group textarea:focus, .form-group select:focus {
        outline: none;
        border-color: var(--brand-light-purple);
    }
    .form-group select option {
        background: var(--background-dark);
        color: white;
    }


    /* Footer */
    footer {
        position: relative;
        z-index: 10;
        background: rgba(5, 5, 16, 0.9);
        backdrop-filter: blur(20px);
        border-top: 1px solid rgba(139, 92, 246, 0.2);
        padding: 60px 40px 30px;
    }

    .footer-grid {
        max-width: 1400px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 40px;
        margin-bottom: 40px;
    }

    .footer-section h3 {
        color: var(--brand-light-purple);
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 20px;
        letter-spacing: 1px;
    }

    .footer-section ul {
        list-style: none;
    }
    .footer-section ul li {
        margin-bottom: 12px;
    }

    .footer-section a, .footer-bottom a {
        color: var(--text-muted);
        text-decoration: none;
        font-size: 14px;
        transition: color 0.3s;
    }

    .footer-section a:hover, .footer-bottom a:hover {
        color: var(--brand-light-purple);
    }
    
    .footer-bottom {
        max-width: 1400px;
        margin: 0 auto;
        padding-top: 30px;
        border-top: 1px solid rgba(139, 92, 246, 0.2);
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px;
    }

    .footer-bottom p {
        color: rgba(167, 139, 250, 0.4);
        font-size: 14px;
    }

    .footer-links {
        display: flex;
        gap: 30px;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
        .stats-grid {
            grid-template-columns: repeat(2, 1fr);
        }
        .about-container, .faq-container, .detail-grid, .work-grid {
            grid-template-columns: 1fr;
            flex-direction: column;
        }
        .work-card, .work-card:nth-child(2) {
          grid-column: auto;
          grid-row: auto;
          height: 400px;
        }
    }

    @media (max-width: 768px) {
        .hero-title {
            font-size: 48px;
        }
        .section-title {
            font-size: 40px;
        }
        header nav {
            display: none;
        }
        .mobile-menu-button {
            display: block;
        }
        .stats-grid {
            grid-template-columns: 1fr;
        }
        .footer-grid {
            grid-template-columns: 1fr;
        }
        .footer-bottom {
            flex-direction: column;
            text-align: center;
        }
         .detail-content {
          padding: 60px 30px;
        }
        .back-button {
            top: 90px;
            left: 20px;
        }
       .services-grid {
            grid-template-columns:100%;
        }
    }
  `}</style>
);

// --- SVG ICONS ---
const CartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>;
const CodeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;
const SmartphoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>;
const GamepadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12h.01M12 12h.01M18 12h.01M6 18h.01M12 18h.01M18 18h.01M12 6h.01"></path><path d="M17.3 5.3a2 2 0 0 0-2.6 0l-4 4a2 2 0 0 0 0 2.6l4 4a2 2 0 0 0 2.6 0l4-4a2 2 0 0 0 0-2.6z"></path><path d="M22 17v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2"></path></svg>;
const CloudIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>;
const ArrowUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>;
const GlobeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 2a10 10 0 0 0-10 10" /><path d="M12 2v20" /><path d="M2 12h20" /></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const BuildingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
const DollarSignIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;

// --- DATA ---
const servicesData = [
  { 
    id: 1,
    icon: <CartIcon />, 
    title: "E-commerce Solutions",
    features: ["Custom Theme Development", "App & API Integration", "Performance Optimization", "Subscription Models"],
    deliverables: "A high-converting, lightning-fast storefront with a seamless checkout experience and a scalable backend architecture.",
    tech: "Shopify, Magento, React, Vue",
    description: "We build world-class e-commerce experiences that drive sales and foster customer loyalty. From Shopify Plus for enterprise brands to custom headless solutions, our focus is on creating a frictionless path from discovery to purchase. We optimize every step of the funnel, ensuring your store is not only beautiful but also a powerful sales engine.",
    tags: ["Shopify Plus", "Headless Commerce", "Conversion Rate Optimization", "Subscriptions", "UX/UI Design"],
    projects: [
      { name: "Aura Cosmetics", img: "https://placehold.co/100x100/050510/a78bfa?text=Aura" },
      { name: "Urban Threads", img: "https://placehold.co/100x100/050510/a78bfa?text=Urban" }
    ],
    trust: ["Shopify Plus Partner"]
  },
  { 
    id: 2,
    icon: <CodeIcon />, 
    title: "Web Development",
    features: ["Headless CMS Architecture", "Progressive Web Apps (PWA)", "API Development & Integration", "Ongoing Maintenance"],
    deliverables: "Blazing-fast, secure, and SEO-friendly websites that provide an exceptional user experience across all devices.",
    tech: "React, Node.js, Vercel, AWS",
    description: "Our web development goes beyond aesthetics. We build high-performance, scalable, and secure web applications using modern frameworks. Whether it's a corporate site with a headless CMS like Contentful or a complex Progressive Web App, we deliver robust solutions that are a pleasure to use and easy to manage.",
    tags: ["React/Next.js", "Jamstack", "PWA", "API First", "Web Performance"],
    projects: [
      { name: "Quantum Analytics", img: "https://placehold.co/100x100/050510/ec4899?text=Quantum" },
      { name: "Nexus Media", img: "https://placehold.co/100x100/050510/ec4899?text=Nexus" }
    ],
    trust: ["Vercel Partner"]
  },
  { 
    id: 3,
    icon: <SmartphoneIcon />, 
    title: "App Development",
    features: ["Native iOS & Android", "Cross-Platform (React Native)", "UI/UX Prototyping & Design", "App Store Submission"],
    deliverables: "Beautiful, intuitive mobile applications that engage users and extend the reach of your brand right into their pockets.",
    tech: "Swift, Kotlin, React Native",
    description: "We design and develop mobile apps for iOS and Android that solve real-world problems and delight users. Our process is collaborative, starting with deep research and prototyping, and ending with a polished, market-ready product. We handle everything, including App Store submission and post-launch support.",
    tags: ["iOS (Swift)", "Android (Kotlin)", "React Native", "Firebase", "UX Research"],
    projects: [
      { name: "FitFlow AI", img: "https://placehold.co/100x100/050510/8b5cf6?text=Fit" },
      { name: "Connectly Social", img: "https://placehold.co/100x100/050510/8b5cf6?text=Connect" }
    ],
    trust: []
  },
   { 
    id: 4,
    icon: <GamepadIcon />, 
    title: "Game Development",
    features: ["Unity & Unreal Engine", "WebGL-based Web Games", "3D Modeling & Asset Creation", "Multiplayer Integration"],
    deliverables: "Immersive gaming experiences for web and mobile that captivate players and build dedicated communities.",
    tech: "Unity, C#, Blender, Photon",
    description: "We bring interactive worlds to life. Our team has experience building everything from casual mobile games to more complex multiplayer experiences for the web. We cover the full development cycle: concept, game design, asset creation, programming, and deployment.",
    tags: ["Unity3D", "WebGL", "Multiplayer", "Game Design", "3D Art"],
    projects: [
      { name: "Galaxy Raiders", img: "https://placehold.co/100x100/050510/a78bfa?text=Galaxy" },
      { name: "Pixel Dash", img: "https://placehold.co/100x100/050510/a78bfa?text=Pixel" }
    ],
    trust: []
  },
  { 
    id: 5,
    icon: <CloudIcon />, 
    title: "Cloud Solutions",
    features: ["AWS/GCP/Azure Infrastructure", "Serverless & Microservices", "CI/CD Automation", "Database Management"],
    deliverables: "Robust, scalable, and secure cloud infrastructure that ensures your application is always available and performs under pressure.",
    tech: "Docker, Kubernetes, Terraform",
    description: "A great application needs a solid foundation. We design and manage cloud infrastructure that is secure, scalable, and cost-effective. From setting up CI/CD pipelines for automated deployments to architecting serverless applications, we ensure your tech stack is ready for primetime.",
    tags: ["AWS", "Serverless", "DevOps", "CI/CD", "Infrastructure as Code"],
    projects: [
      { name: "DataStream Corp", img: "https://placehold.co/100x100/050510/ec4899?text=Data" },
      { name: "CloudLeap", img: "https://placehold.co/100x100/050510/ec4899?text=Cloud" }
    ],
    trust: ["AWS Certified"]
  },
  { 
    id: 6,
    icon: <ArrowUpIcon />, 
    title: "Growth Marketing",
    features: ["Technical SEO Audits", "Paid Social & SEM Campaigns", "Content Strategy", "CRO"],
    deliverables: "Data-driven marketing strategies that drive targeted traffic, increase conversions, and deliver a measurable return on investment.",
    tech: "Ahrefs, GA4, Figma, Hotjar",
    description: "Building is only half the battle. Our growth marketing team helps you find and convert your ideal customers. We combine technical SEO, data-driven paid advertising, and compelling content to create a holistic strategy that turns your digital product into a cornerstone of your business growth.",
    tags: ["SEO", "PPC", "Content Marketing", "Data Analytics", "A/B Testing"],
    projects: [
      { name: "Aura Cosmetics", img: "https://placehold.co/100x100/050510/8b5cf6?text=Aura" },
      { name: "Quantum Analytics", img: "https://placehold.co/100x100/050510/8b5cf6?text=Quantum" }
    ],
    trust: ["Google Partner", "Meta Business Partner"]
  },
];


// --- REUSABLE COMPONENTS ---

const AnimatedComponent = ({ children, delay = 0 }) => {
    const ref = useRef(null);
    useEffect(() => {
        const currentRef = ref.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const delayClass = delay > 0 ? `delay-${delay}` : '';

    return (
        <div ref={ref} className={`fade-in-up ${delayClass}`}>
            {children}
        </div>
    );
};

const GlowCard = ({ children, className = '', onClick = () => {} }) => {
    const cardRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        const canvas = canvasRef.current;
        if (!card || !canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        
        const resizeCanvas = () => {
            canvas.width = card.offsetWidth;
            canvas.height = card.offsetHeight;
        };
        
        const particleColors = ['#8b5cf6', '#a78bfa', '#ec4899', '#ffffff'];

        const createParticles = () => {
            particles = [];
            const particleCount = 50;
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: canvas.height + Math.random() * 50,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: -Math.random() * 1 - 0.5,
                    size: Math.random() * 2 + 1,
                    color: particleColors[Math.floor(Math.random() * particleColors.length)]
                });
            }
        };

        const animateParticles = () => {
            if(!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.y < 0 || p.x < 0 || p.x > canvas.width) {
                    p.x = Math.random() * canvas.width;
                    p.y = canvas.height + 10;
                }
                
                ctx.beginPath();
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.y / canvas.height;
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            animationFrameId = requestAnimationFrame(animateParticles);
        };
        
        const handleMouseEnter = () => {
            resizeCanvas();
            createParticles();
            animateParticles();
        };
        
        const handleMouseLeave = () => {
            cancelAnimationFrame(animationFrameId);
            if (canvas && ctx) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('resize', resizeCanvas);

        return () => {
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={cardRef} className={`glow-card ${className}`} onClick={onClick}>
            <canvas ref={canvasRef} className="particle-canvas"></canvas>
            {children}
        </div>
    );
};

const FAQItem = ({ question, answer, index, activeIndex, setActiveIndex }) => {
    const isActive = index === activeIndex;
    const contentRef = useRef(null);

    const toggleAccordion = () => {
        setActiveIndex(isActive ? null : index);
    };

    return (
        <div className={`faq-item ${isActive ? 'active' : ''}`}>
            <button className="faq-question" onClick={toggleAccordion}>
                {question}
            </button>
            <div
                ref={contentRef}
                style={{ maxHeight: isActive && contentRef.current ? `${contentRef.current.scrollHeight}px` : '0px' }}
                className="faq-answer"
            >
                <p>{answer}</p>
            </div>
        </div>
    );
};

const ServiceDetailPage = ({ service, onBack }) => {
  return (
    <div className="detail-page">
      <button className="back-button" onClick={onBack}>← Back to Services</button>
      <div className="detail-content">
        <div className="detail-header">
          <div className="service-icon">{service.icon}</div>
          <h2 className="section-title" style={{marginBottom: 0, fontSize: '48px'}}>{service.title}</h2>
        </div>
        <div className="detail-tags">
          {service.tags.map(tag => <span key={tag}>{tag}</span>)}
        </div>
        <div className="detail-grid">
          <div className="detail-description">
            <p>{service.description}</p>
            <h4>What We Deliver:</h4>
            <p>{service.deliverables}</p>
          </div>
          <div className="detail-sidebar">
            <h4>Related Projects</h4>
            <div className="detail-projects">
              {service.projects.map(p => (
                <div key={p.name} className="project-item">
                  <img src={p.img} alt={p.name} />
                  <span>{p.name}</span>
                </div>
              ))}
            </div>
            {service.trust.length > 0 && (
              <>
                <h4 style={{marginTop: '30px'}}>Trust Indicators</h4>
                <div className="trust-indicators" style={{justifyContent: 'flex-start', gap: '15px'}}>
                  {service.trust.map(t => <span key={t} className="trust-indicator">{t}</span>)}
                </div>
              </>
            )}
             <a href="#contact" onClick={onBack} className="primary-button" style={{width: '100%', marginTop: '30px'}}>Inquire Now</a>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- MAIN SECTIONS ---

const Header = ({ onMenuToggle, isMenuOpen }) => (
    <header>
        <div className="header-container">
            <a href="#home" className="logo-container">
                <div className="logo-icon"><CartIcon /></div>
                <div className="logo-text">
                    <h1>Ecom Buddy</h1>
                    <p>Your E-commerce Partner</p>
                </div>
            </a>
            <nav>
                <a href="#services">Services</a>
                <a href="#work">Work</a>
                <a href="#about">About</a>
                <a href="#faq">FAQ</a>
                <a href="#contact" className="cta-button">Get Started</a>
            </nav>
            <button className={`mobile-menu-button ${isMenuOpen ? 'active' : ''}`} onClick={onMenuToggle}>
                <div className="line line1"></div>
                <div className="line line2"></div>
                <div className="line line3"></div>
            </button>
        </div>
    </header>
);

const MobileNav = ({ isOpen, onLinkClick }) => (
    <div className={`mobile-nav ${isOpen ? 'active' : ''}`}>
        <a href="#services" onClick={onLinkClick}>Services</a>
        <a href="#work" onClick={onLinkClick}>Work</a>
        <a href="#about" onClick={onLinkClick}>About</a>
        <a href="#faq" onClick={onLinkClick}>FAQ</a>
        <a href="#contact" onClick={onLinkClick}>Contact</a>
    </div>
);

const ThreeCanvas = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x050510);
        scene.fog = new THREE.Fog(0x050510, 10, 50);

        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.set(0, 2, 8);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        currentMount.appendChild(renderer.domElement);

        const cubes = [];
        const structures = [
            { pos: [0, 0, 0], size: 2, rot: { x: 0.2, y: 0.3, z: 0 } },
            { pos: [-3, 1, -5], size: 1.5, rot: { x: 0, y: 0.5, z: 0.2 } },
            { pos: [4, 0, -10], size: 2.5, rot: { x: 0.3, y: 0, z: 0.1 } },
            { pos: [-2, 2, -15], size: 1.8, rot: { x: 0.1, y: 0.4, z: 0.3 } },
            { pos: [3, -1, -20], size: 2.2, rot: { x: 0.4, y: 0.2, z: 0 } },
            { pos: [0, 1, -25], size: 3, rot: { x: 0, y: 0.6, z: 0.2 } }
        ];

        structures.forEach(s => {
            const geometry = new THREE.BoxGeometry(s.size, s.size, s.size);
            const material = new THREE.MeshStandardMaterial({
                color: 0x1a1a2a,
                metalness: 0.1,
                roughness: 0.8,
            });
            const cube = new THREE.Mesh(geometry, material);
            
            const edges = new THREE.EdgesGeometry(geometry);
            const lineMaterial = new THREE.LineBasicMaterial({
                color: 0x8b5cf6,
                transparent: true,
                opacity: 0.3
            });
            const wireframe = new THREE.LineSegments(edges, lineMaterial);
            cube.add(wireframe);

            cube.position.set(s.pos[0], s.pos[1], s.pos[2]);
            cube.rotation.set(s.rot.x, s.rot.y, s.rot.z);
            scene.add(cube);
            cubes.push({ mesh: cube, initialRot: s.rot });
        });

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        const positions = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 50;
            positions[i + 1] = (Math.random() - 0.5) * 50;
            positions[i + 2] = (Math.random() - 0.5) * 50;
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particlesMaterial = new THREE.PointsMaterial({ color: 0x8b5cf6, size: 0.05, transparent: true, opacity: 0.6 });
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        const ambientLight = new THREE.AmbientLight(0x404040, 3);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0x8b5cf6, 2, 50);
        pointLight.position.set(0, 5, 5);
        scene.add(pointLight);

        const clock = new THREE.Clock();
        const mouse = { x: 0, y: 0 };
        let animationFrameId;

        const animate = () => {
            const elapsed = clock.getElapsedTime();
            cubes.forEach((cube, i) => {
                cube.mesh.rotation.x = cube.initialRot.x + Math.sin(elapsed + i) * 0.2;
                cube.mesh.rotation.y = cube.initialRot.y + elapsed * 0.3;
                cube.mesh.rotation.z = cube.initialRot.z + Math.cos(elapsed + i) * 0.15;
            });
            
            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
            
            const targetZ = 8 - scrollProgress * 45;
            const targetY = 2 + Math.sin(scrollProgress * Math.PI * 2) * 2;
            const targetX = Math.sin(scrollProgress * Math.PI) * 3;
            
            camera.position.z += (targetZ - camera.position.z) * 0.05;
            camera.position.y += (targetY - camera.position.y) * 0.05;
            camera.position.x += (targetX - camera.position.x) * 0.05;
            camera.rotation.y += (mouse.x * 0.1 - camera.rotation.y) * 0.05;
            camera.rotation.x += (-mouse.y * 0.1 - camera.rotation.x) * 0.05;
            particles.rotation.y = elapsed * 0.05;
            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        const handleMouseMove = (e) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
        };
        document.addEventListener('mousemove', handleMouseMove);

        const handleResize = () => {
            if (currentMount) {
              camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
              camera.updateProjectionMatrix();
              renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousemove', handleMouseMove);
            if (currentMount && renderer.domElement) {
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div id="canvas-container" ref={mountRef}></div>;
};

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const ringRef = useRef(null);
    const glowRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
            }
        };

        const handleMouseEnter = () => {
            if (ringRef.current && glowRef.current) {
                ringRef.current.classList.add('hover');
                glowRef.current.classList.add('hover');
            }
        };
        
        const handleMouseLeave = () => {
            if (ringRef.current && glowRef.current) {
                ringRef.current.classList.remove('hover');
                glowRef.current.classList.remove('hover');
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        
        // Use a mutation observer to re-apply listeners when the DOM changes
        const observer = new MutationObserver((mutations) => {
            const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .glow-card, .faq-question, .work-card');
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });


        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            observer.disconnect();
        };
    }, []);

    return (
        <div className="custom-cursor" ref={cursorRef}>
            <div className="cursor-ring" ref={ringRef}>
                <div className="cursor-dot"></div>
            </div>
            <div className="cursor-glow" ref={glowRef}></div>
        </div>
    );
};


// --- APP ---

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeFaq, setActiveFaq] = useState(0);
    const [view, setView] = useState('home');
    const [selectedService, setSelectedService] = useState(null);
    const [isPageFading, setIsPageFading] = useState(false);
    const [rotatingCardId, setRotatingCardId] = useState(null);

    const faqData = [
        { q: "What kind of e-commerce platforms do you work with?", a: "We're experts in Shopify, Shopify Plus, Magento, WooCommerce, and BigCommerce. We also build completely custom, headless e-commerce solutions for unique business needs." },
        { q: "How long does a typical project take?", a: "Project timelines vary based on complexity. A standard e-commerce build might take 8-12 weeks, while a complex app or game could take 6 months or more. We'll provide a detailed timeline after our initial discovery call." },
        { q: "Do you offer support after the project is launched?", a: "Absolutely! We offer a range of ongoing support and maintenance retainers to ensure your digital asset remains secure, up-to-date, and optimized for performance. We believe in long-term partnerships." },
        { q: "Can you help with marketing our new website/app?", a: "Yes! Our Growth Marketing team specializes in post-launch success. We can craft a tailored strategy involving SEO, paid advertising, and content marketing to drive traffic and achieve your business goals." }
    ];

    const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const handleServiceClick = (service, e) => {
        if (rotatingCardId) return; // Prevent clicking while animating
        
        setRotatingCardId(service.id);
        
        setTimeout(() => {
            setIsPageFading(true);
        }, 400); // Start fading page after rotation starts

        setTimeout(() => {
            setSelectedService(service);
            setView('serviceDetail');
            window.scrollTo(0, 0);
            setIsPageFading(false); // New page will fade in via CSS animation
            setRotatingCardId(null);
        }, 900); // 400ms delay + 500ms fade duration
    };

    const handleBackToHome = () => {
        if (isPageFading) return;
        setIsPageFading(true);
        
        setTimeout(() => {
            setView('home');
            setSelectedService(null);
            // Let the home page fade back in naturally
             setTimeout(() => setIsPageFading(false), 50);
        }, 500); // fade duration
    };

    return (
        <>
            <Style />
            <CustomCursor />
            <Header onMenuToggle={handleMenuToggle} isMenuOpen={isMenuOpen} />
            <MobileNav isOpen={isMenuOpen} onLinkClick={closeMenu} />
            <ThreeCanvas />
            
            <div className={`page-wrapper ${isPageFading ? 'fading' : ''}`}>
              {view === 'home' && (
                  <>
                      <main className="content-wrapper">
                          <section className="section" id="home">
                              <AnimatedComponent>
                                  <div className="hero-content">
                                      <div className="badge"><span>Architects of Digital Commerce</span></div>
                                      <h1 className="hero-title">
                                          <span className="gradient-text-1">Crafting E-commerce</span><br />
                                          <span style={{ color: 'white' }}>That Truly</span><br />
                                          <span className="gradient-text-2">Converts</span>
                                      </h1>
                                      <p className="hero-description">
                                          We are the architects behind high-growth online brands. We don’t just build stores; we engineer scalable e-commerce ecosystems that drive revenue and define markets.
                                      </p>
                                      <div className="button-group">
                                          <a href="#contact" className="primary-button">
                                              <span>Engineer Your Growth</span>
                                              <span>→</span>
                                          </a>
                                          <a href="#work" className="secondary-button">See Our Blueprints</a>
                                      </div>
                                  </div>
                              </AnimatedComponent>
                          </section>

                          <section className="section">
                              <div className="stats-grid">
                                  <AnimatedComponent delay={1}><GlowCard className="stat-card"><div className="stat-number">1,200+</div><div className="stat-label">Projects Delivered</div></GlowCard></AnimatedComponent>
                                  <AnimatedComponent delay={2}><GlowCard className="stat-card"><div className="stat-number">99%</div><div className="stat-label">Client Satisfaction</div></GlowCard></AnimatedComponent>
                                  <AnimatedComponent delay={3}><GlowCard className="stat-card"><div className="stat-number">$500M+</div><div className="stat-label">Client Revenue Generated</div></GlowCard></AnimatedComponent>
                                  <AnimatedComponent delay={4}><GlowCard className="stat-card"><div className="stat-number">150+</div><div className="stat-label">Global Team Members</div></GlowCard></AnimatedComponent>
                              </div>
                          </section>
                          
                          <section className="section" id="services">
                              <AnimatedComponent>
                                  <div className="section-header">
                                      <h2 className="section-title">Our Arsenal of Services</h2>
                                      <p className="section-subtitle">A complete suite of services to build, launch, and scale your digital venture to new heights.</p>
                                  </div>
                              </AnimatedComponent>
                               <div className="services-grid">
                                  {servicesData.map((service, index) => (
                                    <AnimatedComponent delay={(index % 3) + 1} key={service.id}>
                                         <GlowCard 
                                           className={`service-card ${rotatingCardId === service.id ? 'rotating' : ''}`}
                                           onClick={(e) => handleServiceClick(service, e)}
                                         >
                                            <div>
                                                <div className="service-card-header">
                                                    <h3 className="service-title">{service.title}</h3>
                                                    <div className="service-icon">{service.icon}</div>
                                                </div>
                                                <ul className="service-features">
                                                    {service.features.map(f => <li key={f}>{f}</li>)}
                                                </ul>
                                                <div className="service-deliverables">
                                                    <h4>What We Deliver:</h4>
                                                    <p>{service.deliverables}</p>
                                                </div>
                                            </div>
                                            <div className="service-tech">
                                                <strong>Key Tech:</strong> {service.tech}
                                            </div>
                                        </GlowCard>
                                    </AnimatedComponent>
                                  ))}
                              </div>
                          </section>
                          
                          <section className="section" id="work">
                              <AnimatedComponent>
                                   <div className="section-header">
                                      <h2 className="section-title">Forging Digital Triumphs</h2>
                                      <p className="section-subtitle">We don't just build projects; we craft success stories. Here's a glimpse of our impact.</p>
                                  </div>
                              </AnimatedComponent>
                              <div className="work-grid">
                                  <div className="work-card">
                                      <img src="https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Aura Cosmetics" className="work-card-bg" />
                                      <video className="work-card-video" src="https://assets.mixkit.co/videos/preview/mixkit-bright-orange-liquid-in-slow-motion-24200-large.mp4" autoPlay loop muted playsInline></video>
                                      <div className="work-card-overlay">
                                          <div className="work-card-content">
                                              <h3 className="work-card-title">Aura Cosmetics</h3>
                                              <p className="work-card-desc">Headless Shopify Plus store delivering a 200% conversion uplift and sub-second page loads.</p>
                                              <a href="#!" className="secondary-button" style={{padding: '10px 20px', fontSize: '14px'}}>View Case Study</a>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="work-card">
                                      <img src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Quantum Analytics" className="work-card-bg" />
                                      <video className="work-card-video" src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-scrolling-numbers-and-letters-30230-large.mp4" autoPlay loop muted playsInline></video>
                                      <div className="work-card-overlay">
                                          <div className="work-card-content">
                                              <h3 className="work-card-title">Quantum Analytics</h3>
                                              <p className="work-card-desc">A data-intensive SaaS platform built with Next.js for real-time insights and visualizations.</p>
                                              <a href="#!" className="secondary-button" style={{padding: '10px 20px', fontSize: '14px'}}>View Case Study</a>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="work-card">
                                      <img src="https://images.pexels.com/photos/205316/pexels-photo-205316.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="FitFlow AI" className="work-card-bg" />
                                      <video className="work-card-video" src="https://assets.mixkit.co/videos/preview/mixkit-man-runs-on-a-treadmill-4509-large.mp4" autoPlay loop muted playsInline></video>
                                      <div className="work-card-overlay">
                                          <div className="work-card-content">
                                              <h3 className="work-card-title">FitFlow AI</h3>
                                              <p className="work-card-desc">An AI-powered fitness coaching app on iOS and Android with personalized workout plans.</p>
                                              <a href="#!" className="secondary-button" style={{padding: '10px 20px', fontSize: '14px'}}>View Case Study</a>
                                          </div>
                                      </div>
                                  </div>
                                   <div className="work-card">
                                      <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Project Collab" className="work-card-bg" />
                                      <video className="work-card-video" src="https://assets.mixkit.co/videos/preview/mixkit-abstract-white-waves-in-circular-motion-24647-large.mp4" autoPlay loop muted playsInline></video>
                                      <div className="work-card-overlay">
                                          <div className="work-card-content">
                                              <h3 className="work-card-title">Project Collab</h3>
                                              <p className="work-card-desc">A real-time collaborative platform for enterprise teams, enhancing productivity by 40%.</p>
                                              <a href="#!" className="secondary-button" style={{padding: '10px 20px', fontSize: '14px'}}>View Case Study</a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </section>

                          <section className="section" id="about">
                              <div className="about-container">
                                  <AnimatedComponent delay={1}><div className="about-image"><GlobeIcon /></div></AnimatedComponent>
                                  <AnimatedComponent delay={2}>
                                      <div className="about-content">
                                          <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '30px' }}>We're Ecom Buddy</h2>
                                          <p className="hero-description" style={{ textAlign: 'left', marginLeft: 0, maxWidth: '100%' }}>
                                              Founded by e-commerce veterans, Ecom Buddy was born from a simple idea: to be the ultimate technical and strategic partner for ambitious brands. We fuse creativity with code, and data with design, to build digital experiences that don't just look good—they perform, convert, and scale.
                                          </p>
                                          <a href="#contact" className="secondary-button">Partner With Us</a>
                                      </div>
                                  </AnimatedComponent>
                              </div>
                          </section>
                          
                          <section className="section" id="faq">
                              <AnimatedComponent>
                                  <div className="section-header">
                                      <h2 className="section-title">Have Questions?</h2>
                                      <p className="section-subtitle">We have answers. Here are some of the most common questions we get from partners like you.</p>
                                  </div>
                              </AnimatedComponent>
                              <div className="faq-container">
                                  <AnimatedComponent delay={1}>
                                      <div className="faq-accordion">
                                          {faqData.map((faq, index) => (
                                              <FAQItem key={index} index={index} question={faq.q} answer={faq.a} activeIndex={activeFaq} setActiveIndex={setActiveFaq} />
                                          ))}
                                      </div>
                                  </AnimatedComponent>
                                  <AnimatedComponent delay={2}>
                                      <div className="faq-trust-panel">
                                          <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Abstract trust background" />
                                          <div className="faq-trust-overlay">
                                              <h3>Your Trusted Partner in Growth</h3>
                                              <div className="trust-indicators">
                                                  <span className="trust-indicator">Shopify Plus Partner</span>
                                                  <span className="trust-indicator">Meta Business Partner</span>
                                                  <span className="trust-indicator">Google Partner</span>
                                              </div>
                                              <a href="#contact" className="primary-button">Discuss Your Project</a>
                                          </div>
                                      </div>
                                  </AnimatedComponent>
                              </div>
                          </section>
                          
                          <section className="section" id="contact">
                              <AnimatedComponent>
                                  <div className="section-header">
                                      <h2 className="section-title">Let's Build Something Great</h2>
                                      <p className="section-subtitle">Ready to start? Drop us a line and one of our experts will get back to you within 24 hours.</p>
                                  </div>
                              </AnimatedComponent>
                              <AnimatedComponent delay={1}>
                                  <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                                      <div className="form-group"><UserIcon /><input type="text" placeholder="Your Name" required /></div>
                                      <div className="form-group"><MailIcon /><input type="email" placeholder="Your Email" required /></div>
                                      <div className="form-group"><BuildingIcon /><input type="text" placeholder="Company Name" /></div>
                                      <div className="form-group"><PhoneIcon /><input type="tel" placeholder="Phone Number" /></div>
                                      <div className="form-group">
                                          <DollarSignIcon />
                                          <select required defaultValue="">
                                              <option value="" disabled>Project Budget</option>
                                              <option value="<10k">Less than $10,000</option>
                                              <option value="10-25k">$10,000 - $25,000</option>
                                              <option value="25-50k">$25,000 - $50,000</option>
                                              <option value="50k+">$50,000+</option>
                                          </select>
                                      </div>
                                       <div className="form-group">
                                          <UsersIcon />
                                          <select required defaultValue="">
                                              <option value="" disabled>How did you find us?</option>
                                              <option value="google">Google Search</option>
                                              <option value="social">Social Media</option>
                                              <option value="referral">Referral</option>
                                              <option value="other">Other</option>
                                          </select>
                                      </div>
                                      <div className="form-group"><textarea placeholder="Tell us about your project..." required style={{padding: '15px'}}></textarea></div>
                                      <button type="submit" className="primary-button" style={{ width: '100%', justifyContent: 'center' }}>
                                          <span>Send Message</span><span>→</span>
                                      </button>
                                  </form>
                              </AnimatedComponent>
                          </section>
                      </main>
                      <Footer />
                  </>
                )}

                {view === 'serviceDetail' && (
                    <ServiceDetailPage service={selectedService} onBack={handleBackToHome} />
                )}
            </div>
        </>
    );
}

const Footer = () => (
  <footer>
      <div className="footer-grid">
          <div className="footer-section">
              <h3>ABOUT ECOM BUDDY</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6 }}>
                  Your dedicated partner in building and scaling successful digital ventures and e-commerce empires.
              </p>
          </div>
          <div className="footer-section">
              <h3>QUICK LINKS</h3>
              <ul>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#services">Services</a></li>
                  <li><a href="#contact">Contact</a></li>
              </ul>
          </div>
          <div className="footer-section">
              <h3>SERVICES</h3>
              <ul>
                  <li><a href="#services">E-commerce Solutions</a></li>
                  <li><a href="#services">Web Development</a></li>
                  <li><a href="#services">App Development</a></li>
                  <li><a href="#services">Game Development</a></li>
              </ul>
          </div>
          <div className="footer-section">
              <h3>CONNECT</h3>
              <ul>
                  <li><a href="#!">📍 Digital Realm, Sector 0x00</a></li>
                  <li><a href="mailto:contact@ecombuddy.agency">📧 contact@ecombuddy.agency</a></li>
                  <li><a href="#!">🌐 www.ecombuddy.agency</a></li>
              </ul>
          </div>
      </div>
      <div className="footer-bottom">
          <p>© 2025 Ecom Buddy. All rights reserved. | Built with React & Three.js</p>
          <div className="footer-links">
              <a href="#!">Privacy Policy</a>
              <a href="#!">Terms of Service</a>
              <a href="#!">Cookies</a>
          </div>
      </div>
  </footer>
);

