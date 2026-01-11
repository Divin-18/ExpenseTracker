export const COLORS = {
  // Primary Colors
  primary: '#6C63FF',
  primaryLight: '#8B84FF',
  primaryDark: '#4A42E8',
  
  // Secondary Colors
  secondary: '#FF6B9D',
  secondaryLight: '#FF8DB5',
  secondaryDark: '#E54A7D',
  
  // Background Colors
  background: '#0F0F1A',
  backgroundLight: '#1A1A2E',
  backgroundCard: '#16213E',
  
  // Text Colors
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0B2',
  textMuted: '#6B6B80',
  
  // Status Colors
  success: '#00D9A5',
  successLight: '#33E3BC',
  warning: '#FFB84D',
  warningLight: '#FFC875',
  danger: '#FF5757',
  dangerLight: '#FF7A7A',
  info: '#4DABF7',
  
  // Category Colors
  food: '#FF6B9D',
  transport: '#4DABF7',
  shopping: '#FFB84D',
  entertainment: '#00D9A5',
  bills: '#FF5757',
  health: '#8B84FF',
  education: '#FF8DB5',
  others: '#6B6B80',
  
  // Gradient Colors
  gradientStart: '#6C63FF',
  gradientEnd: '#FF6B9D',
  
  // Border & Shadow
  border: '#2A2A40',
  shadow: '#000000',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  glass: 'rgba(255, 255, 255, 0.1)',
};

export const GRADIENTS = {
  primary: ['#6C63FF', '#8B84FF'],
  secondary: ['#FF6B9D', '#FF8DB5'],
  income: ['#00D9A5', '#33E3BC'],
  expense: ['#FF5757', '#FF7A7A'],
  card: ['#1A1A2E', '#16213E'],
  header: ['#6C63FF', '#FF6B9D'],
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 8,
  },
};

export default COLORS;
