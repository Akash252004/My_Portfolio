import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background.primary};
  overflow: hidden;
  padding: 6rem 2rem 2rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      ${({ theme }) => theme.colors.background.secondary} 0%,
      ${({ theme }) => theme.colors.background.primary} 100%
    );
    z-index: 1;
  }
`;

const ParticleCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  z-index: 3;
  position: relative;
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled(motion.h1)`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: clamp(2.5rem, 8vw, ${({ theme }) => theme.fontSizes['7xl']});
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.2;
  position: relative;
  display: inline-block;

  span {
    display: block;
    color: ${({ theme }) => theme.colors.accent};
    font-family: ${({ theme }) => theme.fonts.accent};
    font-size: clamp(1.5rem, 4vw, ${({ theme }) => theme.fontSizes['4xl']});
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 4px;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: ${({ theme }) => theme.colors.gradient.primary};
    border-radius: ${({ theme }) => theme.radii.full};
  }
`;

const Subtitle = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: clamp(1rem, 2vw, ${({ theme }) => theme.fontSizes.xl});
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 2rem auto;
  max-width: 600px;
  line-height: 1.8;
`;

const CTAButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  padding: 1rem 2.5rem;
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.background.dark};
  background: ${({ theme }) => theme.colors.accent};
  border: none;
  border-radius: ${({ theme }) => theme.radii.lg};
  cursor: pointer;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 2rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.lg};

    &::before {
      transform: translateX(100%);
    }
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  cursor: pointer;

  &::before {
    content: '';
    display: block;
    width: 2px;
    height: 3rem;
    background: ${({ theme }) => theme.colors.accent};
    margin: 0 auto;
  }

  &::after {
    content: '▼';
    color: ${({ theme }) => theme.colors.accent};
    font-size: 1.2rem;
    display: block;
    text-align: center;
    margin-top: 0.5rem;
  }
`;

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.reset();
        if (this.y < 0 || this.y > canvas.height) this.reset();
      }

      draw() {
        ctx.fillStyle = `rgba(0, 255, 157, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToProjects = () => {
    document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: 'easeOut'
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: 'easeOut'
      }
    }
  };

  const scrollVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 1,
        ease: 'easeOut',
        repeat: Infinity,
        repeatType: 'reverse'
      }
    }
  };

  return (
    <HeroSection id="home">
      <ParticleCanvas ref={canvasRef} />
      <ContentWrapper>
        <HeroContent>
          <Title
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            <span>My portfolio</span>
            
          </Title>
          <Subtitle
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
          >
            Crafting immersive digital experiences through code.
             Transforming ideas into interactive realities with a passion
              for technology and innovation
          </Subtitle>
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
          >
            <CTAButton href="#projects">
              View My Projects
            </CTAButton>
          </motion.div>
        </HeroContent>
      </ContentWrapper>
      <ScrollIndicator
        variants={scrollVariants}
        initial="hidden"
        animate="visible"
        onClick={scrollToProjects}
      />
    </HeroSection>
  );
};

export default Hero; 