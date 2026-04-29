import React from 'react';
import { FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaHeart } from 'react-icons/fa';

const About = () => {
    return (
        <section id="about" className="section" style={{ backgroundColor: 'transparent' }}>
            <style>
                {`
                  .bento-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                    margin-top: 40px;
                  }
                  .bento-item {
                    background: var(--bg);
                    border: 1px solid var(--border);
                    border-radius: 24px;
                    padding: 35px;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    z-index: 1;
                    display: flex;
                    flex-direction: column;
                  }
                  .bento-item::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: linear-gradient(135deg, rgba(26, 122, 74, 0.05) 0%, transparent 100%);
                    z-index: -1;
                    opacity: 0;
                    transition: opacity 0.4s ease;
                  }
                  .bento-item:hover {
                    transform: translateY(-8px);
                    border-color: var(--primary);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                  }
                  .bento-item:hover::before {
                    opacity: 1;
                  }

                  /* Grid Positions */
                  .box-bio { grid-column: span 2; grid-row: span 2; justify-content: center; }
                  .box-art { grid-column: span 1; grid-row: span 2; padding: 0; display: flex; align-items: center; justify-content: center; }
                  .box-loc { grid-column: span 1; }
                  .box-edu { grid-column: span 1; }
                  .box-exp { grid-column: span 1; }
                  .box-stats { grid-column: span 2; flex-direction: row; justify-content: space-around; align-items: center; padding: 25px; }
                  .box-int { grid-column: span 1; }

                  @media (max-width: 992px) {
                    .bento-grid { grid-template-columns: repeat(2, 1fr); }
                    .box-bio { grid-column: span 2; }
                    .box-art { grid-column: span 2; min-height: 350px; }
                    .box-loc, .box-edu, .box-exp, .box-int { grid-column: span 1; }
                    .box-stats { grid-column: span 2; }
                  }
                  @media (max-width: 768px) {
                    .bento-grid { grid-template-columns: 1fr; }
                    .box-bio, .box-art, .box-loc, .box-edu, .box-exp, .box-stats, .box-int { grid-column: span 1; }
                    .box-stats { flex-direction: column; gap: 30px; }
                  }

                  /* Bio Box Specifics */
                  .bio-greeting {
                    font-size: 1.1rem;
                    color: var(--primary);
                    font-weight: 600;
                    margin-bottom: 10px;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                  }
                  .bio-heading {
                    font-size: 2.2rem;
                    font-weight: 800;
                    color: var(--text);
                    margin-bottom: 20px;
                    line-height: 1.3;
                  }
                  .highlight {
                    color: var(--primary);
                    position: relative;
                    display: inline-block;
                  }
                  .bio-text {
                    font-size: 1.05rem;
                    color: var(--text-muted);
                    line-height: 1.8;
                    margin-bottom: 15px;
                  }

                  /* Info Card Specifics */
                  .info-icon-wrapper {
                    width: 55px;
                    height: 55px;
                    border-radius: 14px;
                    background: rgba(26, 122, 74, 0.1);
                    color: var(--primary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.6rem;
                    margin-bottom: 20px;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                  }
                  .bento-item:hover .info-icon-wrapper {
                    background: var(--primary);
                    color: #fff;
                    transform: scale(1.1) rotate(5deg);
                    box-shadow: 0 10px 20px rgba(26, 122, 74, 0.3);
                  }
                  .info-title {
                    font-size: 0.95rem;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 10px;
                    font-weight: 600;
                  }
                  .info-value {
                    font-size: 1.15rem;
                    color: var(--text);
                    font-weight: 700;
                    line-height: 1.5;
                  }

                  /* Stats Specifics */
                  .stat-block {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;
                  }
                  .stat-number {
                    font-size: 3rem;
                    font-weight: 900;
                    color: var(--text);
                    background: linear-gradient(135deg, var(--text) 0%, var(--primary) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    line-height: 1;
                  }
                  .stat-label {
                    font-size: 0.95rem;
                    color: var(--text-muted);
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                  }

                  /* Premium CSS Art - Floating Orb Radar */
                  .art-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    min-height: 300px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    perspective: 1200px;
                    overflow: hidden;
                    background: radial-gradient(circle at center, rgba(26, 122, 74, 0.05) 0%, transparent 70%);
                  }
                  .art-orb {
                    width: 110px;
                    height: 110px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, var(--primary), #115533);
                    box-shadow: 0 0 60px rgba(26, 122, 74, 0.6), inset -10px -10px 20px rgba(0,0,0,0.5), inset 10px 10px 20px rgba(255,255,255,0.4);
                    animation: floatOrb 4s ease-in-out infinite;
                    z-index: 5;
                    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                  }
                  .box-art:hover .art-orb {
                    transform: scale(1.2) translateY(-10px);
                    box-shadow: 0 0 100px rgba(26, 122, 74, 0.9), inset -10px -10px 20px rgba(0,0,0,0.5), inset 10px 10px 20px rgba(255,255,255,0.6);
                    background: linear-gradient(135deg, #22ff88, var(--primary));
                  }

                  .art-ring-1, .art-ring-2, .art-ring-3 {
                    position: absolute;
                    border-radius: 50%;
                    border: 2px dashed rgba(26, 122, 74, 0.3);
                    top: 50%; left: 50%;
                    transform-style: preserve-3d;
                    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                  }
                  
                  .art-ring-1 {
                    width: 190px; height: 190px;
                    margin-top: -95px; margin-left: -95px;
                    animation: spinRing 12s linear infinite;
                  }
                  .box-art:hover .art-ring-1 {
                    width: 220px; height: 220px;
                    margin-top: -110px; margin-left: -110px;
                    border-color: rgba(26, 122, 74, 0.8);
                    animation-duration: 6s;
                  }

                  .art-ring-2 {
                    width: 270px; height: 270px;
                    margin-top: -135px; margin-left: -135px;
                    border: 1px solid rgba(26, 122, 74, 0.2);
                    animation: spinRingReverse 18s linear infinite;
                  }
                  .box-art:hover .art-ring-2 {
                    width: 310px; height: 310px;
                    margin-top: -155px; margin-left: -155px;
                    border-color: rgba(26, 122, 74, 0.6);
                    animation-duration: 9s;
                  }

                  .art-ring-3 {
                    width: 350px; height: 350px;
                    margin-top: -175px; margin-left: -175px;
                    border: 2px dotted rgba(26, 122, 74, 0.15);
                    animation: spinRing 24s linear infinite;
                  }
                  .box-art:hover .art-ring-3 {
                    width: 400px; height: 400px;
                    margin-top: -200px; margin-left: -200px;
                    border-color: rgba(26, 122, 74, 0.4);
                    animation-duration: 12s;
                  }
                  @keyframes floatOrb {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                  }
                  @keyframes spinRing {
                    0% { transform: rotateX(65deg) rotateY(0deg) rotateZ(0deg); }
                    100% { transform: rotateX(65deg) rotateY(0deg) rotateZ(360deg); }
                  }
                  @keyframes spinRingReverse {
                    0% { transform: rotateX(75deg) rotateY(15deg) rotateZ(360deg); }
                    100% { transform: rotateX(75deg) rotateY(15deg) rotateZ(0deg); }
                  }
                  
                  /* Background floating elements in Bio box */
                  .bio-bg-element {
                    position: absolute;
                    border-radius: 50%;
                    background: var(--primary);
                    filter: blur(90px);
                    opacity: 0.12;
                    z-index: -1;
                  }
                  .bg-el-1 { width: 350px; height: 350px; top: -150px; right: -100px; }
                  .bg-el-2 { width: 250px; height: 250px; bottom: -80px; left: -80px; opacity: 0.08; }
                `}
            </style>

            <div className="container">
                {/* Section Title */}
                <div data-aos="zoom-in">
                    <div className="fancy-title-wrapper">
                        <h2 className="section-title title-primary">Pari<span>chaya</span></h2>
                        <h2 className="section-title title-secondary">About <span>Me</span></h2>
                    </div>
                    <div className="section-line"></div>
                    <p className="section-subtitle">Get to know me better</p>
                </div>

                <div className="bento-grid">
                    
                    {/* 1. Main Bio Box */}
                    <div className="bento-item box-bio" data-aos="fade-up" data-aos-delay="100">
                        <div className="bio-bg-element bg-el-1"></div>
                        <div className="bio-bg-element bg-el-2"></div>
                        
                        <p className="bio-greeting">Hello World!</p>
                        <h3 className="bio-heading">
                            I'm a <span className="highlight">Full Stack Developer</span> & <span className="highlight">QA Engineer</span>
                        </h3>
                        <p className="bio-text">
                            I am a passionate and detail-oriented Computer Science graduate from DRIEMS University, Odisha, currently based in Bangalore — the Silicon Valley of India. With a strong foundation in full stack development, I specialize in building robust, scalable web applications using Java, Spring Boot, and React.js.
                        </p>
                        <p className="bio-text">
                            Beyond development, I bring hands-on expertise in both Manual Testing and Automation Testing using Java Selenium, making me a versatile professional who understands software quality from both ends. I am certified in Full Stack Java Development from NareshIT and SDET from QSpiders, with real-world experience deploying cloud-based applications.
                        </p>
                        <p className="bio-text" style={{ marginBottom: 0 }}>
                            I thrive in Agile environments, love solving complex problems, and am driven by a desire to write clean, efficient code that makes a real difference. Currently seeking exciting opportunities where I can contribute, grow, and make an impact.
                        </p>
                    </div>

                    {/* 2. Premium CSS Art Box */}
                    <div className="bento-item box-art" data-aos="fade-left" data-aos-delay="200">
                        <div className="art-container">
                            <div className="art-orb"></div>
                            <div className="art-ring-1"></div>
                            <div className="art-ring-2"></div>
                            <div className="art-ring-3"></div>
                        </div>
                    </div>

                    {/* 3. Location Box */}
                    <div className="bento-item box-loc" data-aos="fade-up" data-aos-delay="300">
                        <div className="info-icon-wrapper"><FaMapMarkerAlt /></div>
                        <p className="info-title">Location</p>
                        <p className="info-value">Bangalore,<br/>Karnataka, India</p>
                    </div>

                    {/* 4. Education Box */}
                    <div className="bento-item box-edu" data-aos="fade-up" data-aos-delay="400">
                        <div className="info-icon-wrapper"><FaGraduationCap /></div>
                        <p className="info-title">Education</p>
                        <p className="info-value">B.Tech in CSE<br/>DRIEMS University</p>
                    </div>

                    {/* 5. Experience Box */}
                    <div className="bento-item box-exp" data-aos="fade-up" data-aos-delay="500">
                        <div className="info-icon-wrapper"><FaBriefcase /></div>
                        <p className="info-title">Experience</p>
                        <p className="info-value">Fresher<br/><span style={{ color: 'var(--primary)' }}>Open to Work</span></p>
                    </div>

                    {/* 6. Stats Box */}
                    <div className="bento-item box-stats" data-aos="fade-right" data-aos-delay="600">
                        <div className="stat-block">
                            <span className="stat-number">2+</span>
                            <span className="stat-label">Projects</span>
                        </div>
                        <div className="stat-block">
                            <span className="stat-number">3</span>
                            <span className="stat-label">Certifications</span>
                        </div>
                        <div className="stat-block">
                            <span className="stat-number">10+</span>
                            <span className="stat-label">Technologies</span>
                        </div>
                    </div>

                    {/* 7. Interests Box */}
                    <div className="bento-item box-int" data-aos="fade-left" data-aos-delay="700">
                        <div className="info-icon-wrapper"><FaHeart /></div>
                        <p className="info-title">Interests</p>
                        <p className="info-value">Coding, Testing,<br/>Problem Solving</p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;