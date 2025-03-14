import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

const MainContent = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

// Intro Screen Components
const IntroScreen = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #050A14;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(0, 255, 157, 0.05) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(0, 255, 157, 0.05) 0%, transparent 40%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  text-align: center;
  overflow: hidden;
  position: relative;
`;

const IntroContent = styled(motion.div)`
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  z-index: 10;
`;

const IntroTitle = styled(motion.h1)`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: clamp(2.5rem, 8vw, ${({ theme }) => theme.fontSizes['6xl']});
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
  letter-spacing: 4px;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px ${({ theme }) => theme.colors.accent}80;
  
  span {
    color: ${({ theme }) => theme.colors.accent};
    display: block;
  }
`;

const IntroSubtitle = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: clamp(1rem, 3vw, ${({ theme }) => theme.fontSizes.xl});
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
  line-height: 1.6;
`;

const EnterButton = styled(motion.button)`
  background: ${({ theme }) => theme.colors.accent};
  color: #050A14;
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  padding: 1rem 3rem;
  border: none;
  border-radius: ${({ theme }) => theme.radii.lg};
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px ${({ theme }) => theme.colors.accent}50;
  
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
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), 0 0 30px ${({ theme }) => theme.colors.accent}70;
    
    &::before {
      transform: translateX(100%);
    }
  }
`;

const Grid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(0, 255, 157, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 157, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.2;
  z-index: 1;
  perspective: 1000px;
  transform-style: preserve-3d;
  animation: gridAnimation 20s linear infinite;
  
  @keyframes gridAnimation {
    0% {
      transform: rotateX(60deg) translateY(0);
    }
    100% {
      transform: rotateX(60deg) translateY(50px);
    }
  }
`;

const Hexagon = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size * 0.866}px;
  background-color: transparent;
  z-index: 1;
  opacity: ${props => props.opacity};
  
  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 0;
    border-left: ${props => props.size / 2}px solid transparent;
    border-right: ${props => props.size / 2}px solid transparent;
  }
  
  &:before {
    bottom: 100%;
    border-bottom: ${props => props.size * 0.433}px solid ${props => props.color};
  }
  
  &:after {
    top: 100%;
    border-top: ${props => props.size * 0.433}px solid ${props => props.color};
  }
`;

const GlowingOrb = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.colors.accent}30 0%,
    transparent 70%
  );
  z-index: 1;
  filter: blur(30px);
`;

const PowerLine = styled(motion.div)`
  position: absolute;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    ${({ theme }) => theme.colors.accent}50,
    ${({ theme }) => theme.colors.accent},
    ${({ theme }) => theme.colors.accent}50,
    transparent
  );
  z-index: 1;
`;

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center',
          color: '#ff4444',
          backgroundColor: '#0A0F1C',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Orbitron', sans-serif"
        }}>
          <h1 style={{ color: '#00FF9D', fontSize: '3rem', marginBottom: '2rem' }}>Something went wrong</h1>
          <p style={{ marginBottom: '1rem', color: '#ffffff' }}>{this.state.error?.message || 'Unknown error'}</p>
          <pre style={{ 
            textAlign: 'left', 
            backgroundColor: 'rgba(0,0,0,0.5)', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            maxWidth: '800px',
            overflow: 'auto',
            marginBottom: '2rem',
            color: '#B4B4B4',
            fontSize: '0.8rem'
          }}>
            {this.state.errorInfo?.componentStack || 'No component stack available'}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '0.5rem 1rem',
              marginTop: '1rem',
              background: '#00FF9D',
              color: '#0A0F1C',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '1rem'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Generate random hexagons
const generateHexagons = (count, theme) => {
  const hexagons = [];
  for (let i = 0; i < count; i++) {
    hexagons.push({
      id: i,
      x: Math.random() * 100, // % of viewport width
      y: Math.random() * 100, // % of viewport height
      size: Math.random() * 40 + 20,
      opacity: Math.random() * 0.2 + 0.05,
      color: i % 3 === 0 ? theme.colors.accent : theme.colors.text,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      rotate: Math.random() * 360
    });
  }
  return hexagons;
};

// Generate power lines
const generatePowerLines = (count, theme) => {
  const lines = [];
  for (let i = 0; i < count; i++) {
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const width = Math.random() * 30 + 10;
    
    lines.push({
      id: i,
      x: startX,
      y: startY,
      width: width,
      opacity: Math.random() * 0.5 + 0.2,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 10
    });
  }
  return lines;
};

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [hexagons, setHexagons] = useState([]);
  const [powerLines, setPowerLines] = useState([]);

  useEffect(() => {
    // Generate elements immediately
    setHexagons(generateHexagons(15, {
      colors: {
        accent: '#00FF9D',
        text: '#FFFFFF'
      }
    }));
    
    setPowerLines(generatePowerLines(8, {
      colors: {
        accent: '#00FF9D'
      }
    }));
  }, []);

  const handleEnter = () => {
    setShowIntro(false);
  };

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroScreen
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Grid />
            
            {/* Animated hexagons */}
            {hexagons.map((hex) => (
              <Hexagon
                key={`hex-${hex.id}`}
                size={hex.size}
                opacity={hex.opacity}
                color={hex.color}
                initial={{ 
                  x: `${hex.x}vw`, 
                  y: `${hex.y}vh`,
                  scale: 0,
                  rotate: 0
                }}
                animate={{ 
                  x: [`${hex.x}vw`, `${(hex.x + 5) % 100}vw`, `${(hex.x - 3) % 100}vw`],
                  y: [`${hex.y}vh`, `${(hex.y - 5) % 100}vh`, `${(hex.y + 3) % 100}vh`],
                  scale: [0, 1, 0.8, 1],
                  rotate: [0, hex.rotate, hex.rotate/2, hex.rotate],
                  opacity: [0, hex.opacity, hex.opacity/2, hex.opacity]
                }}
                transition={{ 
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: hex.duration,
                  delay: hex.delay,
                  ease: "easeInOut"
                }}
              />
            ))}
            
            {/* Power lines */}
            {powerLines.map((line) => (
              <PowerLine
                key={`line-${line.id}`}
                style={{
                  width: `${line.width}vw`,
                  left: `${line.x}vw`,
                  top: `${line.y}vh`,
                  opacity: 0
                }}
                animate={{
                  opacity: [0, line.opacity, line.opacity, 0],
                  width: [`${line.width * 0.5}vw`, `${line.width}vw`, `${line.width * 1.2}vw`, `${line.width * 0.8}vw`]
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: line.duration,
                  delay: line.delay,
                  ease: "easeInOut"
                }}
              />
            ))}
            
            <GlowingOrb
              initial={{ scale: 0.8, opacity: 0, x: "-50%", y: "-50%" }}
              animate={{ 
                scale: [0.8, 1.2, 0.9, 1.1],
                opacity: [0, 0.7, 0.5, 0.8],
                x: "-50%",
                y: "-50%"
              }}
              style={{
                left: "50%",
                top: "50%"
              }}
              transition={{ 
                repeat: Infinity,
                repeatType: "reverse",
                duration: 8,
                ease: "easeInOut"
              }}
            />
            
            <IntroContent>
              <IntroTitle
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
              >
                Welcome to my <span>Portfolio</span>
              </IntroTitle>
              
              <IntroSubtitle
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Embark on a journey through my projects, skills, and experiences
              </IntroSubtitle>
              
              <EnterButton
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.6, 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(0, 255, 157, 0.8)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnter}
              >
                Enter
              </EnterButton>
            </IntroContent>
          </IntroScreen>
        ) : (
          <AppContainer key="portfolio">
            <Navbar />
            <MainContent
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Contact />
            </MainContent>
            <Footer />
          </AppContainer>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  );
}

export default App;