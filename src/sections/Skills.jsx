import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHtml5, faCss3Alt, faJs, faReact, faNode, faPython,
  faGit, faDocker, faAws, faUnity
} from '@fortawesome/free-brands-svg-icons';
import { 
  faDatabase, faCode, faGamepad, faBrain,
  faRobot, faCubes, faWandMagicSparkles, faFire,
  faShield, faStar, faHeart, faLightbulb, faBolt
} from '@fortawesome/free-solid-svg-icons';

const SkillsSection = styled.section`
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
    bottom: 0;
    background: 
      radial-gradient(circle at 30% 20%, ${({ theme }) => theme.colors.accent}15 0%, transparent 40%),
      radial-gradient(circle at 70% 80%, ${({ theme }) => theme.colors.background.secondary}20 0%, transparent 35%);
    z-index: 1;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const Title = styled(motion.h2)`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: clamp(2.5rem, 5vw, ${({ theme }) => theme.fontSizes['5xl']});
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4rem;
  text-transform: uppercase;
  letter-spacing: 4px;
  text-shadow: 0 0 10px ${({ theme }) => theme.colors.accent}50;

  span {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const CharacterSheet = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 2rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const CharacterProfile = styled(motion.div)`
  background: ${({ theme }) => `linear-gradient(
    135deg,
    ${theme.colors.background.secondary}90 0%,
    ${theme.colors.background.dark}95 100%
  )`};
  border: 2px solid ${({ theme }) => theme.colors.accent}30;
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 2rem;
  width: 100%;
  max-width: 350px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: ${({ theme }) => theme.colors.gradient.primary};
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const CharacterAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  border: 3px solid ${({ theme }) => theme.colors.background.dark};
  box-shadow: 0 0 20px ${({ theme }) => theme.colors.accent}50;
  
  svg {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.background.dark};
  }
`;

const CharacterName = styled.h3`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const CharacterClass = styled.div`
  font-family: ${({ theme }) => theme.fonts.accent};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.accent};
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const CharacterLevel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
  
  span {
    font-family: ${({ theme }) => theme.fonts.secondary};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    color: ${({ theme }) => theme.colors.text};
    margin-left: 0.5rem;
  }
`;

const BaseStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background.dark};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.accent}50;
  
  svg {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const StatName = styled.div`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const StatValue = styled.div`
  font-family: ${({ theme }) => theme.fonts.code};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
`;

const SkillsContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SkillTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: flex-start;
  }
`;

const SkillTab = styled.button`
  background: ${({ active, theme }) => active 
    ? theme.colors.accent 
    : theme.colors.background.secondary};
  color: ${({ active, theme }) => active 
    ? theme.colors.background.dark 
    : theme.colors.textSecondary};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    background: ${({ active, theme }) => active 
      ? theme.colors.accent 
      : theme.colors.background.light};
    transform: translateY(-2px);
  }
`;

const SkillsList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SkillCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.secondary}80;
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;
  border-left: 4px solid ${({ theme, color }) => color || theme.colors.accent};
  
  &:hover {
    transform: translateX(5px);
    background: ${({ theme }) => theme.colors.background.secondary};
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const SkillIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: ${({ theme, color }) => color || theme.colors.accent}20;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    font-size: 1.8rem;
    color: ${({ theme, color }) => color || theme.colors.accent};
  }
`;

const SkillInfo = styled.div`
  flex: 1;
`;

const SkillName = styled.h4`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.25rem;
`;

const SkillType = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SkillLevel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SkillStars = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const Star = styled.div`
  color: ${({ filled, theme }) => filled 
    ? theme.colors.accent 
    : theme.colors.background.light};
  font-size: 1rem;
`;

const Skills = () => {
  const [activeTab, setActiveTab] = useState('frontend');
  
  const characterStats = {
    strength: 85,
    intelligence: 92,
    creativity: 88,
    speed: 90
  };
  
  const skillCategories = {
    frontend: {
      title: 'Frontend',
      color: '#00FF9D',
      skills: [
        { name: 'React', icon: faReact, level: 5, type: 'Component Architecture' },
        { name: 'JavaScript', icon: faJs, level: 5, type: 'Language Mastery' },
        { name: 'CSS3', icon: faCss3Alt, level: 4, type: 'Styling & Animation' },
        { name: 'HTML5', icon: faHtml5, level: 5, type: 'Semantic Markup' }
      ]
    },
    backend: {
      title: 'Backend',
      color: '#7C4DFF',
      skills: [
        { name: 'Node.js', icon: faNode, level: 4, type: 'Server Runtime' },
        { name: 'Python', icon: faPython, level: 4, type: 'Scripting & Automation' },
        { name: 'Databases', icon: faDatabase, level: 4, type: 'Data Management' },
        { name: 'API Design', icon: faCode, level: 4, type: 'RESTful & GraphQL' }
      ]
    },
    tools: {
      title: 'Tools & Tech',
      color: '#FF9D00',
      skills: [
        { name: 'Git', icon: faGit, level: 5, type: 'Version Control' },
        { name: 'Docker', icon: faDocker, level: 3, type: 'Containerization' },
        { name: 'AWS', icon: faAws, level: 3, type: 'Cloud Services' },
        { name: 'Unity', icon: faUnity, level: 4, type: 'Game Development' }
      ]
    }
  };
  
  const renderStars = (level) => {
    return Array(5).fill(0).map((_, index) => (
      <Star key={index} filled={index < level}>
        <FontAwesomeIcon icon={faStar} />
      </Star>
    ));
  };

  return (
    <SkillsSection id="skills">
      <Container>
        <Title
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Character <span>Stats</span>
        </Title>
        
        <CharacterSheet
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <CharacterProfile
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ProfileHeader>
              <CharacterAvatar>
                <FontAwesomeIcon icon={faGamepad} />
              </CharacterAvatar>
              <CharacterName>Developer</CharacterName>
              <CharacterClass>Full-Stack Mage</CharacterClass>
             
            </ProfileHeader>
            
            <BaseStats>
              <StatItem>
                <StatIcon>
                  <FontAwesomeIcon icon={faBolt} />
                </StatIcon>
                <StatName>Strength</StatName>
                <StatValue>{characterStats.strength}</StatValue>
              </StatItem>
              <StatItem>
                <StatIcon>
                  <FontAwesomeIcon icon={faBrain} />
                </StatIcon>
                <StatName>Innovative</StatName>
                <StatValue>{characterStats.intelligence}</StatValue>
              </StatItem>
              <StatItem>
                <StatIcon>
                  <FontAwesomeIcon icon={faLightbulb} />
                </StatIcon>
                <StatName>Creativity</StatName>
                <StatValue>{characterStats.creativity}</StatValue>
              </StatItem>
              <StatItem>
                <StatIcon>
                  <FontAwesomeIcon icon={faFire} />
                </StatIcon>
                <StatName>Speed</StatName>
                <StatValue>{characterStats.speed}</StatValue>
              </StatItem>
            </BaseStats>
          </CharacterProfile>
          
          <SkillsContainer
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <SkillTabs>
              {Object.keys(skillCategories).map(category => (
                <SkillTab
                  key={category}
                  active={activeTab === category}
                  onClick={() => setActiveTab(category)}
                >
                  {skillCategories[category].title}
                </SkillTab>
              ))}
            </SkillTabs>
            
            <SkillsList
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {skillCategories[activeTab].skills.map((skill, index) => (
                <SkillCard
                  key={skill.name}
                  color={skillCategories[activeTab].color}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.3,
                        ease: "easeOut"
                      }
                    }
                  }}
                >
                  <SkillIcon color={skillCategories[activeTab].color}>
                    <FontAwesomeIcon icon={skill.icon} />
                  </SkillIcon>
                  <SkillInfo>
                    <SkillName>{skill.name}</SkillName>
                    <SkillType>{skill.type}</SkillType>
                    <SkillLevel>
                      <SkillStars>
                        {renderStars(skill.level)}
                      </SkillStars>
                    </SkillLevel>
                  </SkillInfo>
                </SkillCard>
              ))}
            </SkillsList>
          </SkillsContainer>
        </CharacterSheet>
      </Container>
    </SkillsSection>
  );
};

export default Skills; 