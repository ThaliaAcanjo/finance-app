// globalStyles.ts

import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#007bff',
  secondary: '#6c757d',
  background: '#1C1C1E', //'#f9f9f9',
  background2: '#121212', 
  background3: '#161A1D',

  menuInferior: '#212528',

  text: '#333',
  white: '#fff',
  danger: '#dc3545',

  iconPlus: '#C46E6F', 
  icons: '#C1C4C7',
  textLabel: '#C1C4C7',
  textLabelWhite: '#fff',

  registerBackground: '#212528',
};

export const spacing = {
  xsmall: 2,
  small: 8,
  medium: 16,
  large: 24,
};

export const fontSizes = {
  small: 12,
  medium: 16,
  large: 20,
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background3,
    padding: spacing.xsmall,
    color: '#fff',
    width: '100%',
    height: '100%',    
  },
  title: {
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.medium,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.medium,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
  },
});
