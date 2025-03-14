import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { 
  faGamepad, faGlobe, faCode, faArrowUpRightFromSquare,
  faShieldHalved, faDragon, faWandMagicSparkles, faCrown,
  faScroll, faGem, faChess, faFilter, faSort, faEye, faLock
} from '@fortawesome/free-solid-svg-icons';

// Holographic and futuristic styled components
const ProjectsSection = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem;
  background: #050A14;
  position: relative;
  overflow: hidden;
  perspective: 1000px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(135deg, rgba(0, 255, 157, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 70% 20%, rgba(0, 255, 157, 0.05) 0%, transparent 40%),
      radial-gradient(circle at 30% 80%, rgba(0, 100, 255, 0.05) 0%, transparent 35%);
    z-index: 1;
  }
`;

const HologramGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(0, 255, 157, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 157, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.2;
  z-index: 1;
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
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 4px;
  text-shadow: 0 0 15px ${({ theme }) => theme.colors.accent}80;

  span {
    color: ${({ theme }) => theme.colors.accent};
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background: ${({ theme }) => theme.colors.accent};
      box-shadow: 0 0 10px ${({ theme }) => theme.colors.accent}, 
                 0 0 20px ${({ theme }) => theme.colors.accent};
    }
  }
`;

const Subtitle = styled(motion.p)`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const ControlPanel = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem 2rem;
  background: rgba(0, 255, 157, 0.05);
  border: 1px solid rgba(0, 255, 157, 0.1);
  border-radius: ${({ theme }) => theme.radii.lg};
  backdrop-filter: blur(5px);
  box-shadow: 0 0 20px rgba(0, 255, 157, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const FilterButton = styled(motion.button)`
  background: ${props => props.active ? 'rgba(0, 255, 157, 0.2)' : 'rgba(0, 255, 157, 0.05)'};
  color: ${props => props.active ? ({ theme }) => theme.colors.accent : ({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${props => props.active ? ({ theme }) => theme.colors.accent : 'rgba(0, 255, 157, 0.1)'};
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.radii.md};
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: ${props => props.active ? '0 0 10px rgba(0, 255, 157, 0.3)' : 'none'};

  &:hover {
    background: rgba(0, 255, 157, 0.15);
    border-color: rgba(0, 255, 157, 0.3);
  }
`;

const SortContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const SortButton = styled(motion.button)`
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  border: none;
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;

  &:hover, &.active {
    color: ${({ theme }) => theme.colors.accent};
  }

  &.active {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  perspective: 1000px;
  min-height: 300px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: rgba(10, 20, 35, 0.7);
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  border: 1px solid rgba(0, 255, 157, 0.1);
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 255, 157, 0.1) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: -100%;
    left: -100%;
    right: -100%;
    bottom: -100%;
    background: radial-gradient(circle at 50% 50%, rgba(0, 255, 157, 0.1), transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
    border-color: rgba(0, 255, 157, 0.3);
    box-shadow: 
      0 15px 35px rgba(0, 0, 0, 0.3),
      0 0 20px rgba(0, 255, 157, 0.3);
    
    &::before {
      opacity: 1;
    }
    
    &::after {
      opacity: 0.5;
    }

    .project-image {
      transform: translateZ(20px) scale(1.05);
    }

    .project-content {
      transform: translateZ(30px);
    }

    .project-links {
      opacity: 1;
      transform: translateZ(40px);
    }
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  background: url(${props => props.image}) center/cover;
  position: relative;
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  transform-style: preserve-3d;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(10, 20, 35, 0.9) 100%
    );
  }
`;

const ProjectStatus = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  background: ${props => props.completed ? 'rgba(0, 255, 157, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.completed ? '#00FF9D' : '#FFFFFF'};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-family: ${({ theme }) => theme.fonts.secondary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  backdrop-filter: blur(5px);
  border: 1px solid ${props => props.completed ? 'rgba(0, 255, 157, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  position: relative;
  z-index: 2;
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  transform-style: preserve-3d;
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ProjectIcon = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.accent};
  filter: drop-shadow(0 0 5px ${({ theme }) => theme.colors.accent}50);
`;

const ProjectInfo = styled.div`
  flex: 1;
`;

const ProjectTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

const ProjectType = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.secondary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.text}cc;
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechBadge = styled.span`
  background: rgba(0, 255, 157, 0.1);
  color: ${({ theme }) => theme.colors.accent};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-family: ${({ theme }) => theme.fonts.secondary};
  letter-spacing: 1px;
  border: 1px solid rgba(0, 255, 157, 0.2);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 255, 157, 0.2);
    box-shadow: 0 0 10px rgba(0, 255, 157, 0.3);
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  opacity: 0.8;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  transform-style: preserve-3d;

  a {
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &:hover {
      color: ${({ theme }) => theme.colors.accent};
      transform: scale(1.1);
      text-shadow: 0 0 10px ${({ theme }) => theme.colors.accent};
    }
  }
`;

const EmptyState = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  
  svg {
    font-size: 4rem;
    color: ${({ theme }) => theme.colors.accent}50;
    margin-bottom: 2rem;
  }
  
  h3 {
    font-family: ${({ theme }) => theme.fonts.secondary};
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 1rem;
  }
  
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    max-width: 500px;
  }
`;

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  const projects = [
    {
      id: 1,
      title: "Chat Application",
      type: "Web Application",
      category: "Communication",
      icon: faGamepad,
      description: "A chat application is a software tool that allows users to communicate in real-time through text messages over the internet.",
      image: "https://via.placeholder.com/600x400?text=Neon+Horizon",
      tech: ["HTML", "CSS", "SQL", "PHP", "JavaScript"],
      github: "https://github.com/Akash252004/Chat_Application",
      live: "https://neon-horizon.demo.com",
      completed: true,
      date: "2024-05-15"
    },
    {
      id: 2,
      title: "Employee Burnout Prediction",
      type: "Predictive Modeling",
      category: "Machine Learning",
      icon: faGlobe,
      description: "An employee burnout prediction project uses data analysis and machine learning to forecast the risk of burnout among employees, enabling organizations to implement proactive measures for employee well-being.  .",
      image: "https://via.placeholder.com/600x400?text=HoloCraft",
      tech: ["Data Visualization Tools", "Database Management", "Git"],
      github: "https://github.com/Akash252004/Employee-burnout-prediction",
      live: "https://holocraft.demo.com",
      completed: true,
      date: "2023-08-24"
    },
    {
      id: 3,
      title: "Snap and Cook",
      type: "Development Tool",
      category: "tool",
      icon: faWandMagicSparkles,
      description: "Snap and Cook is an image-based recipe finder that suggests recipes by analyzing uploaded photos of ingredients or dishes.",
      image: "https://via.placeholder.com/600x400?text=Quantum+Engine",
      tech: ["HTML", "CSS", "OpenCV", "Python","JavaScript","TensorFlow","PyTorch"],
      github: "#",
      live: null,
      completed: false,
      date: "2023-10-05"
    },
    {
      id: 4,
      title: "Payroll Management System",
      type: "Business Management",
      category: "web",
      icon: faDragon,
      description: "A payroll project is a business management software system that automates employee compensation processes, including salary calculations, tax deductions, and reporting.",
      image: "https://via.placeholder.com/600x400?text=Neural+Nexus",
      tech: ["C++", "File Handling", "Node.js", "MongoDB"],
      github: "https://github.com/Akash252004/Payroll-Management-",
      live: "#",
      completed: true,
      date: "2024-02-10"
    },
    {
      id: 4,
      title: "Churn Predection",
      type: "Machine Learning",
      category: "AI",
      icon: faDragon,
      description: "Churn prediction analyzes customer data to forecast the likelihood of them leaving a service, helping businesses improve retention strategies.",
      image: "https://via.placeholder.com/600x400?text=Neural+Nexus",
      tech: ["Python", "Scikit-learn", "TensorFlow", "MongoDB"],
      github: "#",
      live: "#",
      completed: true,
      date: "2024-02-10"
    },
   
  ];

  // Update filtered projects whenever filter or sort changes
  useEffect(() => {
    // Filter projects based on selected category
    let filtered = [...projects];
    
    if (filter !== 'all') {
      if (filter === 'completed') {
        filtered = filtered.filter(project => project.completed);
      } else if (filter === 'in-progress') {
        filtered = filtered.filter(project => !project.completed);
      } else {
        filtered = filtered.filter(project => project.category === filter);
      }
    }
    
    // Sort projects based on selected sort method
    if (sort === 'newest') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sort === 'oldest') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sort === 'a-z') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'z-a') {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }
    
    setFilteredProjects(filtered);
  }, [filter, sort]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const handleCardHover = (id) => {
    setHoveredCard(id);
  };

  const handleFilterChange = (newFilter) => {
    setHoveredCard(null); // Reset hover state when changing filters
    setFilter(newFilter);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  return (
    <ProjectsSection id="projects">
      <HologramGrid />
      <Container>
        <Title
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Project <span>Showcase</span>
        </Title>
        
        <Subtitle
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explore my digital creations and technical innovations
        </Subtitle>
        
        <ControlPanel
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <FilterContainer>
            <FontAwesomeIcon icon={faFilter} style={{ color: '#00FF9D' }} />
            <FilterButton 
              active={filter === 'all'} 
              onClick={() => handleFilterChange('all')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All
            </FilterButton>
            <FilterButton 
              active={filter === 'game'} 
              onClick={() => handleFilterChange('game')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faGamepad} /> Games
            </FilterButton>
            <FilterButton 
              active={filter === 'web'} 
              onClick={() => handleFilterChange('web')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faGlobe} /> Web
            </FilterButton>
            <FilterButton 
              active={filter === 'tool'} 
              onClick={() => handleFilterChange('tool')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faCode} /> Tools
            </FilterButton>
            <FilterButton 
              active={filter === 'completed'} 
              onClick={() => handleFilterChange('completed')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faEye} /> Completed
            </FilterButton>
            <FilterButton 
              active={filter === 'in-progress'} 
              onClick={() => handleFilterChange('in-progress')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faLock} /> In Progress
            </FilterButton>
          </FilterContainer>
          
          <SortContainer>
            <FontAwesomeIcon icon={faSort} style={{ color: '#00FF9D' }} />
            <SortButton 
              className={sort === 'newest' ? 'active' : ''}
              onClick={() => handleSortChange('newest')}
            >
              Newest
            </SortButton>
            <SortButton 
              className={sort === 'oldest' ? 'active' : ''}
              onClick={() => handleSortChange('oldest')}
            >
              Oldest
            </SortButton>
            <SortButton 
              className={sort === 'a-z' ? 'active' : ''}
              onClick={() => handleSortChange('a-z')}
            >
              A-Z
            </SortButton>
          </SortContainer>
        </ControlPanel>
        
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <ProjectsGrid
              key="projects-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
            >
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  variants={cardVariants}
                  onMouseEnter={() => handleCardHover(project.id)}
                  onMouseLeave={() => handleCardHover(null)}
                  style={{
                    transform: hoveredCard === project.id ? 'translateY(-10px) rotateX(5deg) rotateY(5deg)' : 'none'
                  }}
                >
                  <ProjectImage className="project-image" image={project.image}>
                    <ProjectStatus completed={project.completed}>
                      <FontAwesomeIcon icon={project.completed ? faEye : faLock} />
                      {project.completed ? 'Completed' : 'In Progress'}
                    </ProjectStatus>
                  </ProjectImage>
                  
                  <ProjectContent className="project-content">
                    <ProjectHeader>
                      <ProjectIcon>
                        <FontAwesomeIcon icon={project.icon} />
                      </ProjectIcon>
                      <ProjectInfo>
                        <ProjectTitle>{project.title}</ProjectTitle>
                        <ProjectType>
                          {project.type}
                        </ProjectType>
                      </ProjectInfo>
                    </ProjectHeader>
                    
                    <ProjectDescription>
                      {project.description}
                    </ProjectDescription>
                    
                    <TechStack>
                      {project.tech.map((tech, index) => (
                        <TechBadge key={index}>{tech}</TechBadge>
                      ))}
                    </TechStack>
                    
                    <ProjectLinks className="project-links">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} />
                      </a>
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </a>
                      )}
                    </ProjectLinks>
                  </ProjectContent>
                </ProjectCard>
              ))}
            </ProjectsGrid>
          ) : (
            <EmptyState
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FontAwesomeIcon icon={faFilter} />
              <h3>No projects found</h3>
              <p>Try changing your filter criteria to see more projects.</p>
            </EmptyState>
          )}
        </AnimatePresence>
      </Container>
    </ProjectsSection>
  );
};

export default Projects;