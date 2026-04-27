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

  // 3D Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

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

  // 3D Tilt Handler
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({ x: -(y / 15), y: x / 15 });
  };
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Generate particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    top: Math.random() * 100 + '%',
    left: Math.random() * 100 + '%',
    animationDelay: Math.random() * 5 + 's',
    animationDuration: Math.random() * 10 + 10 + 's'
  }));

  return (
    <section id="hero" className="hero-section" style={styles.section}>
      <style>
        {`
          .hero-section {
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, var(--bg) 0%, var(--bg-card) 100%);
          }
          
          /* Particles */
          .particle {
            position: absolute;
            width: 4px; height: 4px;
            background: var(--primary);
            border-radius: 50%;
            filter: blur(1px);
            opacity: 0.3;
            animation: floatParticle linear infinite alternate;
            pointer-events: none;
          }
          @keyframes floatParticle {
            0% { transform: translate(0, 0) scale(1); opacity: 0.1; }
            100% { transform: translate(30px, -30px) scale(1.5); opacity: 0.4; }
          }

          /* Greeting Swap */
          .greeting-container {
            position: relative;
            height: 28px;
            margin-bottom: 8px;
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--primary);
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
            perspective: 1000px;
            z-index: 2;
          }
          .photo-border {
            width: 300px;
            height: 360px;
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            border: 4px solid var(--primary);
            overflow: hidden;
            box-shadow: 0 20px 60px var(--shadow), inset 0 0 30px rgba(26, 122, 74, 0.5);
            transition: transform 0.1s ease-out;
            transform-style: preserve-3d;
            background: var(--bg-card);
            position: relative;
            z-index: 2;
          }
          .photo-border::after {
            content: '';
            position: absolute;
            top: 0; left: -100%; width: 50%; height: 100%;
            background: linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent);
            transform: skewX(-20deg);
            animation: shine 4s infinite;
          }
          @keyframes shine { 100% { left: 200%; } }

          .photo-img {
            width: 100%; height: 100%;
            object-fit: cover;
            object-position: top;
            transform: translateZ(20px) scale(1.05); /* Pop out effect */
          }

          /* Orbiting Badges */
          .orbit-ring {
            position: absolute;
            top: 50%; left: 50%;
            width: 420px; height: 420px;
            transform: translate(-50%, -50%);
            border: 1px dashed rgba(26, 122, 74, 0.2);
            border-radius: 50%;
            animation: spin 20s linear infinite;
            z-index: 1;
            pointer-events: none;
          }
          @keyframes spin { 100% { transform: translate(-50%, -50%) rotate(360deg); } }

          .orbit-badge {
            position: absolute;
            background: rgba(26, 26, 26, 0.8);
            border: 1px solid var(--primary);
            color: #fff;
            padding: 8px 16px;
            border-radius: 30px;
            font-size: 0.85rem;
            font-weight: 700;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3), 0 0 10px rgba(26, 122, 74, 0.4);
            white-space: nowrap;
            /* Counter-spin so text stays upright */
            animation: counterSpin 20s linear infinite;
            pointer-events: auto;
            backdrop-filter: blur(5px);
          }
          /* Light mode fix for orbit badge */
          .light .orbit-badge {
            background: rgba(255, 255, 255, 0.9);
            color: var(--text);
          }

          @keyframes counterSpin { 100% { transform: rotate(-360deg); } }
          
          /* Positions on the ring */
          .badge-1 { top: -15px; left: 50%; margin-left: -50px; }
          .badge-2 { bottom: 60px; right: -20px; }
          .badge-3 { bottom: 60px; left: -20px; }
          
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
              font-size: 2.5rem !important;
            }
            .titleWrapper {
              justify-content: center;
            }
            .hero-tagline {
              margin: 0 auto 30px !important;
            }
            .socials {
              justify-content: center;
            }
            .btnRow {
              justify-content: center;
            }
            .resumeRow {
              justify-content: center;
            }
            
            /* Scale down 3D photo & orbit ring */
            .photo-container {
              width: 260px !important;
              height: 310px !important;
              margin: 0 auto;
            }
            .photo-border {
              width: 240px !important;
              height: 290px !important;
              margin: 0 auto;
            }
            .orbit-ring {
              width: 320px !important;
              height: 320px !important;
            }
            .orbit-badge {
              font-size: 0.75rem !important;
              padding: 6px 12px !important;
            }
            .badge-1 { top: -10px !important; }
            .badge-2 { bottom: 40px !important; right: -10px !important; }
            .badge-3 { bottom: 40px !important; left: -10px !important; }
          }
        `}
      </style>

      {/* Particle Background */}
      {particles.map((p, i) => (
        <div key={i} className="particle" style={p}></div>
      ))}

      <div style={styles.container} className="hero-container">
        {/* Left Side — Text */}
        <div style={styles.textSide} data-aos="fade-right">
          
          {/* Automatic Translation Greeting */}
          <div className="greeting-container">
            <span className="greet-eng">👋 Hello, I'm</span>
            <span className="greet-san">🙏 Namaste, I'm</span>
          </div>

          <h1 style={styles.name} className="hero-name">Vivekananda<br />Mohanty</h1>

          {/* Typewriter Title */}
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

          {/* Social Links */}
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

          {/* Buttons */}
          <div style={styles.btnRow} className="btnRow">
            <Link to="projects" smooth={true} duration={600} offset={-70} className="btn-primary">
              View Projects
            </Link>
            <Link to="contact" smooth={true} duration={600} offset={-70} className="btn-outline">
              Contact Me
            </Link>
          </div>

          {/* Resume Download Buttons */}
          <div style={styles.resumeRow} className="resumeRow">
            <a
              href="https://drive.google.com/file/d/1nl7qPbkplH2FOEbTzKX0fWP9o6HzJwQ2/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="btn-glass"
            >
              📄 Full Stack Resume
            </a>
            <a
              href="https://drive.google.com/file/d/1oCS2oqxTIAb8CgYOMK-sQoIzV2DyXRRZ/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="btn-glass"
            >
              📄 QA Resume
            </a>
          </div>
        </div>

        {/* Right Side — Holographic 3D Photo & Orbiting Badges */}
        <div style={styles.photoSide} data-aos="fade-left">
          <div 
            className="photo-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* The Orbiting Ring */}
            <div className="orbit-ring">
              <div className="orbit-badge badge-1">☕ Java Dev</div>
              <div className="orbit-badge badge-2">⚛️ React Dev</div>
              <div className="orbit-badge badge-3">🧪 QA Engineer</div>
            </div>

            {/* The 3D Photo */}
            <div 
              className="photo-border"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
              }}
            >
              <img
                src={vivekananda}
                alt="Vivekananda Mohanty"
                className="photo-img"
              />
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
