import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import Threads from './Threads';

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
        border: 1px solid;
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
        top: 40px;
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
        display: flex;
        align-items: center;
        gap: 8px;
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
        cursor: pointer;
        transition: background .3s;
        border-radius: 8px;
        padding: 5px;
    }
    .detail-projects .project-item:hover {
        background: var(--background-med);
    }
    .detail-projects img {
        width: 50px;
        height: 50px;
        border-radius: 8px;
        object-fit: cover;
    }
    
    /* NEW PROJECT CARD STYLES */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 30px;
      margin-bottom: 40px;
      width: 100%;
      max-width: 1400px;
    }

    .project-card {
      background: rgba(20, 20, 40, 0.6);
      border-radius: 20px;
      overflow: hidden;
      border: 1px solid rgba(0, 240, 255, 0.2);
      cursor: pointer;
      transition: all 0.4s ease;
      backdrop-filter: blur(10px);
      position: relative;
    }

    .project-card:hover {
      transform: translateY(-10px) scale(1.03);
      box-shadow: 0 20px 50px rgba(0, 240, 255, 0.2);
    }

    .card-image-container {
      position: relative;
      width: 100%;
      height: 220px;
      overflow: hidden;
    }

    .card-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .project-card:hover .card-image {
      transform: scale(1.1);
    }

    .card-overlay {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(135deg, rgba(0, 240, 255, 0.3), rgba(255, 0, 255, 0.3));
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.4s ease;
      color: #fff;
    }
    .project-card:hover .card-overlay {
      opacity: 1;
    }

    .card-content {
      padding: 25px;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
      gap: 10px;
    }

    .card-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #00f0ff;
      margin: 0;
      flex: 1;
    }

    .card-category-badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.75rem;
      border: 1px solid;
      font-weight: 600;
      white-space: nowrap;
    }

    .card-subtitle {
      font-size: 0.95rem;
      color: #b0b0d0;
      margin-bottom: 15px;
      line-height: 1.5;
    }

    .card-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .card-tag {
      padding: 6px 12px;
      background: rgba(0, 255, 136, 0.1);
      border: 1px solid rgba(0, 255, 136, 0.3);
      border-radius: 15px;
      font-size: 0.8rem;
      color: #00ff88;
    }
    
    /* Project Detail Page Styles */
    .project-detail-view {
      min-height: 100vh;
      width: 100%;
      position: relative;
      background: linear-gradient(135deg, #0a0a14 0%, #1a0a28 100%);
      color: #fff;
      padding: 30px 20px;
      z-index: 50;
      overflow: auto;
    }
    
    .project-detail-content {
      max-width: 1200px;
      margin: 0 auto;
      padding-top: 80px;
    }

    .project-detail-header {
      position: relative;
      width: 100%;
      height: 500px;
      border-radius: 20px;
      overflow: hidden;
      margin-bottom: 50px;
      border: 2px solid rgba(0, 240, 255, 0.3);
      box-shadow: 0 0 40px rgba(0, 240, 255, 0.2);
    }
    .project-detail-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .project-detail-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 40px;
      background: linear-gradient(to top, rgba(10, 10, 20, 0.95) 0%, transparent 100%);
    }
    .project-detail-title {
      font-size: 3rem;
      font-weight: 800;
      background: linear-gradient(135deg, #00f0ff, #ff00ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 10px;
    }
    .project-detail-subtitle {
      font-size: 1.3rem;
      color: #b0b0d0;
      margin-bottom: 20px;
    }
    .project-detail-meta {
      display: flex;
      gap: 30px;
      font-size: 0.95rem;
      color: #00ff88;
      flex-wrap: wrap;
    }
    .project-detail-meta span {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .project-detail-body {
      background: rgba(20, 20, 40, 0.6);
      border-radius: 20px;
      padding: 50px;
      border: 1px solid rgba(0, 240, 255, 0.2);
      backdrop-filter: blur(10px);
    }
    .project-detail-section {
      margin-bottom: 40px;
    }
    .project-detail-section-title {
      font-size: 2rem;
      font-weight: 700;
      color: #00f0ff;
      margin-bottom: 20px;
      position: relative;
      padding-bottom: 10px;
      border-bottom: 2px solid rgba(0, 240, 255, 0.3);
    }
    .project-detail-text {
      font-size: 1.1rem;
      line-height: 1.8;
      color: #d0d0e0;
      margin-bottom: 15px;
    }
    .client-info {
      padding: 15px 20px;
      background: rgba(0, 240, 255, 0.05);
      border: 1px solid rgba(0, 240, 255, 0.3);
      border-radius: 10px;
      color: #00f0ff;
      font-size: 1rem;
      margin-top: 15px;
      display: inline-block;
    }
    .project-tags-container {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 40px;
    }
    .project-detail-tag {
      padding: 10px 20px;
      background: rgba(255, 0, 255, 0.1);
      border: 2px solid rgba(255, 0, 255, 0.4);
      border-radius: 20px;
      font-size: 0.95rem;
      color: #ff00ff;
      font-weight: 600;
    }
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 15px;
    }
    .feature-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 15px;
      background: rgba(0, 255, 136, 0.05);
      border: 1px solid rgba(0, 255, 136, 0.2);
      border-radius: 10px;
      color: #d0d0e0;
      font-size: 1rem;
    }
    .feature-item svg {
      color: #00ff88;
      flex-shrink: 0;
      margin-top: 2px;
    }
    .tech-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 15px;
    }
    .tech-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 18px;
      background: rgba(68, 136, 255, 0.1);
      border: 1px solid rgba(68, 136, 255, 0.3);
      border-radius: 10px;
      color: #4488ff;
      font-size: 0.95rem;
      font-weight: 600;
    }
    .metrics-section, .testimonial-section {
      margin-top: 50px;
    }
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 25px;
    }
    .metric-card {
      padding: 30px;
      background: linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(255, 0, 255, 0.1));
      border: 2px solid rgba(0, 240, 255, 0.3);
      border-radius: 15px;
      text-align: center;
      color: #00f0ff;
    }
    .metric-card h3 { margin: 10px 0; font-size: 1.2rem; }
    .metric-card p { font-size: 1.5rem; font-weight: bold; color: white; }
    
    .testimonial-section {
      padding: 40px;
      background: linear-gradient(135deg, rgba(255, 0, 255, 0.05), rgba(0, 240, 255, 0.05));
      border: 2px solid rgba(255, 0, 255, 0.3);
      border-radius: 15px;
    }
    .testimonial-blockquote {
      font-size: 1.2rem;
      font-style: italic;
      color: #d0d0e0;
      line-height: 1.8;
      margin: 0;
    }
    .testimonial-blockquote footer {
      margin-top: 20px;
      font-style: normal;
      font-weight: bold;
      color: var(--brand-light-purple);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
    .fade-in { animation: fadeIn 0.5s ease-out forwards; }
    .fade-out { animation: fadeOut 0.5s ease-in forwards; }

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

    /* Responsive Design */
    @media (max-width: 1024px) {
        .stats-grid {
            grid-template-columns: repeat(2, 1fr);
        }
        .about-container, .faq-container, .detail-grid {
            grid-template-columns: 1fr;
            flex-direction: column;
        }
    }

    @media (max-width: 768px) {
        .hero-title {
            font-size: 48px;
        }
        .section-title {
            font-size: 40px;
        }
        .stats-grid {
            grid-template-columns: 1fr;
        }
         .detail-content {
            padding: 60px 30px;
        }
        .back-button {
            top: 20px;
            left: 20px;
        }
        .project-detail-header {
          height: 300px;
        }
        .project-detail-title {
          font-size: 2rem;
        }
        .project-detail-body {
          padding: 30px;
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
const UsersIcon = ({size=20}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const ExternalLinkIcon = ({size=24}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const CalendarIcon = ({size=16}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const ClockIcon = ({size=16}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const AwardIcon = ({size=32}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 17 17 23 15.79 13.88"/></svg>;
const CheckCircleIcon = ({size=20}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const ArrowLeftIcon = ({size=24}) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;


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
      { id: 'aura', name: "Aura Cosmetics", img: "https://placehold.co/100x100/050510/a78bfa?text=Aura" },
      { id: 'urban', name: "Urban Threads", img: "https://placehold.co/100x100/050510/a78bfa?text=Urban" }
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
      { id: 'quantum', name: "Quantum Analytics", img: "https://placehold.co/100x100/050510/ec4899?text=Quantum" },
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
      { id: 'fitflow', name: "FitFlow AI", img: "https://placehold.co/100x100/050510/8b5cf6?text=Fit" },
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
    projects: [],
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
    projects: [],
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
    projects: [],
    trust: ["Google Partner", "Meta Business Partner"]
  },
];

const workData = [
    {
      id: 1,
      title: 'Cyber Racing Arena',
      category: 'game',
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800',
      subtitle: 'Multiplayer Racing Game with Real-time Physics',
      tags: ['Unity', '3D', 'Multiplayer', 'WebGL'],
      client: 'GameStudio Inc',
      duration: '8 months',
      team: '12 developers',
      completionDate: 'March 2024',
      description: 'An immersive multiplayer racing game featuring cutting-edge physics simulation and real-time competitive gameplay across multiple platforms.',
      challenges: 'Implementing low-latency multiplayer synchronization across different devices while maintaining 60fps gameplay and realistic physics calculations.',
      solution: 'Developed custom netcode using Unity\'s DOTS framework combined with client-side prediction and server reconciliation to achieve seamless multiplayer experience.',
      techStack: ['Unity 2023', 'C#', 'Photon Networking', 'DOTween', 'Addressables', 'FMOD Audio'],
      features: [
        'Real-time multiplayer for up to 16 players',
        'Advanced vehicle physics system',
        'Dynamic weather and day/night cycle',
        'Cross-platform matchmaking',
        'In-game voice chat integration',
        'Customizable vehicles with 200+ parts'
      ],
      metrics: {
        users: '500K+ active players',
        rating: '4.8/5 stars',
        performance: '60 FPS on mid-tier devices'
      },
      testimonial: 'The team delivered beyond our expectations. The game runs smoothly and our player retention increased by 300%.',
      testimonialAuthor: 'John Mitchell, CTO at GameStudio Inc'
    },
    {
      id: 2,
      title: 'HealthTrack Pro',
      category: 'app',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
      subtitle: 'AI-Powered Health Monitoring Mobile App',
      tags: ['React Native', 'AI/ML', 'Healthcare', 'IoT'],
      client: 'MediCare Solutions',
      duration: '6 months',
      team: '8 developers',
      completionDate: 'January 2025',
      description: 'A comprehensive health monitoring application that integrates with wearable devices to provide real-time health insights and AI-driven recommendations.',
      challenges: 'Creating a HIPAA-compliant platform that seamlessly integrates with multiple wearable device APIs while providing accurate health predictions.',
      solution: 'Built a secure microservices architecture with end-to-end encryption, implementing machine learning models for health trend analysis and anomaly detection.',
      techStack: ['React Native', 'TypeScript', 'TensorFlow Lite', 'AWS HealthLake', 'GraphQL', 'PostgreSQL'],
      features: [
        'Real-time vital signs monitoring',
        'AI-powered health insights and predictions',
        'Integration with 20+ wearable devices',
        'Telemedicine video consultation',
        'Personalized workout and diet plans',
        'Emergency alert system with location sharing'
      ],
      metrics: {
        users: '250K+ downloads',
        rating: '4.9/5 stars',
        performance: 'HIPAA & GDPR compliant'
      },
      testimonial: 'Revolutionary app that has transformed how our patients manage their health. The AI insights are remarkably accurate.',
      testimonialAuthor: 'Dr. Sarah Chen, Medical Director'
    },
    {
      id: 3,
      title: 'LuxeMarket',
      category: 'ecommerce',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
      subtitle: 'High-End Fashion E-Commerce Platform',
      tags: ['Next.js', 'Stripe', 'Headless CMS', 'PWA'],
      client: 'Luxe Fashion Group',
      duration: '5 months',
      team: '10 developers',
      completionDate: 'December 2024',
      description: 'A premium e-commerce platform offering seamless shopping experience with advanced personalization and AR try-on features.',
      challenges: 'Building a high-performance platform that handles 10,000+ concurrent users during flash sales while providing personalized recommendations.',
      solution: 'Implemented edge computing with CDN caching, created a custom recommendation engine, and utilized serverless functions for scalability.',
      techStack: ['Next.js 14', 'Stripe Payments', 'Contentful', 'Algolia Search', 'Redis', 'AWS Lambda'],
      features: [
        'AR virtual try-on for accessories',
        'AI-powered size recommendations',
        'Multi-currency and multi-language support',
        'Advanced product filtering and search',
        'One-click checkout with saved preferences',
        'Real-time inventory management'
      ],
      metrics: {
        users: '2M+ monthly visitors',
        rating: '94% customer satisfaction',
        performance: '99.9% uptime, <1s page load'
      },
      testimonial: 'Our conversion rate increased by 180% after the platform launch. The AR feature is a game-changer.',
      testimonialAuthor: 'Emma Rodriguez, CEO Luxe Fashion'
    },
    {
      id: 4,
      title: 'Artisan Marketplace',
      category: 'shopify',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800',
      subtitle: 'Custom Shopify Store for Handcrafted Goods',
      tags: ['Shopify Plus', 'Liquid', 'Custom Theme', 'Apps'],
      client: 'Artisan Collective',
      duration: '3 months',
      team: '6 developers',
      completionDate: 'November 2024',
      description: 'A beautifully crafted Shopify store with custom features for artisan sellers, including maker profiles and story-driven product pages.',
      challenges: 'Creating unique product storytelling experience while maintaining Shopify\'s robust e-commerce functionality and performance standards.',
      solution: 'Developed custom Shopify theme from scratch with advanced metafields, integrated custom apps for maker profiles and story sections.',
      techStack: ['Shopify Plus', 'Liquid', 'JavaScript', 'Shopify Polaris', 'GraphQL Admin API', 'Klaviyo'],
      features: [
        'Maker profile pages with storytelling',
        'Custom product bundling system',
        'Advanced subscription management',
        'Multi-vendor marketplace functionality',
        'Interactive product customization',
        'Integrated loyalty rewards program'
      ],
      metrics: {
        users: '50K+ monthly shoppers',
        rating: '4.7/5 merchant satisfaction',
        performance: '45% increase in AOV'
      },
      testimonial: 'The custom features perfectly showcase our artisans\' stories. Sales doubled in the first quarter.',
      testimonialAuthor: 'Michael Torres, Founder'
    },
];

const workCategories = [
    { id: 'game', name: 'Game Development', color: '#ff00ff' },
    { id: 'app', name: 'App Development', color: '#00ff88' },
    { id: 'ecommerce', name: 'E-Commerce', color: '#ffaa00' },
    { id: 'shopify', name: 'Shopify', color: '#95bf47' },
];

// --- REUSABLE COMPONENTS ---
<Threads/>
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

const ServiceDetailPage = ({ service, onBack, onProjectClick }) => {
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
              {service.projects.length > 0 ? service.projects.map(p => (
                <div key={p.name} className="project-item" onClick={(e) => onProjectClick(p.id, e)}>
                  <img src={p.img} alt={p.name} />
                  <span>{p.name}</span>
                </div>
              )) : <p>No projects yet.</p>}
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

const ProjectDetailPage = ({ project, onBack }) => {
    return (
      <div className="project-detail-view fade-in">
        <button onClick={onBack} className="back-button">
          <ArrowLeftIcon size={20} /> Back to Home
        </button>
        
        <div className="project-detail-content">
          <div className="project-detail-header">
            <img src={project.image} alt={project.title} className="project-detail-image" />
            <div className="project-detail-overlay">
              <h1 className="project-detail-title">{project.title}</h1>
              <p className="project-detail-subtitle">{project.subtitle}</p>
              <div className="project-detail-meta">
                <span><CalendarIcon /> {project.completionDate}</span>
                <span><UsersIcon size={16} /> {project.team}</span>
                <span><ClockIcon /> {project.duration}</span>
              </div>
            </div>
          </div>

          <div className="project-detail-body">
            <div className="project-detail-section">
              <h2 className="project-detail-section-title">Project Overview</h2>
              <p className="project-detail-text">{project.description}</p>
              <div className="client-info">
                <strong>Client:</strong> {project.client}
              </div>
            </div>

            <div className="project-tags-container">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="project-detail-tag">{tag}</span>
              ))}
            </div>

            <div className="project-detail-section">
              <h2 className="project-detail-section-title">Challenges</h2>
              <p className="project-detail-text">{project.challenges}</p>
            </div>

            <div className="project-detail-section">
              <h2 className="project-detail-section-title">Our Solution</h2>
              <p className="project-detail-text">{project.solution}</p>
            </div>

            <div className="project-detail-section">
              <h2 className="project-detail-section-title">Key Features</h2>
              <div className="feature-grid">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="feature-item">
                    <CheckCircleIcon size={20} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="project-detail-section">
              <h2 className="project-detail-section-title">Technology Stack</h2>
              <div className="tech-grid">
                {project.techStack.map((tech, idx) => (
                  <div key={idx} className="tech-item">
                    <CodeIcon />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="metrics-section">
              <h2 className="project-detail-section-title">Impact & Metrics</h2>
              <div className="metrics-grid">
                <div className="metric-card">
                  <UsersIcon size={32} />
                  <h3>User Base</h3>
                  <p>{project.metrics.users}</p>
                </div>
                <div className="metric-card">
                  <AwardIcon size={32} />
                  <h3>Rating</h3>
                  <p>{project.metrics.rating}</p>
                </div>
                <div className="metric-card">
                  <CheckCircleIcon size={32} />
                  <h3>Performance</h3>
                  <p>{project.metrics.performance}</p>
                </div>
              </div>
            </div>

            <div className="testimonial-section">
              <h2 className="project-detail-section-title">Client Testimonial</h2>
              <blockquote className="testimonial-blockquote">
                <p>"{project.testimonial}"</p>
                <footer>— {project.testimonialAuthor}</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    );
};


// --- MAIN SECTIONS ---

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
        
        const observer = new MutationObserver((mutations) => {
            const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .glow-card, .faq-question, .project-card');
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
    const [activeFaq, setActiveFaq] = useState(0);
    const [view, setView] = useState('home');
    const [selectedService, setSelectedService] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isPageFading, setIsPageFading] = useState(false);
    const [rotatingCardId, setRotatingCardId] = useState(null);

    const faqData = [
        { q: "What kind of e-commerce platforms do you work with?", a: "We're experts in Shopify, Shopify Plus, Magento, WooCommerce, and BigCommerce. We also build completely custom, headless e-commerce solutions for unique business needs." },
        { q: "How long does a typical project take?", a: "Project timelines vary based on complexity. A standard e-commerce build might take 8-12 weeks, while a complex app or game could take 6 months or more. We'll provide a detailed timeline after our initial discovery call." },
        { q: "Do you offer support after the project is launched?", a: "Absolutely! We offer a range of ongoing support and maintenance retainers to ensure your digital asset remains secure, up-to-date, and optimized for performance. We believe in long-term partnerships." },
        { q: "Can you help with marketing our new website/app?", a: "Yes! Our Growth Marketing team specializes in post-launch success. We can craft a tailored strategy involving SEO, paid advertising, and content marketing to drive traffic and achieve your business goals." }
    ];

    const handleServiceClick = (service) => {
        if (rotatingCardId) return;
        setRotatingCardId(service.id);
        
        setTimeout(() => setIsPageFading(true), 400);

        setTimeout(() => {
            setSelectedService(service);
            setView('serviceDetail');
            window.scrollTo(0, 0);
            setIsPageFading(false);
            setRotatingCardId(null);
        }, 900);
    };
    
    const handleProjectClick = (project) => {
        setIsPageFading(true);
        setTimeout(() => {
            setSelectedProject(project);
            setView('projectDetail');
            window.scrollTo(0, 0);
            setIsPageFading(false);
        }, 500);
    };

    const handleBackToHome = () => {
        if (isPageFading) return;
        setIsPageFading(true);
        
        setTimeout(() => {
            setView('home');
            setSelectedService(null);
            setSelectedProject(null);
             setTimeout(() => setIsPageFading(false), 50);
        }, 500);
    };

    return (
        <>
            <Style />
            <CustomCursor />
            {view === 'home' && <ThreeCanvas />}
            
            <div className={`page-wrapper ${isPageFading && view === 'home' ? 'fading' : ''}`}>
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
                                                onClick={() => handleServiceClick(service)}
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
                                <div className="projects-grid">
                                {workData.map(project => {
                                    const category = workCategories.find(c => c.id === project.category);
                                    return (
                                    <div
                                        key={project.id}
                                        className="project-card"
                                        onClick={() => handleProjectClick(project)}
                                    >
                                        <div className="card-image-container">
                                        <img src={project.image} alt={project.title} className="card-image" />
                                        <div className="card-overlay">
                                            <ExternalLinkIcon size={32} />
                                        </div>
                                        </div>
                                        <div className="card-content">
                                        <div className="card-header">
                                            <h3 className="card-title">{project.title}</h3>
                                            <span className="card-category-badge" style={{borderColor: category.color, color: category.color}}>
                                            {category.name}
                                            </span>
                                        </div>
                                        <p className="card-subtitle">{project.subtitle}</p>
                                        <div className="card-tags">
                                            {project.tags.slice(0, 3).map((tag, idx) => (
                                            <span key={idx} className="card-tag">{tag}</span>
                                            ))}
                                        </div>
                                        </div>
                                    </div>
                                    );
                                })}
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
                    </>
                )}

                {view === 'serviceDetail' && (
                    <ServiceDetailPage 
                        service={selectedService} 
                        onBack={handleBackToHome} 
                        onProjectClick={(projectId) => {
                            const project = workData.find(p => p.id.toString() === projectId.toString());
                            if (project) handleProjectClick(project);
                        }}
                    />
                )}
                
                {view === 'projectDetail' && (
                    <ProjectDetailPage project={selectedProject} onBack={handleBackToHome} />
                )}
            </div>
        </>
    );
}

