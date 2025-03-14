import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutSection = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem;
  background: ${({ theme }) => theme.colors.background.primary};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: ${({ theme }) => theme.colors.gradient.primary};
    opacity: 0.2;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  perspective: 1000px;

  &::before {
    content: '';
    position: absolute;
    inset: -10px;
    border: 2px solid ${({ theme }) => theme.colors.accent};
    transform: skew(-5deg) rotate(-5deg);
    opacity: 0.3;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -20px;
    border: 2px solid ${({ theme }) => theme.colors.accent};
    transform: skew(5deg) rotate(5deg);
    opacity: 0.3;
    z-index: 1;
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  transform-style: preserve-3d;
  transform: rotateY(-20deg) rotateX(10deg);
  transition: transform 0.5s ease;

  &:hover {
    transform: rotateY(0deg) rotateX(0deg);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      ${({ theme }) => theme.colors.accent}20,
      transparent
    );
    z-index: 2;
    mix-blend-mode: overlay;
  }
`;

const ProfileImage = styled(motion.img)`
  width: 100%;
  height: auto;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 3px solid ${({ theme }) => theme.colors.accent};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  filter: contrast(1.1) brightness(1.1);
`;

const GlowEffect = styled.div`
  position: absolute;
  inset: -20px;
  background: radial-gradient(
    circle at 50% 50%,
    ${({ theme }) => theme.colors.accent}20 0%,
    transparent 70%
  );
  z-index: 0;
  opacity: 0.5;
  animation: glow 3s ease-in-out infinite alternate;

  @keyframes glow {
    from {
      opacity: 0.3;
      transform: scale(0.95);
    }
    to {
      opacity: 0.6;
      transform: scale(1.05);
    }
  }
`;

const ContentWrapper = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: center;
  }
`;

const Title = styled(motion.h2)`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: clamp(2rem, 4vw, ${({ theme }) => theme.fontSizes['4xl']});
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;

  &::before {
    content: '<';
    position: absolute;
    left: -2rem;
    color: ${({ theme }) => theme.colors.accent};
    opacity: 0.5;
  }

  &::after {
    content: '/>';
    position: absolute;
    right: -2rem;
    color: ${({ theme }) => theme.colors.accent};
    opacity: 0.5;
  }
`;

const Description = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const StatItem = styled(motion.div)`
  text-align: center;
  padding: 1.5rem;
  background: ${({ theme }) => `linear-gradient(
    135deg,
    ${theme.colors.background.secondary} 0%,
    ${theme.colors.background.dark} 100%
  )`};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.accent}30;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent,
      ${({ theme }) => theme.colors.accent}10,
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover::before {
    transform: translateX(100%);
  }

  h3 {
    font-family: ${({ theme }) => theme.fonts.secondary};
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: 0.5rem;
  }

  p {
    font-family: ${({ theme }) => theme.fonts.primary};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
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
    <AboutSection id="about">
      <Container>
        <ImageWrapper
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <GlowEffect />
          <ImageContainer>
            <ProfileImage
              src="/me.jpg"
              alt="Profile"
              variants={itemVariants}
            />
          </ImageContainer>
        </ImageWrapper>
        <ContentWrapper>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Title variants={itemVariants}>
              About Me
            </Title>
            <Description variants={itemVariants}>
            An enthusiastic programmer who merges the creativity of coding
             with the excitement of web development. Building captivating digital
             solutions that elevate user interactions and leverage the potential of machine learning.
            </Description>
            <Stats>
              <StatItem variants={itemVariants}>
                <h3>0+</h3>
                <p>Years Experience</p>
              </StatItem>
              <StatItem variants={itemVariants}>
                <h3>10+</h3>
                <p>Projects Completed</p>
              </StatItem>
             
            </Stats>
          </motion.div>
        </ContentWrapper>
      </Container>
    </AboutSection>
  );
};

export default About; 