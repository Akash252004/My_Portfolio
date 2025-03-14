import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  z-index: 1000;
  backdrop-filter: blur(10px);
  background: ${({ theme, scrolled }) =>
    scrolled
      ? `${theme.colors.background.dark}cc`
      : `${theme.colors.background.dark}99`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.accent}20;
  transition: all 0.3s ease;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
`;

const Logo = styled.a`
  font-family: ${({ theme }) => theme.fonts.accent};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.accent};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.secondary};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.base};
  position: relative;
  padding: 0.5rem;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -10px;
    width: 6px;
    height: 6px;
    background: ${({ theme }) => theme.colors.accent};
    border-radius: 50%;
    transform: translateY(-50%) scale(0);
    transition: transform 0.3s ease;
  }

  &:hover::before,
  &.active::before {
    transform: translateY(-50%) scale(1);
  }

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 100;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background.dark}ee;
  backdrop-filter: blur(10px);
  padding: 6rem 2rem;
  z-index: 90;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const MobileNavLink = styled(NavLink)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  opacity: 0.9;

  &:hover {
    opacity: 1;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop - 100 &&
            scrollPosition < offsetTop + offsetHeight - 100
          ) {
            setActiveSection(section);
          }
        }
      });

      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'tween',
        duration: 0.3,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
      },
    },
  };

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <NavContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      scrolled={scrolled}
    >
      <NavContent>
        <Logo href="#home">Venkata Akash</Logo>
        <NavLinks>
          {navItems.map(({ href, label }) => (
            <NavLink
              key={href}
              href={href}
              className={activeSection === href.slice(1) ? 'active' : ''}
            >
              {label}
            </NavLink>
          ))}
        </NavLinks>
        <MobileMenuButton onClick={() => setIsOpen(!isOpen)}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </MobileMenuButton>
      </NavContent>
      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {navItems.map(({ href, label }) => (
              <MobileNavLink
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={activeSection === href.slice(1) ? 'active' : ''}
              >
                {label}
              </MobileNavLink>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>
    </NavContainer>
  );
};

export default Navbar; 