import React, { createContext, useContext, useState } from 'react';

// Create a context
const ThemeContext = createContext();

// Provider component
export const ThemeProvider = ({ children }) => {
  const [isNightMode, setIsNightMode] = useState(false); // State to hold night mode status

  // Toggle function
  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };

  return (
    <ThemeContext.Provider value={{ isNightMode, toggleNightMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use theme context
export const useTheme = () => useContext(ThemeContext);
