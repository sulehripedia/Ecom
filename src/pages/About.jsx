import './About.css';
const About = () => {
 return (
    <>
    <div className="about-header-div">
     <h1 className="about-heading">I'm Sáád.</h1>    
    </div>
    <div className='grid-about'>
        <div className='grid-img'>
            <figure className='figure-img'>        
          <img src='./saad.jpeg' />
           </figure>
        </div>
        <div className='grid-content'>
       <h2 className="about-h2">
I'm a Full-Stack Developer Working remotely from Lahore, Pakistan.
       </h2>
       <p className='p-gap'>
       Over the past 5 years, I've worked across multiple areas of digital development—full-stack engineering, Shopify development, CRO, UX-focused builds, custom section design, and performance optimization. I'm proud to have worked in roles that pushed me to problem-solve, think creatively, and wear many hats.
       </p>
       <p className='p-gap'>These days, I help brands ship fast, scalable digital experiences built with purpose. Whether I'm architecting a custom Shopify setup, improving conversions, or engineering a product end-to-end, my goal is always the same: build with clarity, precision, and craftsmanship.</p>
        </div>
    </div>
     <div class="timeline-container">
        
        <div class="card step-5">
            <div class="info">
                <h3>DreamGrowth HQ</h3>
                <span>Landing Page Developer</span>
            </div>
            <div class="year">22~</div>
        </div>

        <div class="card step-4">
            <div class="info">
                <h3>Nordblooms</h3>
                <span>Shopify developer & CRO Expert</span>
            </div>
            <div class="year">15–23</div>
        </div>

        <div class="card step-3">
            <div class="info">
                <h3>Freelance</h3>
                <span>Full-Stack Developer</span>
            </div>
            <div class="year">12~</div>
        </div>

        <div class="card step-2">
            <div class="info">
                <h3>Dotfusion</h3>
                <span>Design / Dev</span>
            </div>
            <div class="year">10–14</div>
        </div>

        <div class="card step-1">
            <div class="info">
                <h3>Astrapi Technologies</h3>
                <span>CSR - Closer</span>
            </div>
            <div class="year">7–10</div>
        </div>

    </div>
    <div className='about-grid-2'>
        <h2 className='about-h2 about-h2-more'>
            Let’s collaborate if you value clarity, performance, sustainability or purposeful design.
        </h2>
        </div>
        <div className='about-grid-2'>
        <p className='about-p-more p-gap'>I believe every product we create should genuinely serve the people who use it. My work is rooted in curiosity, continuous improvement, and a commitment to leaving things better than I found them. If you share those goals, I’d love to connect.</p>
    </div>
    <div className='phil-con'>
      <div class="philosophy-container">
        
        <div class="philosophy-grid">

            <div class="point">
                <p class="point-number">01</p>
                <h2 class="point-title">Make It Real</h2>
                <p class="point-description">
                    I sketch wireframes and make prototypes. Talking through tactile designs existing in the browser is worth its weight. Design tools only carry you so far; the rest should be realized with a link my team can rally around.
                </p>
            </div>

            <div class="point">
                <p class="point-number">02</p>
                <h2 class="point-title">Collaborate</h2>
                <p class="point-description">
                    Good design is not created in a vacuum but rather in a shared space. It must be facilitated and iterated upon as a team. I aim to include stakeholders in my design process and create a collaborative environment that welcomes and encourages feedback.
                </p>
            </div>

            <div class="point">
                <p class="point-number">03</p>
                <h2 class="point-title">Accessible FTW</h2>
                <p class="point-description">
                    I aim to make everything I design accessible to all for one main reason: it is the right thing to do. Accessible products benefit the many, not the few.
                </p>
            </div>

            <div class="point">
                <p class="point-number">04</p>
                <h2 class="point-title">Keep Experimenting</h2>
                <p class="point-description">
                    Everything I create is subject to change and experimentation. Not everything will work, but it is worth trying and learning from what does not.
                </p>
            </div>

            <div class="point">
                <p class="point-number">05</p>
                <h2 class="point-title">Intentional Design</h2>
                <p class="point-description">
                    Every component, detail, and line of code should have intention behind it. Craftsmanship builds trust, and deliberate design ensures a superior and predictable user experience.
                </p>
            </div>

            <div class="point">
                <p class="point-number">06</p>
                <h2 class="point-title">Loved by Ecommerce</h2>
                <p class="point-description">
                    As a specialist Shopify Developer, I focus on optimizing conversion and leveraging the platform's full potential. My builds are scalable, maintainable, and engineered specifically for high growth and merchant success.
               </p>
            </div>
        </div>
    </div>
    </div>
    <div className='ppp about-p-main'>
        <p className='ppp p-gap'>Before I became a full-stack developer, I was simply someone who loved making things work. During my Bachelor’s in Computer Science, I spent countless late nights building projects, breaking them, and rebuilding them—chasing the excitement of bringing ideas to life through code.</p>
<br /> <p className='ppp p-gap'>My Shopify journey started the same way: small experiments, custom sections, recreating app features just to see if I could. Those experiments grew into client work, real projects, and a deep focus on intentional, user-centered development.</p>
<br />
<p className='ppp p-gap'>Working with DreamGrowth HQ, Nordblooms, and Daran Holdings taught me that great products don’t happen by accident—they’re crafted with care, clarity, and purpose.</p>
<br />
<p className='ppp p-gap'>Today, I work remotely from Lahore, Pakistan, helping brands scale through thoughtful engineering and clean, reliable design. And I continue to learn, experiment, and push myself with every project.</p>
    </div>
    </>

  );
}

export default About;


