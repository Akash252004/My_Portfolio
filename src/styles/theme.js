const theme = {
  colors: {
    primary: '#0A0F1C',  // Deep space blue
    secondary: '#1A1F2E', // Dark slate
    accent: '#00FF9D',   // Neon green
    accentLight: '#7AFFC7', // Light neon green
    accentDark: '#00CC7D', // Dark neon green
    text: '#FFFFFF',     // Pure white
    textSecondary: '#B4B4B4', // Light gray
    success: '#00FF9D',  // Neon green
    error: '#FF3D3D',    // Neon red
    warning: '#FFD700',  // Gold
    background: {
      primary: '#0A0F1C',
      secondary: '#1A1F2E',
      dark: '#050A12',
      light: '#2A2F3E'
    },
    gradient: {
      primary: 'linear-gradient(135deg, #00FF9D 0%, #7AFFC7 50%, #00CC7D 100%)',
      secondary: 'linear-gradient(135deg, #0A0F1C 0%, #1A1F2E 100%)',
      accent: 'linear-gradient(45deg, #00FF9D 0%, #7AFFC7 100%)',
      dark: 'linear-gradient(135deg, #050A12 0%, #0A0F1C 100%)',
      neon: '0 0 10px rgba(0, 255, 157, 0.5), 0 0 20px rgba(0, 255, 157, 0.3), 0 0 30px rgba(0, 255, 157, 0.1)'
    }
  },
  fonts: {
    primary: "'Rajdhani', sans-serif",     // Modern, tech-looking font
    secondary: "'Orbitron', sans-serif",   // Futuristic gaming font
    accent: "'Syncopate', sans-serif",     // Bold, modern font
    code: "'Fira Code', monospace"         // Coding font
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  transitions: {
    fast: '0.2s ease',
    medium: '0.3s ease',
    slow: '0.5s ease',
    bounce: '0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },
  shadows: {
    sm: '0 0 10px rgba(0, 255, 157, 0.2)',
    md: '0 0 20px rgba(0, 255, 157, 0.3)',
    lg: '0 0 30px rgba(0, 255, 157, 0.4)',
    xl: '0 0 40px rgba(0, 255, 157, 0.5)',
    '2xl': '0 0 50px rgba(0, 255, 157, 0.6)',
    inner: 'inset 0 2px 4px 0 rgba(0, 255, 157, 0.1)',
    none: 'none'
  },
  radii: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  }
};

export default theme; 