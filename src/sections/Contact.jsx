import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ContactSection = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem;
  background: ${({ theme }) => theme.colors.background.secondary};
  position: relative;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  text-align: center;
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.colors.gradient.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled(motion.p)`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 4rem;
  font-size: 1.2rem;
`;

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 4rem;
`;

const FormGroup = styled.div`
  position: relative;
`;

const Input = styled(motion.input)`
  width: 100%;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background.primary};
  border: 2px solid ${({ theme }) => theme.colors.background.light};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.2);
  }
`;

const TextArea = styled(Input).attrs({ as: 'textarea' })`
  min-height: 150px;
  resize: vertical;
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.gradient.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(99, 102, 241, 0.3);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <ContactSection id="contact">
      <Container>
        <Title
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Let's Connect
        </Title>
        <Subtitle
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Ready to start a new quest together? Drop me a message!
        </Subtitle>
        <Form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <FormGroup>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              whileFocus={{ scale: 1.01 }}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              whileFocus={{ scale: 1.01 }}
            />
          </FormGroup>
          <FormGroup>
            <TextArea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              whileFocus={{ scale: 1.01 }}
            />
          </FormGroup>
          <Button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Message
          </Button>
        </Form>
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
            href="mailto: akashsikhakolanu@gmail.com"
            whileHover={{ y: -3 }}
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </SocialLink>
        </SocialLinks>
      </Container>
    </ContactSection>
  );
};

export default Contact; 