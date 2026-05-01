import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ theme, toggleTheme }) => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // Add shadow when scrolled
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', to: 'hero' },
        { name: 'About', to: 'about' },
        { name: 'Skills', to: 'skills' },
        { name: 'Projects', to: 'projects' },
        { name: 'Certifications', to: 'certifications' },
        { name: 'Contact', to: 'contact' },
    ];

    return (
        <nav className={`navbar-container ${scrolled ? 'scrolled' : ''}`} style={styles.nav}>
            <style>
                {`
                    .navbar-container {
                        position: fixed;
                        top: 0; left: 0; right: 0;
                        z-index: 1000;
                        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        background: transparent;
                    }
                    .navbar-container.scrolled {
                        background: rgba(18, 18, 18, 0.8);
                        backdrop-filter: blur(12px);
                        -webkit-backdrop-filter: blur(12px);
                        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
                        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    }
                    .light .navbar-container.scrolled {
                        background: rgba(255, 255, 255, 0.85);
                        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                    }

                    /* Logo Glitch & Hover */
                    .logo-hover-wrapper {
                        cursor: pointer;
                        text-decoration: none;
                        display: flex;
                        position: relative;
                    }
                    .logo-do {
                        font-family: 'Poppins', sans-serif;
                        font-size: 38px;
                        font-weight: 800;
                        color: var(--text);
                        line-height: 1;
                        letter-spacing: -2px;
                        text-shadow: 2px 0px 0px rgba(255,0,0,0.6), -2px 0px 0px rgba(0,255,255,0.6);
                        transition: all 0.3s ease;
                    }
                    .logo-dot {
                        font-family: 'Poppins', sans-serif;
                        font-size: 42px;
                        font-weight: 900;
                        color: var(--primary);
                        line-height: 1;
                        margin-left: 2px;
                    }
                    .logo-hover-wrapper:hover .logo-do {
                        text-shadow: 3px 0px 0px rgba(255,0,0,0.9), -3px 0px 0px rgba(0,255,255,0.9);
                        transform: skewX(-5deg);
                    }
                    .logo-hover-wrapper:hover .logo-dot {
                        text-shadow: 0 0 15px var(--primary);
                        transform: scale(1.1);
                    }
                    
                    /* Hidden Subtitle Pop-up */
                    .logo-popup {
                        position: absolute;
                        top: 110%;
                        left: 0;
                        background: var(--bg-card);
                        border: 1px solid var(--primary);
                        border-radius: 8px;
                        padding: 10px 14px;
                        box-shadow: 0 10px 25px rgba(26, 122, 74, 0.3);
                        opacity: 0;
                        transform: translateY(15px);
                        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        pointer-events: none;
                        display: flex;
                        flex-direction: column;
                        min-width: 140px;
                    }
                    .logo-hover-wrapper:hover .logo-popup {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    .popup-sanskrit {
                        font-family: 'Georgia', serif;
                        font-size: 14px;
                        color: var(--primary);
                        font-weight: 700;
                        letter-spacing: 1px;
                        margin-bottom: 2px;
                    }
                    .popup-english {
                        font-size: 10px;
                        color: var(--text-muted);
                        letter-spacing: 2px;
                        text-transform: uppercase;
                    }

                    /* Animated Underline */
                    .nav-item-link {
                        position: relative;
                        color: var(--text);
                        text-decoration: none;
                        font-size: 15px;
                        font-weight: 500;
                        cursor: pointer;
                        padding: 8px 0;
                        transition: color 0.3s ease;
                    }
                    .nav-item-link::after {
                        content: '';
                        position: absolute;
                        bottom: 0; left: 0;
                        width: 0%;
                        height: 2px;
                        background: var(--primary);
                        transition: width 0.3s ease;
                        box-shadow: 0 0 8px var(--primary);
                    }
                    .nav-item-link:hover {
                        color: var(--primary);
                    }
                    .nav-item-link:hover::after {
                        width: 100%;
                    }
                    
                    /* Theme Btn Pulsing Glow */
                    .theme-btn-glow {
                        position: relative;
                        background: var(--bg-card);
                        border: 1px solid var(--border);
                        border-radius: 50%;
                        width: 40px; height: 40px;
                        display: flex; align-items: center; justify-content: center;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    .theme-btn-glow:hover {
                        transform: rotate(15deg) scale(1.1);
                        border-color: var(--primary);
                        box-shadow: 0 0 15px rgba(26, 122, 74, 0.5);
                    }

                    /* Responsive Media Queries */
                    @media (max-width: 768px) {
                        .nav-links-desktop {
                            display: none !important;
                        }
                        .hamburger-btn {
                            display: block !important;
                        }
                    }
                `}
            </style>

            <div style={styles.container}>

                {/* Logo */}
                <Link to="hero" smooth={true} duration={600} offset={-70} className="logo-hover-wrapper">
                    <div style={styles.logoMain}>
                        <span className="logo-do">du</span>
                        <span className="logo-dot">.</span>
                    </div>
                    
                    {/* The Popup that appears on hover */}
                    <div className="logo-popup">
                        <span className="popup-sanskrit">सृजनम् प्रज्ञा</span>
                        <div style={{width: '100%', height: '1px', background: 'var(--border)', margin: '4px 0'}}></div>
                        <span className="popup-english">Creation & Wisdom</span>
                    </div>
                </Link>

                {/* Desktop Nav Links */}
                <ul style={styles.navLinks} className="nav-links-desktop">
                    {navLinks.map((link) => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={600}
                                className="nav-item-link"
                                activeStyle={{ color: 'var(--primary)' }}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right Side — Theme Toggle + Hamburger */}
                <div style={styles.rightSide}>


                    {/* Hamburger for mobile */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={styles.hamburger}
                        className="hamburger-btn"
                    >
                        {menuOpen
                            ? <FaTimes style={{ fontSize: '20px' }} />
                            : <FaBars style={{ fontSize: '20px' }} />
                        }
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div style={styles.mobileMenu}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={600}
                            style={styles.mobileLink}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

const styles = {
    container: {
        maxWidth: '100%',
        margin: '0 auto',
        padding: '16px 5%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoMain: {
        display: 'flex',
        alignItems: 'baseline',
        lineHeight: 1,
    },
    navLinks: {
        display: 'flex',
        listStyle: 'none',
        gap: '32px',
        alignItems: 'center',
    },
    rightSide: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    hamburger: {
        background: 'none',
        border: 'none',
        color: 'var(--text)',
        cursor: 'pointer',
        display: 'none',
        padding: '4px',
    },
    mobileMenu: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(18, 18, 18, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '20px 24px',
        gap: '16px',
        borderTop: '1px solid var(--border)',
    },
    mobileLink: {
        color: 'var(--text)',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        padding: '10px 0',
        borderBottom: '1px solid var(--border)',
    },
};

export default Navbar;