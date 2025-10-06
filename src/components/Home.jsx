import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Home.css';
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

const GlowCard = ({ children, className = '' }) => {
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
            ctx.clearRect(0, 0, canvas.width, canvas.height);
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
        <div ref={cardRef} className={`glow-card ${className}`}>
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
                <a href="#contact">Contact</a>
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
            const edges = new THREE.EdgesGeometry(geometry);
            const material = new THREE.LineBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.8 });
            const cube = new THREE.LineSegments(edges, material);
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

        const ambientLight = new THREE.AmbientLight(0x404040, 2);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0x8b5cf6, 2, 50);
        pointLight.position.set(0, 5, 0);
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
                const scale = 1 + Math.sin(elapsed * 2 + i) * 0.05;
                cube.mesh.scale.set(scale, scale, scale);
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
        
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .glow-card, .faq-question');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
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

    const faqData = [
        { q: "What kind of e-commerce platforms do you work with?", a: "We're experts in Shopify, Shopify Plus, Magento, WooCommerce, and BigCommerce. We also build completely custom, headless e-commerce solutions for unique business needs." },
        { q: "How long does a typical project take?", a: "Project timelines vary based on complexity. A standard e-commerce build might take 8-12 weeks, while a complex app or game could take 6 months or more. We'll provide a detailed timeline after our initial discovery call." },
        { q: "Do you offer support after the project is launched?", a: "Absolutely! We offer a range of ongoing support and maintenance retainers to ensure your digital asset remains secure, up-to-date, and optimized for performance. We believe in long-term partnerships." },
        { q: "Can you help with marketing our new website/app?", a: "Yes! Our Growth Marketing team specializes in post-launch success. We can craft a tailored strategy involving SEO, paid advertising, and content marketing to drive traffic and achieve your business goals." }
    ];

    const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            <Style />
            <CustomCursor />
            <Header onMenuToggle={handleMenuToggle} isMenuOpen={isMenuOpen} />
            <MobileNav isOpen={isMenuOpen} onLinkClick={closeMenu} />
            <ThreeCanvas />

            <main className="content-wrapper">
                <section className="section" id="home">
                    <AnimatedComponent>
                        <div className="hero-content">
                            <div className="badge"><span>Your Growth Partner is Here</span></div>
                            <h1 className="hero-title">
                                <span className="gradient-text-1">Building E-commerce</span><br />
                                <span style={{ color: 'white' }}>Empires, One</span><br />
                                <span className="gradient-text-2">Click at a Time</span>
                            </h1>
                            <p className="hero-description">
                                We're not just developers; we're your strategic partners in carving out a dominant online presence. From bespoke storefronts to game-changing apps, we build solutions that sell.
                            </p>
                            <div className="button-group">
                                <a href="#contact" className="primary-button">
                                    <span>Start Your Project</span>
                                    <span>→</span>
                                </a>
                                <a href="#work" className="secondary-button">View Our Work</a>
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
                        <AnimatedComponent delay={1}>
                            <GlowCard className="service-card">
                                <div>
                                    <div className="service-card-header">
                                        <h3 className="service-title">E-commerce Solutions</h3>
                                        <div className="service-icon"><CartIcon /></div>
                                    </div>
                                    <ul className="service-features">
                                        <li>Custom Theme Development</li>
                                        <li>App & API Integration</li>
                                        <li>Performance Optimization</li>
                                        <li>Subscription Models</li>
                                    </ul>
                                    <div className="service-deliverables">
                                        <h4>What We Deliver:</h4>
                                        <p>A high-converting, lightning-fast storefront with a seamless checkout experience and a scalable backend architecture.</p>
                                    </div>
                                </div>
                                <div className="service-tech">
                                    <strong>Key Tech:</strong> Shopify, Magento, React, Vue
                                </div>
                            </GlowCard>
                        </AnimatedComponent>
                        <AnimatedComponent delay={2}>
                             <GlowCard className="service-card">
                                <div>
                                    <div className="service-card-header">
                                        <h3 className="service-title">Web Development</h3>
                                        <div className="service-icon"><CodeIcon /></div>
                                    </div>
                                    <ul className="service-features">
                                        <li>Headless CMS Architecture</li>
                                        <li>Progressive Web Apps (PWA)</li>
                                        <li>API Development & Integration</li>
                                        <li>Ongoing Maintenance & Support</li>
                                    </ul>
                                     <div className="service-deliverables">
                                        <h4>What We Deliver:</h4>
                                        <p>Blazing-fast, secure, and SEO-friendly websites that provide an exceptional user experience across all devices.</p>
                                    </div>
                                </div>
                                <div className="service-tech">
                                    <strong>Key Tech:</strong> React, Node.js, Vercel, AWS
                                </div>
                            </GlowCard>
                        </AnimatedComponent>
                        <AnimatedComponent delay={3}>
                             <GlowCard className="service-card">
                                <div>
                                    <div className="service-card-header">
                                        <h3 className="service-title">App Development</h3>
                                        <div className="service-icon"><SmartphoneIcon /></div>
                                    </div>
                                    <ul className="service-features">
                                        <li>Native iOS & Android</li>
                                        <li>Cross-Platform (React Native)</li>
                                        <li>UI/UX Prototyping & Design</li>
                                        <li>App Store Submission</li>
                                    </ul>
                                     <div className="service-deliverables">
                                        <h4>What We Deliver:</h4>
                                        <p>Beautiful, intuitive mobile applications that engage users and extend the reach of your brand right into their pockets.</p>
                                    </div>
                                </div>
                                <div className="service-tech">
                                    <strong>Key Tech:</strong> Swift, Kotlin, React Native
                                </div>
                            </GlowCard>
                        </AnimatedComponent>
                        <AnimatedComponent delay={1}>
                             <GlowCard className="service-card">
                                <div>
                                    <div className="service-card-header">
                                        <h3 className="service-title">Game Development</h3>
                                        <div className="service-icon"><GamepadIcon /></div>
                                    </div>
                                    <ul className="service-features">
                                        <li>Unity & Unreal Engine</li>
                                        <li>WebGL-based Web Games</li>
                                        <li>3D Modeling & Asset Creation</li>
                                        <li>Multiplayer Integration</li>
                                    </ul>
                                     <div className="service-deliverables">
                                        <h4>What We Deliver:</h4>
                                        <p>Immersive gaming experiences for web and mobile that captivate players and build dedicated communities.</p>
                                    </div>
                                </div>
                                <div className="service-tech">
                                    <strong>Key Tech:</strong> Unity, C#, Blender, Photon
                                </div>
                            </GlowCard>
                        </AnimatedComponent>
                        <AnimatedComponent delay={2}>
                            <GlowCard className="service-card">
                                <div>
                                    <div className="service-card-header">
                                        <h3 className="service-title">Cloud Solutions</h3>
                                        <div className="service-icon"><CloudIcon /></div>
                                    </div>
                                    <ul className="service-features">
                                        <li>AWS/GCP/Azure Infrastructure</li>
                                        <li>Serverless & Microservices</li>
                                        <li>CI/CD Automation Pipelines</li>
                                        <li>Database Management</li>
                                    </ul>
                                     <div className="service-deliverables">
                                        <h4>What We Deliver:</h4>
                                        <p>Robust, scalable, and secure cloud infrastructure that ensures your application is always available and performs under pressure.</p>
                                    </div>
                                </div>
                                <div className="service-tech">
                                    <strong>Key Tech:</strong> Docker, Kubernetes, Terraform
                                </div>
                            </GlowCard>
                        </AnimatedComponent>
                        <AnimatedComponent delay={3}>
                           <GlowCard className="service-card">
                                <div>
                                    <div className="service-card-header">
                                        <h3 className="service-title">Growth Marketing</h3>
                                        <div className="service-icon"><ArrowUpIcon /></div>
                                    </div>
                                    <ul className="service-features">
                                        <li>Technical SEO Audits</li>
                                        <li>Paid Social & SEM Campaigns</li>
                                        <li>Content Strategy & Creation</li>
                                        <li>Conversion Rate Optimization</li>
                                    </ul>
                                     <div className="service-deliverables">
                                        <h4>What We Deliver:</h4>
                                        <p>Data-driven marketing strategies that drive targeted traffic, increase conversions, and deliver a measurable return on investment.</p>
                                    </div>
                                </div>
                                <div className="service-tech">
                                    <strong>Tools:</strong> Ahrefs, GA4, Figma, Hotjar
                                </div>
                            </GlowCard>
                        </AnimatedComponent>
                    </div>
                </section>

                <section className="section" id="work">
                    <AnimatedComponent>
                         <div className="section-header">
                            <h2 className="section-title">Our Digital Footprint</h2>
                            <p className="section-subtitle">We don't just build projects; we build success stories. Here's a glimpse of our impact.</p>
                        </div>
                    </AnimatedComponent>
                    <div className="work-grid">
                         <AnimatedComponent delay={1}><GlowCard className="work-card" style={{ padding: 0 }}><img src="https://placehold.co/600x400/050510/a78bfa?text=Shopify+Store" alt="Shopify Store" /><div className="work-card-content"><h3 className="work-card-title">Aura Cosmetics</h3><p className="work-card-desc">Shopify Plus migration resulting in a 200% conversion uplift.</p></div></GlowCard></AnimatedComponent>
                         <AnimatedComponent delay={2}><GlowCard className="work-card" style={{ padding: 0 }}><img src="https://placehold.co/600x400/050510/ec4899?text=Mobile+Game" alt="Mobile Game" /><div className="work-card-content"><h3 className="work-card-title">Galaxy Raiders</h3><p className="work-card-desc">Mobile strategy game with 1M+ downloads in the first six months.</p></div></GlowCard></AnimatedComponent>
                         <AnimatedComponent delay={3}><GlowCard className="work-card" style={{ padding: 0 }}><img src="https://placehold.co/600x400/050510/8b5cf6?text=Fitness+App" alt="Fitness App" /><div className="work-card-content"><h3 className="work-card-title">FitFlow AI</h3><p className="work-card-desc">An AI-powered fitness app with personalized workout plans.</p></div></GlowCard></AnimatedComponent>
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
                                <img src="https://placehold.co/600x800/0f0f1e/8b5cf6?text=+" alt="Abstract trust background" />
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
                                <select required>
                                    <option value="" disabled selected>Project Budget</option>
                                    <option value="<10k">Less than $10,000</option>
                                    <option value="10-25k">$10,000 - $25,000</option>
                                    <option value="25-50k">$25,000 - $50,000</option>
                                    <option value="50k+">$50,000+</option>
                                </select>
                            </div>
                             <div className="form-group">
                                <UsersIcon />
                                <select required>
                                    <option value="" disabled selected>How did you find us?</option>
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
        </>
    );
}

