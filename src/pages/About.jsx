import './About.css';
const About = () => {
 return (
    <>
    <div className="about-header-div">
     <h1 className="about-heading">I'm Sáád.</h1>    
    </div>
    <div className='grid-about'>
        <div className='grid-img'>
         <img src='' />
        </div>
        <div className='grid-content'>
       <h2 className="about-h2">
I'm a Full-Stack Developer Working remotely from Lahore, Pakistan.
       </h2>
       <p>
       Over the past 5 years, I've worked across multiple areas of digital development—full-stack engineering, Shopify development, CRO, UX-focused builds, custom section design, and performance optimization. I'm proud to have worked in roles that pushed me to problem-solve, think creatively, and wear many hats.
       </p>
       <p className='p-gap'>These days, I focus on helping brands ship high-quality digital experiences that are fast, scalable, and built with intention. Whether I’m designing a custom Shopify architecture, improving conversions, or engineering a full product experience end-to-end, my goal remains the same: build with clarity, purpose, and craftsmanship.</p>
        </div>
    </div>
     <div class="timeline-container">
        
        <div class="card step-5">
            <div class="info">
                <h3>GiveDirectly</h3>
                <p>Senior Product Designer</p>
            </div>
            <div class="year">22~</div>
        </div>

        <div class="card step-4">
            <div class="info">
                <h3>Help Scout</h3>
                <p>Senior Product Designer</p>
            </div>
            <div class="year">15–23</div>
        </div>

        <div class="card step-3">
            <div class="info">
                <h3>Freelance</h3>
                <p>Design Consultant</p>
            </div>
            <div class="year">12~</div>
        </div>

        <div class="card step-2">
            <div class="info">
                <h3>Dotfusion</h3>
                <p>Design / Dev</p>
            </div>
            <div class="year">10–14</div>
        </div>

        <div class="card step-1">
            <div class="info">
                <h3>Cubic</h3>
                <p>Design / Dev</p>
            </div>
            <div class="year">7–10</div>
        </div>

    </div>
    </>
  );
}

export default About;


