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
    </>

  );
}

export default About;


