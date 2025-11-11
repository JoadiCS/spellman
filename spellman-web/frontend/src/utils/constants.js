export const sections = ['hero', 'principles', 'projects', 'goals', 'join', 'footer'];

export const colors = {
  primary: {
    50: '#f0fdf4',
    300: '#86efac',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    900: '#14532d'
  },
  secondary: {
    blue: '#3b82f6',
    purple: '#a855f7',
    amber: '#f59e0b',
    cyan: '#06b6d4',
    pink: '#ec4899'
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    500: '#737373',
    900: '#171717'
  }
};

export const typography = {
  hero: 'text-5xl md:text-7xl font-bold',
  h1: 'text-4xl md:text-5xl font-bold',
  h2: 'text-3xl md:text-4xl font-bold',
  h3: 'text-2xl font-semibold',
  body: 'text-base md:text-lg',
  small: 'text-sm'
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};
