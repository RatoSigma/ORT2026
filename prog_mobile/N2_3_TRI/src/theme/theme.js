export function getTheme(darkMode) {
  if (darkMode) {
    return {
      background: '#0c1426',
      surface: '#1b283d',
      inputBackground: '#101a2c',
      border: '#2c3b52',
      primary: '#10bd88',
      danger: '#f16f75',
      textPrimary: '#f2f4f7',
      textSecondary: '#91a4bd',
      tabBackground: '#1b283d',
      statusBar: 'light',
    };
  }

  return {
    background: '#f4f6f9',
    surface: '#ffffff',
    inputBackground: '#ffffff',
    border: '#cbd3de',
    primary: '#087f5b',
    danger: '#c74750',
    textPrimary: '#172235',
    textSecondary: '#5f6e82',
    tabBackground: '#ffffff',
    statusBar: 'dark',
  };
}
