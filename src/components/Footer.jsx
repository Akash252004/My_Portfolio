import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faDiscord,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.background.dark};
  padding: 4rem 2rem 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.colors.gradient.primary};
    opacity: 0.5;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
`;

const FooterSection = styled.div`
  h3 {
    font-family: ${({ theme }) => theme.fonts.secondary};
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SocialLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-3px);
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.background.light};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <FooterContainer>
      <FooterContent
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <FooterSection as={motion.div} variants={itemVariants}>
          <h3>About Me</h3>
          <FooterText>
          An enthusiastic programmer who merges the creativity of coding 
          with the excitement of web development. Building captivating digital solutions that elevate 
          user interactions and leverage the potential of machine learning.
          </FooterText>
        </FooterSection>

        <FooterSection as={motion.div} variants={itemVariants}>
          <h3>Quick Links</h3>
          <FooterText>
            <a href="#home" style={{ color: 'inherit', textDecoration: 'none' }}>Home</a>
            <br />
            <a href="#about" style={{ color: 'inherit', textDecoration: 'none' }}>About</a>
            <br />
            <a href="#skills" style={{ color: 'inherit', textDecoration: 'none' }}>Skills</a>
            <br />
            <a href="#projects" style={{ color: 'inherit', textDecoration: 'none' }}>Projects</a>
            <br />
            <a href="#contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a>
          </FooterText>
        </FooterSection>

        <FooterSection as={motion.div} variants={itemVariants}>
          <h3>Connect With Me</h3>
          <SocialLinks>
            <SocialLink
              href="https://github.com/Akash252004"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
            >
              <FontAwesomeIcon icon={faGithub} />
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/akash-sikhakolanu-4552aa259"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </SocialLink>
            <SocialLink
              href="https://x.com/Akash0825"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
            >
              <FontAwesomeIcon icon={faTwitter} />
            </SocialLink>
  
            <SocialLink
              href="mailto:akashsikhakolanu@gmail.com"
              whileHover={{ y: -3 }}
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </SocialLink>
          </SocialLinks>
        </FooterSection>
      </FooterContent>

      <FooterBottom as={motion.div} variants={itemVariants}>
        <p>© {new Date().getFullYear()} Akash Sikhakolanu. All rights reserved.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer; 