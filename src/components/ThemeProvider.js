'use client';

import { useEffect } from 'react';
const theme = process.env.IW_THEME;

export default function ThemeProvider() {

  useEffect(() => {
    if (theme) {
      import(`../themes/${theme}/main.css`)
        .then((module) => {
          const style = document.createElement('style');
          style.innerHTML = module.default;
          document.head.appendChild(style);
        })
        .catch((err) => console.error(`Failed to load theme: ${theme}`, err));
    }
  }, [theme]);

  return null;
}
