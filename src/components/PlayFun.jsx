import React, { useMemo } from 'react';

const PlayFun = () => {

   
    const styles = `
        :root {
            --dark-bg-start: #1E3A3A;
            --dark-bg-end: #142A2A;
            --card-bg: #24453A;
            --card-ring: #48BB78; /* Primary green */
            --title-color: #90EE90; /* Light green for titles */
            --text-light: #E5E7EB; /* Near white text */
            --text-secondary: #A0AEC0; /* Gray text */
            --pink-accent: #F687B3;
        }

        /* Base Body and Layout Styling */
        .page-container {
            min-height: 100vh;
            padding: 3rem; 
            color: var(--text-light);
            margin: 0;
            box-sizing: border-box; /* Good practice */
        }
        
        /* Header Styling */
        .header-container {
            margin-bottom: 2.5rem; 
            text-align: center;
        }
        .header-container h1 {
            font-size: 3rem; 
            font-weight: 800; 
            color: var(--title-color);
            margin-bottom: 0.5rem;
        }
        .header-container p {
            font-size: 1.125rem; 
            color: var(--text-secondary);
        }

        /* Feature Card Styling */
        .feature-card {
         backdrop-filter: blur(10px) saturate(1.3);
           -webkit-backdrop-filter: blur(10px) saturate(1.3);
            background-color: #ffffff4d;
            padding: 2.6rem 2.6rem 0rem; 
            border-radius: 0.75rem; 
            box-shadow: 0 0 15px rgba(186, 186, 186, 0.2); 
            transition: transform 0.2s, box-shadow 0.2s;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
        }
        .feature-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 25px rgba(154, 154, 154, 0.4);
        }
        .feature-card h2 {
            font-size: clamp(1rem, .9235rem + .3265vw, 1.25rem); 
            font-weight: 700; 
            margin-bottom: 0.25rem;
        }
        .feature-card p {
            font-size: 0.875rem; 
        }
        
        /* Icon Wrapper Styling */
        .icon-wrapper {
            width: 5rem; 
            height: 5rem; 
            background-color: rgba(107, 114, 128, 0.3); 
            border-radius: 9999px; 
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.125rem;
            margin-left: 1rem; 
            flex-shrink: 0;
            margin-bottom: 2.6rem;
        }
        
        /* Main Content wrapper for standard cards */
        .card-content-standard {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            height: 100%;
        }

        /* Placeholder for Screenshot (Tall cards) */
        .screenshot-placeholder {
            width: 100%;
            flex-grow: 1; 
            border-radius: 0.5rem; 
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem; 
            margin-top: 1rem;
            padding: 0rem 2rem;
        }
        
        .screenshot-placeholder span {
            padding: 1rem;
            text-align: center;
        }

        /* --- Custom CSS Grid Layout --- */
        .parent {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: repeat(5, auto);
            gap: 1.5rem; 
            margin: 0 auto;
            max-width: 1400px;
        }

        .div1 { grid-column: span 2 / span 2; }
        .div2 { grid-column: span 2 / span 2; grid-column-start: 3; }
        .div3 { grid-column: span 2 / span 2; grid-row: span 3 / span 3; grid-column-start: 5; }
        .div4 { grid-column: span 2 / span 2; grid-row-start: 2; }
        .div5 { grid-column: span 2 / span 2; grid-row: span 3 / span 3; grid-column-start: 3; grid-row-start: 2; }
        .div6 { grid-column: span 2 / span 2; grid-row: span 3 / span 3; grid-row-start: 3; }
        .div7 { grid-column: span 2 / span 2; grid-column-start: 5; grid-row-start: 4; }
        .div8 { grid-column: span 2 / span 2; grid-column-start: 5; grid-row-start: 5; }
        .div9 { grid-column: span 2 / span 2; grid-column-start: 3; grid-row-start: 5; }

        /* Ensure the tall cards look correct */
        .div3, .div5, .div6 {
            display: flex; 
            flex-direction: column;
        }

        /* Responsive Adjustments for Mobile (Default to 1 column) */
        @media (max-width: 640px) {
            .page-container {
                padding: 1rem;
            }
                 .feature-card {
                 padding:  1.5rem 1.5rem 0rem;
                 }
            /* Override the complex 6-column grid for small screens, making it a single column */
            .parent {
                grid-template-columns: 1fr;
                grid-template-rows: auto;
                gap: 1rem;
            }
            .parent > div {
                /* Reset all grid spans/starts to default flow */
                grid-column: auto;
                grid-row: auto;
            }
        }
    `;

    // Reusable Icon Components (Mimicking lucide-react structure and paths)

    // Lucide: ShoppingBag
    const ShoppingBag = ({ size = 24, style }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
    );

    // Lucide: Code
    const Code = ({ size = 24, style }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
            <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        </svg>
    );
    
    // Lucide: LineChart (Large icon for tall cards)
    const LineChartLarge = ({ size = 48, style }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
            <path d="M3 3v18h18"/><path d="m18 17-5-5-4 4-3-3"/>
        </svg>
    );

    // Lucide: Database
    const Database = ({ size = 24, style }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
            <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        </svg>
    );

    // Lucide: Zap (Lightning Bolt, Large icon for tall cards)
    const ZapLarge = ({ size = 48, style }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
    );

    // Lucide: CreditCard (Large icon for tall cards)
    const CreditCardLarge = ({ size = 48, style }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
    );

    // Lucide: BarChart2
    const BarChart2 = ({ size = 24, style }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
            <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
    );

    // Lucide: Puzzle
    const Puzzle = ({ size = 24, style }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
            <path d="M16 20a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h.01a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H5"/>
        </svg>
    );
    
    // Lucide: ArrowRightLeft (The exchange/migration icon)
    const ArrowRightLeft = ({ size = 24, style }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
            <path d="M8 3L4 7l4 4"/><path d="M20 7H4"/><path d="M16 21l4-4-4-4"/><path d="M4 17h16"/>
        </svg>
    );


    return (
        <div className="page-container">
            <style>{styles}</style>

            {/* 9-Box Grid Container */}
            <div className="parent">

                {/* Card 1: Custom Shopify Theme (div1) */}
                <div className="feature-card div1">
                    <div className="card-content-standard">
                        <div>
                            <h2>Custom Shopify Theme</h2>
                            <p>
                                Bespoke Dawn 2.0 theme built for speed and complex merchandising requirements.
                            </p>
                        </div>
                        <div className="icon-wrapper">
                            <ShoppingBag style={{ color: 'var(--title-color)' }} />
                        </div>
                    </div>
                </div>

                {/* Card 2: Headless E-commerce (div2) */}
                <div className="feature-card div2">
                    <div className="card-content-standard">
                        <div>
                            <h2>Headless E-commerce Setup</h2>
                            <p>
                                Next.js/React storefront consuming Shopify Storefront API for superior speed.
                            </p>
                        </div>
                        <div className="icon-wrapper" style={{ color: '#60A5FA' }}>
                            <Code style={{ color: '#60A5FA' }} />
                        </div>
                    </div>
                </div>

                {/* Card 3: CRO & A/B Testing (div3 - Tall/Spanning Card) */}
                <div className="feature-card div3">
                    <h2>Leder Hosens</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Full-cycle CRO implementation, including hypothesis generation and A/B test deployment.
                    </p>
                    <div className="screenshot-placeholder" style={{ color: '#FBBF24' }}>
                        <figure>
                            <img src='./lederhosens.png' />
                        </figure>
                    </div>
                </div>

                {/* Card 4: High-Volume Backend API (div4) */}
                <div className="feature-card div4">
                    <div className="card-content-standard">
                        <div>
                            <h2>High-Volume Backend API</h2>
                            <p>
                                Node.js/Firebase service layer for complex inventory or custom pricing logic.
                            </p>
                        </div>
                        <div className="icon-wrapper">
                            <Database style={{ color: 'var(--text-secondary)' }} />
                        </div>
                    </div>
                </div>

                {/* Card 5: Performance Optimization (div5 - Spanning Card) */}
                <div className="feature-card div5">
                    <h2>Infinitude</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Achieve core web vitals scores above 90+ through aggressive asset bundling and lazy loading.
                    </p>
                    <div className="screenshot-placeholder" style={{ color: '#F59E0B' }}>
                        <figure>
                            <img src='./infinitude.png' />
                        </figure>
                    </div>
                </div>

                {/* Card 6: Custom Checkout Logic (div6 - Spanning Card) */}
                <div className="feature-card div6">
                    <h2>IEssentials Hub</h2>
                    <p style={{ marginBottom: '1rem' }}>
                        Shopify Plus implementation of complex shipping rules, payment gateways, and order validations.
                    </p>
                    <div className="screenshot-placeholder" style={{ height: '331px' }}>
                        <figure>
                            <img src='./ii.PNG' />
                        </figure>
                    </div>
                </div>
                
                {/* Card 7: Full Stack Analytics Dashboard (div7) */}
                <div className="feature-card div7">
                    <div className="card-content-standard">
                        <div>
                            <h2>Full Stack Analytics</h2>
                            <p>
                                Real-time custom reporting dashboards built with React and Firestore for client KPIs.
                            </p>
                        </div>
                        <div className="icon-wrapper" style={{ color: '#67E8F9' }}>
                            <BarChart2 style={{ color: '#67E8F9' }} />
                        </div>
                    </div>
                </div>

                {/* Card 8: Third-Party App Integration (div8) */}
                <div className="feature-card div8">
                    <div className="card-content-standard">
                        <div>
                            <h2>App Integration Service</h2>
                            <p>
                                Seamless integration of Klaviyo, Gorgias, or custom loyalty program APIs.
                            </p>
                        </div>
                        <div className="icon-wrapper" style={{ color: '#C084FF' }}>
                            <Puzzle style={{ color: '#C084FF' }} />
                        </div>
                    </div>
                </div>

                {/* Card 9: E-commerce Migration Service (div9) */}
                <div className="feature-card div9">
                    <div className="card-content-standard">
                        <div>
                            <h2>E-commerce Migration</h2>
                            <p>
                                Safe and complete migration of product, customer, and order data to Shopify.
                            </p>
                        </div>
                        <div className="icon-wrapper" style={{ color: '#F97316' }}>
                            <ArrowRightLeft style={{ color: '#F97316' }} />
                        </div>
                    </div>
                </div>
                
            </div>

        </div>
    );
};

export default PlayFun;