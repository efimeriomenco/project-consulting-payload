/**
 * Theme constants for CSS variables
 * These values are used throughout the application for styling
 */
export const themeConstants = {
  // Brand Colors (Hex values)
  brandPrimary: '#1A3275',
  brandSecondary: '#E5EBF1',
  brandAccent: '#051229',
  brandTextMuted: '#676E7A', // For page links like "Despre noi", "Noutati", etc.
  
  // Primary Colors (HSL for CSS variables)
  // Primary: #1A3275 converted to HSL
  primary: '222 64% 28%',
  primaryForeground: '210 40% 98%',
  
  // Secondary Colors (HSL for CSS variables)
  // Secondary: #E5EBF1 converted to HSL
  secondary: '210 29% 93%',
  secondaryForeground: '222 64% 28%',
  
  // Accent Color (HSL for CSS variables)
  // Accent: #051229 converted to HSL
  accent: '222 75% 9%',
  accentForeground: '210 40% 98%',
  
  // Text Muted Color (HSL for CSS variables)
  // Text Muted: #676E7A converted to HSL
  textMuted: '218 8% 45%',
  
  // Background Colors
  background: '0 0% 100%',
  foreground: '222.2 84% 4.9%',
  
  // Component Colors
  card: '240 5% 96%',
  cardForeground: '222.2 84% 4.9%',
  muted: '210 40% 96.1%',
  mutedForeground: '215.4 16.3% 46.9%',
  destructive: '0 84.2% 60.2%',
  destructiveForeground: '210 40% 98%',
  border: '240 6% 90%',
  input: '214.3 31.8% 91.4%',
  ring: '222.2 84% 4.9%',
  
  // Status Colors
  success: '196 52% 74%',
  warning: '34 89% 85%',
  error: '10 100% 86%',
  
  // Dark Theme Colors
  darkBackground: '0 0% 0%',
  darkForeground: '210 40% 98%',
  darkPrimary: '210 40% 98%',
  darkPrimaryForeground: '222.2 47.4% 11.2%',
  darkSecondary: '217.2 32.6% 17.5%',
  darkSecondaryForeground: '210 40% 98%',
  darkCard: '240 6% 10%',
  darkCardForeground: '210 40% 98%',
  darkMuted: '217.2 32.6% 17.5%',
  darkMutedForeground: '215 20.2% 65.1%',
  darkAccent: '217.2 32.6% 17.5%',
  darkAccentForeground: '210 40% 98%',
  darkDestructive: '0 62.8% 30.6%',
  darkDestructiveForeground: '210 40% 98%',
  darkBorder: '240 4% 16%',
  darkInput: '217.2 32.6% 17.5%',
  darkRing: '212.7 26.8% 83.9%',
  darkSuccess: '196 100% 14%',
  darkWarning: '34 51% 25%',
  darkError: '10 39% 43%',
} as const

/**
 * Generate CSS variables string from theme constants
 */
export function generateThemeCSS(): string {
  return `
    :root {
      --background: ${themeConstants.background};
      --foreground: ${themeConstants.foreground};
      --card: ${themeConstants.card};
      --card-foreground: ${themeConstants.cardForeground};
      --popover: ${themeConstants.background};
      --popover-foreground: ${themeConstants.foreground};
      --primary: ${themeConstants.primary};
      --primary-foreground: ${themeConstants.primaryForeground};
      --secondary: ${themeConstants.secondary};
      --secondary-foreground: ${themeConstants.secondaryForeground};
      --muted: ${themeConstants.muted};
      --muted-foreground: ${themeConstants.mutedForeground};
      --accent: ${themeConstants.accent};
      --accent-foreground: ${themeConstants.accentForeground};
      --destructive: ${themeConstants.destructive};
      --destructive-foreground: ${themeConstants.destructiveForeground};
      --border: ${themeConstants.border};
      --input: ${themeConstants.input};
      --ring: ${themeConstants.ring};
      --radius: 0.2rem;
      --success: ${themeConstants.success};
      --warning: ${themeConstants.warning};
      --error: ${themeConstants.error};
      --text-muted: ${themeConstants.textMuted};
    }
  `
}
