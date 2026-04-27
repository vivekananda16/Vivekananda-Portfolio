import React, { useState, useEffect } from 'react';
import { FaLinkedinIn, FaGithub, FaInstagram, FaFacebookF, FaArrowUp } from 'react-icons/fa';
import { Link } from 'react-scroll';

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const windowScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', windowScroll);
    return () => window.removeEventListener('scroll', windowScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer" style={styles.footer}>
      <style>
        {`
          .footer {
            background-color: var(--bg-card);
            border-top: 1px solid var(--border);
            padding: 60px 0 30px;
            position: relative;
            z-index: 10;
          }
          .footer-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .footer-logo {
            font-size: 2rem;
            font-weight: 800;
            color: var(--text);
            margin-bottom: 25px;
            letter-spacing: 1px;
            cursor: pointer;
            transition: transform 0.3s ease;
          }
          .footer-logo:hover {
            transform: scale(1.05);
          }
          .footer-logo span {
            color: var(--primary);
          }
          .footer-nav {
            display: flex;
            gap: 35px;
            margin-bottom: 35px;
            flex-wrap: wrap;
            justify-content: center;
          }
          .footer-nav-link {
            color: var(--text-muted);
            text-decoration: none;
            font-weight: 600;
            font-size: 1.05rem;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
          }
          .footer-nav-link::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -4px;
            left: 0;
            background-color: var(--primary);
            transition: width 0.3s ease;
          }
          .footer-nav-link:hover {
            color: var(--primary);
          }
          .footer-nav-link:hover::after {
            width: 100%;
          }
          .footer-socials {
            display: flex;
            gap: 20px;
            margin-bottom: 40px;
          }
          .footer-social-icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--bg);
            border: 1px solid var(--border);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text);
            font-size: 1.2rem;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            text-decoration: none;
          }
          .footer-social-icon:hover {
            background: var(--primary);
            color: #fff;
            border-color: var(--primary);
            transform: translateY(-5px) rotate(360deg);
            box-shadow: 0 10px 20px rgba(26, 122, 74, 0.3);
          }
          .footer-divider {
            width: 100%;
            height: 1px;
            background: var(--border);
            margin-bottom: 25px;
          }
          .footer-copyright {
            color: var(--text-muted);
            font-size: 0.95rem;
            text-align: center;
          }
          .footer-copyright span {
            color: var(--primary);
            font-weight: 600;
          }
          
          /* Scroll To Top Button */
          .scroll-top-btn {
            position: fixed;
            bottom: 40px;
            right: 40px;
            width: 55px;
            height: 55px;
            border-radius: 50%;
            background: var(--primary);
            color: #fff;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.3rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 1000;
            box-shadow: 0 10px 25px rgba(26, 122, 74, 0.4);
          }
          .scroll-top-btn.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }
          .scroll-top-btn:hover {
            background: var(--primary-light);
            transform: translateY(-8px);
            box-shadow: 0 15px 30px rgba(26, 122, 74, 0.6);
          }
          
          @media (max-width: 768px) {
            .scroll-top-btn {
              bottom: 20px;
              right: 20px;
            }
          }
        `}
      </style>

      <div className="footer-container">
        <div className="footer-logo" onClick={scrollToTop}>
          du <span>.</span>
        </div>
        
        <div className="footer-nav">
          <Link to="hero" spy={true} smooth={true} offset={-70} duration={500} className="footer-nav-link">Home</Link>
          <Link to="skills" spy={true} smooth={true} offset={-70} duration={500} className="footer-nav-link">Skills</Link>
          <Link to="projects" spy={true} smooth={true} offset={-70} duration={500} className="footer-nav-link">Projects</Link>
          <Link to="certifications" spy={true} smooth={true} offset={-70} duration={500} className="footer-nav-link">Certifications</Link>
          <Link to="contact" spy={true} smooth={true} offset={-70} duration={500} className="footer-nav-link">Contact</Link>
        </div>

        <div className="footer-socials">
          <a href="https://www.linkedin.com/in/vivekananda-mohanty-2a0956209" target="_blank" rel="noreferrer" className="footer-social-icon">
            <FaLinkedinIn />
          </a>
          <a href="https://github.com/vivekananda16" target="_blank" rel="noreferrer" className="footer-social-icon">
            <FaGithub />
          </a>
          <a href="https://www.instagram.com/vi_vekanand._/" target="_blank" rel="noreferrer" className="footer-social-icon">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com/vivekanandamohanty.mohanty" target="_blank" rel="noreferrer" className="footer-social-icon">
            <FaFacebookF />
          </a>
        </div>

        <div className="footer-divider"></div>

        <p className="footer-copyright">
          © {new Date().getFullYear()} <span>du .co</span>. All Rights Reserved.
        </p>
      </div>

      {/* Scroll to Top Button */}
      <button 
        className={`scroll-top-btn \${showTopBtn ? 'show' : ''}`} 
        onClick={scrollToTop}
        title="Scroll to Top"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
};

const styles = {
  footer: {}
};

export default Footer;