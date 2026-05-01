import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import vivekananda from '../assets/vivekananda.webp';

const roles = ["Full Stack Developer", "QA Automation Engineer", "Tech Enthusiast", "Problem Solver"];

const Hero = () => {
  // Typewriter State
  const [currentRole, setCurrentRole] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Magic Spotlight State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Holographic 3D Card State
  const cardRef = useRef(null);
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0, glowX: 50, glowY: 50 });
  const [isHovering, setIsHovering] = useState(false);

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

  // Global Spotlight
  const handleGlobalMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // Holographic Card Logic
  const handleCardMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (-20 to 20 degrees)
    const rotateX = ((y / rect.height) - 0.5) * -40;
    const rotateY = ((x / rect.width) - 0.5) * 40;
    
    // Calculate glow position percentage
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;

    setCardTilt({ x: rotateX, y: rotateY, glowX, glowY });
  };

  const handleCardEnter = () => setIsHovering(true);
  const handleCardLeave = () => {
    setIsHovering(false);
    // Smoothly reset the card to flat
    setCardTilt({ x: 0, y: 0, glowX: 50, glowY: 50 });
  };

  return (
    <section 
      id="hero" 
      className="hero-section" 
      style={styles.section}
      onMouseMove={handleGlobalMouseMove}
    >
      <style>
        {`
          .hero-section {
            position: relative;
            overflow: hidden;
            background: transparent;
          }

          /* Global Mouse Spotlight Aura */
          .mouse-spotlight {
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            pointer-events: none;
            z-index: 0;
            background: radial-gradient(
              800px circle at var(--mouse-x) var(--mouse-y), 
              rgba(26, 122, 74, 0.15),
              transparent 40%
            );
            transition: background 0.1s ease;
          }

          /* Greeting Swap */
          .greeting-container {
            position: relative;
            height: 28px;
            margin-bottom: 15px;
            font-size: 1.3rem;
            font-weight: 700;
            color: var(--primary);
            text-transform: uppercase;
            letter-spacing: 2px;
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

          /* Shining Text Effect */
          .hero-name {
            font-size: clamp(2.5rem, 5vw + 1rem, 4.5rem);
            font-weight: 900;
            background: linear-gradient(to right, var(--text) 20%, var(--primary) 40%, var(--primary) 60%, var(--text) 80%);
            background-size: 200% auto;
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
            animation: shineText 5s linear infinite;
            margin-bottom: 20px;
            line-height: 1.1;
            text-shadow: 0 10px 30px rgba(0,0,0,0.3);
            padding-right: 20px; /* Prevent WebKit text-shadow clipping */
            padding-bottom: 20px;
            margin-right: -20px; /* Offset padding */
            margin-bottom: -20px;
            word-wrap: break-word;
            white-space: pre-wrap;
          }
          @keyframes shineText { 
            to { background-position: 200% center; } 
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

          /* Interactive Holographic Card */
          .holo-card-container {
            perspective: 2000px;
            z-index: 10;
            width: 480px;
            height: 560px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .holo-card {
            width: 440px;
            height: 520px;
            border-radius: 20px;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.1s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease;
            background: rgba(18, 18, 18, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
          }
          .holo-card.hovered {
            box-shadow: 
              0 30px 60px -12px rgba(0,0,0,0.8),
              0 0 40px rgba(26, 122, 74, 0.4);
          }
          
          /* The floating image inside the card */
          .holo-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top;
            border-radius: 19px;
            transform: translateZ(40px) scale(0.92);
            box-shadow: 0 20px 40px rgba(0,0,0,0.6);
            transition: transform 0.3s ease;
          }
          .holo-card.hovered .holo-img {
            transform: translateZ(70px) scale(0.95);
          }
          
          /* Dynamic Holographic Foil Glare */
          .holo-glare {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            border-radius: 20px;
            background: radial-gradient(
              circle at var(--glow-x) var(--glow-y), 
              rgba(255, 255, 255, 0.8) 0%, 
              rgba(255, 255, 255, 0) 60%
            );
            mix-blend-mode: overlay;
            opacity: var(--glow-opacity);
            transition: opacity 0.4s ease;
            pointer-events: none;
            transform: translateZ(41px); /* Just above the image */
          }

          /* Glowing Orbital Ring */
          .magical-orbit {
            position: absolute;
            top: 50%; left: 50%;
            width: 650px; height: 650px;
            transform: translate(-50%, -50%);
            border: 2px dashed rgba(26, 122, 74, 0.3);
            border-radius: 50%;
            animation: slowSpin 30s linear infinite;
            pointer-events: none;
            box-shadow: inset 0 0 50px rgba(26, 122, 74, 0.1);
          }
          @keyframes slowSpin { 100% { transform: translate(-50%, -50%) rotate(360deg); } }

          /* Glass Badges */
          .magic-badge {
            position: absolute;
            background: rgba(20, 20, 20, 0.85);
            border: 1px solid var(--primary);
            color: #fff;
            padding: 12px 24px;
            border-radius: 30px;
            font-size: 0.95rem;
            font-weight: 800;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5), inset 0 0 15px rgba(26, 122, 74, 0.5);
            animation: counterSpin 30s linear infinite;
            pointer-events: auto;
            backdrop-filter: blur(8px);
            transition: all 0.3s ease;
            cursor: default;
          }
          .light .magic-badge {
            background: rgba(255, 255, 255, 0.9);
            color: var(--text);
          }
          .magic-badge:hover {
            transform: scale(1.1) !important;
            background: var(--primary);
            color: #fff;
            box-shadow: 0 0 30px var(--primary);
            animation-play-state: paused;
          }
          @keyframes counterSpin { 100% { transform: rotate(-360deg); } }
          
          /* Positions on the ring */
          .badge-1 { top: -20px; left: 50%; margin-left: -60px; }
          .badge-2 { bottom: 60px; right: -30px; }
          .badge-3 { bottom: 60px; left: -30px; }
          
          .social-link-hover:hover {
            background: var(--primary) !important;
            color: #fff !important;
            border-color: var(--primary) !important;
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(26, 122, 74, 0.3);
          }
          
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
            .hero-container {
              flex-direction: column !important;
              text-align: center;
              gap: 40px !important;
              padding-top: 20px !important;
            }
            .hero-name { 
              font-size: clamp(2rem, 8vw, 3rem) !important; 
              padding-right: 10px;
              margin-right: 0;
            }
            .titleWrapper { justify-content: center; }
            .hero-tagline { margin: 0 auto 30px !important; }
            .socials, .btnRow, .resumeRow { justify-content: center; }
            
            .holo-card-container {
              width: 260px !important;
              height: 340px !important;
            }
            .holo-card {
              width: 240px !important;
              height: 300px !important;
              transform: none !important; /* Disable 3D tilt on mobile */
            }
            .magical-orbit {
              width: 340px !important;
              height: 340px !important;
            }
            .magic-badge {
              font-size: 0.75rem !important;
              padding: 6px 12px !important;
            }
            .badge-1 { top: -10px !important; }
            .badge-2 { bottom: 40px !important; right: -10px !important; }
            .badge-3 { bottom: 40px !important; left: -10px !important; }
          }
        `}
      </style>

      {/* Global Mouse Spotlight Background */}
      <div 
        className="mouse-spotlight" 
        style={{
          '--mouse-x': `${mousePos.x}px`,
          '--mouse-y': `${mousePos.y}px`
        }}
      ></div>

      <div style={styles.container} className="hero-container">
        
        {/* Left Side — Magical Text */}
        <div style={styles.textSide} data-aos="fade-right">
          
          <div className="greeting-container">
            <span className="greet-eng">👋 Hello, I'm</span>
            <span className="greet-san">🙏 Namaste, I'm</span>
          </div>

          <h1 className="hero-name">
            Vivekananda<br />Mohanty
          </h1>

          <div style={styles.titleWrapper} className="titleWrapper">
            <span style={styles.titleDot}></span>
            <p style={styles.title}>
              {currentRole}
              <span className="cursor"></span>
            </p>
          </div>

          <p style={styles.tagline} className="hero-tagline">
            Building robust web applications & ensuring software quality
            through clean code and thorough testing.
          </p>

          <div style={styles.socials} className="socials">
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

          <div style={styles.btnRow} className="btnRow">
            <Link to="projects" smooth={true} duration={600} offset={-70} className="btn-primary">
              View Projects
            </Link>
            <Link to="contact" smooth={true} duration={600} offset={-70} className="btn-outline">
              Contact Me
            </Link>
          </div>

          <div style={styles.resumeRow} className="resumeRow">
            <a href="https://drive.google.com/file/d/1nl7qPbkplH2FOEbTzKX0fWP9o6HzJwQ2/view?usp=sharing" target="_blank" rel="noreferrer" className="btn-glass">
              📄 Full Stack Resume
            </a>
            <a href="https://drive.google.com/file/d/1oCS2oqxTIAb8CgYOMK-sQoIzV2DyXRRZ/view?usp=sharing" target="_blank" rel="noreferrer" className="btn-glass">
              📄 QA Resume
            </a>
          </div>
        </div>

        {/* Right Side — Holographic Interactive Card */}
        <div style={styles.photoSide} data-aos="fade-left">
          <div className="holo-card-container">
            
            {/* Slow Glowing Orbital Ring */}
            <div className="magical-orbit">
              <div className="magic-badge badge-1">☕ Java Dev</div>
              <div className="magic-badge badge-2">⚛️ React Dev</div>
              <div className="magic-badge badge-3">🧪 QA Engineer</div>
            </div>

            {/* The Interactive Holographic Card */}
            <div 
              ref={cardRef}
              className={`holo-card ${isHovering ? 'hovered' : ''}`}
              onMouseMove={handleCardMove}
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
              style={{
                transform: `rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`
              }}
            >
              {/* Dynamic Glare that tracks mouse inside the card */}
              <div 
                className="holo-glare"
                style={{
                  '--glow-x': `${cardTilt.glowX}%`,
                  '--glow-y': `${cardTilt.glowY}%`,
                  '--glow-opacity': isHovering ? 1 : 0
                }}
              ></div>
              
              <img src={vivekananda} alt="Vivekananda Mohanty" className="holo-img" />
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
    maxWidth: '100%',
    margin: '0 auto',
    padding: '40px 5%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '60px',
    flexWrap: 'wrap',
    position: 'relative',
    zIndex: 2,
  },
  textSide: {
    flex: 1.2,
    minWidth: '400px',
    zIndex: 2,
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
    maxWidth: '650px',
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
    justifyContent: 'flex-end',
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
