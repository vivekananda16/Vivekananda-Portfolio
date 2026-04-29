import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import vivekananda from '../assets/vivekananda.webp';

const roles = ["Full Stack Developer", "QA Automation Engineer", "Tech Enthusiast", "Problem Solver"];

const Hero = () => {
  // Typewriter State
  const [currentRole, setCurrentRole] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter Effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = roles[roleIndex];
      if (!isDeleting) {
        setCurrentRole(fullText.substring(0, currentRole.length + 1));
        if (currentRole === fullText) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setCurrentRole(fullText.substring(0, currentRole.length - 1));
        if (currentRole === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 120);
    return () => clearTimeout(timeout);
  }, [currentRole, isDeleting, roleIndex]);

  // Global 3D Spatial Tilt Handler
  const [globalTilt, setGlobalTilt] = useState({ x: 0, y: 0 });

  const handleGlobalMouseMove = (e) => {
    // Only apply 3D tilt on desktop screens
    if (window.innerWidth < 768) return; 
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Calculate rotation (-15 to +15 degrees max)
    setGlobalTilt({ 
      x: -(y / rect.height) * 20, 
      y: (x / rect.width) * 20 
    });
  };
  
  const handleGlobalMouseLeave = () => {
    setGlobalTilt({ x: 0, y: 0 });
  };

  // Generate background stars
  const stars = Array.from({ length: 30 }).map((_, i) => ({
    top: Math.random() * 100 + '%',
    left: Math.random() * 100 + '%',
    animationDelay: Math.random() * 5 + 's',
    animationDuration: Math.random() * 10 + 10 + 's'
  }));

  return (
    <section 
      id="hero" 
      className="hero-section" 
      style={styles.section}
      onMouseMove={handleGlobalMouseMove}
      onMouseLeave={handleGlobalMouseLeave}
    >
      <style>
        {`
          .hero-section {
            position: relative;
            overflow: hidden;
            background: transparent;
            perspective: 2000px; /* Deep 3D Space */
          }
          
          /* The Entire 3D Wrapper */
          .hero-3d-wrapper {
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            transition: transform 0.1s ease-out;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* Floating Stars in Deep Space */
          .star {
            position: absolute;
            width: 3px; height: 3px;
            background: #fff;
            border-radius: 50%;
            opacity: 0.2;
            transform: translateZ(-200px); /* Way in the back */
            animation: twinkle linear infinite alternate;
          }
          @keyframes twinkle {
            0% { transform: translateZ(-200px) scale(1); opacity: 0.1; }
            100% { transform: translateZ(-150px) scale(2); opacity: 0.6; box-shadow: 0 0 10px #fff; }
          }

          /* Greeting Swap */
          .greeting-container {
            position: relative;
            height: 28px;
            margin-bottom: 15px;
            font-size: 1.3rem;
            font-weight: 700;
            color: var(--primary);
            transform: translateZ(60px); /* Pops out */
          }
          .greet-eng, .greet-san {
            position: absolute;
            top: 0; left: 0;
            animation: swapText 6s infinite ease-in-out;
            white-space: nowrap;
          }
          .greet-san {
            animation-delay: 3s;
            opacity: 0;
            transform: translateY(10px);
          }
          @keyframes swapText {
            0%, 40% { opacity: 1; transform: translateY(0); }
            45%, 55% { opacity: 0; transform: translateY(-10px); }
            60%, 100% { opacity: 0; transform: translateY(10px); }
          }

          /* Typewriter cursor */
          .cursor {
            display: inline-block;
            width: 3px;
            height: 1.1rem;
            background: var(--primary);
            margin-left: 4px;
            animation: blink 0.8s infinite;
            vertical-align: middle;
          }
          @keyframes blink { 50% { opacity: 0; } }

          /* 3D Photo Container */
          .photo-container {
            position: relative;
            width: 320px;
            height: 380px;
            transform-style: preserve-3d;
            z-index: 2;
            transform: translateZ(80px); /* Floats heavily */
          }
          .photo-border {
            width: 300px;
            height: 360px;
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            border: 4px solid var(--primary);
            overflow: hidden;
            box-shadow: 0 30px 60px rgba(0,0,0,0.6), inset 0 0 30px rgba(26, 122, 74, 0.5);
            background: rgba(18,18,18,0.5);
            backdrop-filter: blur(10px);
            position: relative;
            transform-style: preserve-3d;
            transition: border-radius 8s ease-in-out infinite alternate;
          }
          .photo-border:hover {
            border-radius: 50% 50% 30% 70% / 50% 30% 70% 50%;
          }
          
          /* Dynamic Glare Effect */
          .photo-glare {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%);
            mix-blend-mode: overlay;
            transform: translateZ(30px);
            pointer-events: none;
          }

          .photo-img {
            width: 100%; height: 100%;
            object-fit: cover;
            object-position: top;
            transform: translateZ(40px) scale(1.05); /* Image literally floats out of its own border */
          }

          /* 3D Orbiting Badges */
          .orbit-ring {
            position: absolute;
            top: 50%; left: 50%;
            width: 480px; height: 480px;
            margin-top: -240px; margin-left: -240px;
            border: 2px dashed rgba(26, 122, 74, 0.3);
            border-radius: 50%;
            animation: spin3D 25s linear infinite;
            transform-style: preserve-3d;
            pointer-events: none;
          }
          @keyframes spin3D { 
            0% { transform: translateZ(-50px) rotateX(60deg) rotateZ(0deg); }
            100% { transform: translateZ(-50px) rotateX(60deg) rotateZ(360deg); } 
          }

          .orbit-badge {
            position: absolute;
            background: rgba(26, 26, 26, 0.85);
            border: 1px solid var(--primary);
            color: #fff;
            padding: 10px 20px;
            border-radius: 30px;
            font-size: 0.9rem;
            font-weight: 800;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 15px rgba(26, 122, 74, 0.6);
            white-space: nowrap;
            /* Complex counter-rotation to stay upright in 3D space */
            animation: counterSpin3D 25s linear infinite;
            pointer-events: auto;
            backdrop-filter: blur(5px);
            transform-style: preserve-3d;
          }
          .light .orbit-badge {
            background: rgba(255, 255, 255, 0.9);
            color: var(--text);
          }

          @keyframes counterSpin3D { 
            0% { transform: rotateZ(0deg) rotateX(-60deg) translateZ(80px); }
            100% { transform: rotateZ(-360deg) rotateX(-60deg) translateZ(80px); } 
          }
          
          /* Positions on the ring */
          .badge-1 { top: -20px; left: 50%; margin-left: -60px; }
          .badge-2 { bottom: 60px; right: -30px; }
          .badge-3 { bottom: 60px; left: -30px; }
          
          /* Magical Scroll Indicator */
          .mouse-scroll {
            width: 32px;
            height: 52px;
            border: 2px solid var(--text-muted);
            border-radius: 20px;
            position: relative;
            margin: 0 auto 5px;
            display: flex;
            justify-content: center;
            opacity: 0.5;
            transition: all 0.3s ease;
          }
          .mouse-scroll:hover {
            opacity: 1;
            border-color: var(--primary);
            box-shadow: 0 0 15px rgba(26, 122, 74, 0.4);
          }
          .mouse-wheel {
            width: 4px;
            height: 8px;
            background: var(--primary);
            border-radius: 2px;
            margin-top: 8px;
            animation: scrollWheel 2s infinite ease-in-out;
            box-shadow: 0 0 8px var(--primary);
          }
          @keyframes scrollWheel {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(20px); opacity: 0; }
          }
          .scroll-arrows {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: -5px;
          }
          .arrow {
            display: block;
            width: 10px;
            height: 10px;
            border-bottom: 2px solid var(--primary);
            border-right: 2px solid var(--primary);
            transform: rotate(45deg);
            animation: arrowDown 2s infinite;
            opacity: 0;
          }
          .arrow:nth-child(2) { animation-delay: 0.2s; }
          .arrow:nth-child(3) { animation-delay: 0.4s; }
          
          @keyframes arrowDown {
            0% { opacity: 0; transform: rotate(45deg) translate(-5px, -5px); }
            50% { opacity: 1; }
            100% { opacity: 0; transform: rotate(45deg) translate(5px, 5px); }
          }
          
          /* --- Responsive Queries --- */
          @media (max-width: 768px) {
            .hero-3d-wrapper { transform: none !important; }
            .hero-container {
              flex-direction: column !important;
              text-align: center;
              gap: 40px !important;
              padding-top: 20px !important;
              transform: none !important;
            }
            .hero-name { font-size: 2.5rem !important; transform: none !important; }
            .titleWrapper { justify-content: center; transform: none !important; }
            .hero-tagline { margin: 0 auto 30px !important; transform: none !important; }
            .socials { justify-content: center; transform: none !important; }
            .btnRow, .resumeRow { justify-content: center; transform: none !important; }
            
            .photo-container {
              width: 260px !important;
              height: 310px !important;
              margin: 0 auto;
              transform: none !important;
            }
            .photo-border {
              width: 240px !important;
              height: 290px !important;
              margin: 0 auto;
            }
            .orbit-ring {
              width: 320px !important;
              height: 320px !important;
              margin-top: -160px; margin-left: -160px;
              animation: spin 20s linear infinite; /* Fallback to 2D spin for mobile */
              transform: none;
            }
            @keyframes spin { 100% { transform: rotate(360deg); } }
            
            .orbit-badge {
              font-size: 0.75rem !important;
              padding: 6px 12px !important;
              animation: counterSpin 20s linear infinite; /* Fallback 2D counterspin */
            }
            @keyframes counterSpin { 100% { transform: rotate(-360deg); } }
            .badge-1 { top: -10px !important; }
            .badge-2 { bottom: 40px !important; right: -10px !important; }
            .badge-3 { bottom: 40px !important; left: -10px !important; }
          }
        `}
      </style>

      {/* Background Deep Space Stars */}
      {stars.map((s, i) => (
        <div key={i} className="star" style={s}></div>
      ))}

      {/* The 3D Rotational Scene */}
      <div 
        className="hero-3d-wrapper"
        style={{
          transform: window.innerWidth > 768 ? `rotateX(${globalTilt.x}deg) rotateY(${globalTilt.y}deg)` : 'none'
        }}
      >
        <div style={styles.container} className="hero-container">
          
          {/* Left Side — 3D Floating Text */}
          <div style={{ ...styles.textSide, transformStyle: 'preserve-3d' }} data-aos="fade-right">
            
            <div className="greeting-container">
              <span className="greet-eng">👋 Hello, I'm</span>
              <span className="greet-san">🙏 Namaste, I'm</span>
            </div>

            <h1 
              style={{...styles.name, transform: 'translateZ(100px)'}} 
              className="hero-name"
            >
              Vivekananda<br />Mohanty
            </h1>

            <div 
              style={{...styles.titleWrapper, transform: 'translateZ(80px)'}} 
              className="titleWrapper"
            >
              <span style={styles.titleDot}></span>
              <p style={styles.title}>
                {currentRole}
                <span className="cursor"></span>
              </p>
            </div>

            <p 
              style={{...styles.tagline, transform: 'translateZ(60px)'}} 
              className="hero-tagline"
            >
              Building robust web applications & ensuring software quality
              through clean code and thorough testing.
            </p>

            <div style={{...styles.socials, transform: 'translateZ(50px)'}} className="socials">
              <a href="https://github.com/vivekananda16" target="_blank" rel="noreferrer" style={styles.socialLink} className="social-link-hover">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/vivekananda-mohanty-2a0956209" target="_blank" rel="noreferrer" style={styles.socialLink} className="social-link-hover">
                <FaLinkedin />
              </a>
              <a href="mailto:vivekanandamohanty7@gmail.com" style={styles.socialLink} className="social-link-hover">
                <FaEnvelope />
              </a>
              <a href="tel:+917978011886" style={styles.socialLink} className="social-link-hover">
                <FaPhone />
              </a>
            </div>

            <div style={{...styles.btnRow, transform: 'translateZ(70px)'}} className="btnRow">
              <Link to="projects" smooth={true} duration={600} offset={-70} className="btn-primary">
                View Projects
              </Link>
              <Link to="contact" smooth={true} duration={600} offset={-70} className="btn-outline">
                Contact Me
              </Link>
            </div>

            <div style={{...styles.resumeRow, transform: 'translateZ(60px)'}} className="resumeRow">
              <a href="https://drive.google.com/file/d/1nl7qPbkplH2FOEbTzKX0fWP9o6HzJwQ2/view?usp=sharing" target="_blank" rel="noreferrer" className="btn-glass">
                📄 Full Stack Resume
              </a>
              <a href="https://drive.google.com/file/d/1oCS2oqxTIAb8CgYOMK-sQoIzV2DyXRRZ/view?usp=sharing" target="_blank" rel="noreferrer" className="btn-glass">
                📄 QA Resume
              </a>
            </div>
          </div>

          {/* Right Side — Massive 3D Photo & Orbit */}
          <div style={{ ...styles.photoSide, transformStyle: 'preserve-3d' }} data-aos="fade-left">
            <div className="photo-container">
              
              {/* Deep Space Orbiting Ring */}
              <div className="orbit-ring">
                <div className="orbit-badge badge-1">☕ Java Dev</div>
                <div className="orbit-badge badge-2">⚛️ React Dev</div>
                <div className="orbit-badge badge-3">🧪 QA Engineer</div>
              </div>

              {/* The Floating 3D Photo */}
              <div className="photo-border">
                {/* Dynamic Lighting Glare */}
                <div 
                  className="photo-glare"
                  style={{
                    opacity: 0.3 + (globalTilt.x + globalTilt.y) * 0.02
                  }}
                ></div>
                <img src={vivekananda} alt="Vivekananda Mohanty" className="photo-img" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div style={styles.scrollDown}>
        <Link to="about" smooth={true} duration={600} offset={-70} style={{ cursor: 'pointer', textDecoration: 'none' }}>
          <div className="mouse-scroll">
            <div className="mouse-wheel"></div>
          </div>
          <div className="scroll-arrows">
            <span className="arrow"></span>
            <span className="arrow"></span>
            <span className="arrow"></span>
          </div>
        </Link>
      </div>

    </section>
  );
};

const styles = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: '80px',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '40px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '60px',
    flexWrap: 'wrap',
    position: 'relative',
    zIndex: 2,
  },
  textSide: {
    flex: 1,
    minWidth: '320px',
  },
  name: {
    fontSize: '3.5rem',
    fontWeight: '800',
    color: 'var(--text)',
    lineHeight: 1.1,
    marginBottom: '16px',
    textShadow: '0 5px 15px rgba(0,0,0,0.1)',
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
    height: '24px',
  },
  titleDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary)',
    display: 'inline-block',
    boxShadow: '0 0 10px var(--primary)',
  },
  title: {
    fontSize: '1.2rem',
    color: 'var(--primary)',
    fontWeight: '600',
    letterSpacing: '0.5px',
  },
  tagline: {
    fontSize: '1rem',
    color: 'var(--text-muted)',
    lineHeight: 1.7,
    marginBottom: '30px',
    maxWidth: '500px',
  },
  socials: {
    display: 'flex',
    gap: '16px',
    marginBottom: '35px',
  },
  socialLink: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    border: '2px solid rgba(26, 122, 74, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text)',
    fontSize: '20px',
    textDecoration: 'none',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    backgroundColor: 'var(--bg-card)',
  },
  btnRow: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    marginBottom: '25px',
  },
  resumeRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  photoSide: {
    flex: 1,
    minWidth: '320px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollDown: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '30px',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10,
  }
};

export default Hero;
