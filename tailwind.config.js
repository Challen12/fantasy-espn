/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "colors": {
        "on-primary-fixed": "#161e00",
        "secondary-container": "#af8d11",
        "on-error-container": "#ffdad6",
        "on-primary": "#283500",
        "on-tertiary-container": "#006f77",
        "on-secondary": "#3c2f00",
        "tertiary-fixed-dim": "#00dbe9",
        "secondary-fixed-dim": "#e9c349",
        "secondary-fixed": "#ffe088",
        "primary-fixed": "#c3f400",
        "on-primary-fixed-variant": "#3c4d00",
        "on-tertiary-fixed-variant": "#004f54",
        "surface": "#131313",
        "primary-fixed-dim": "#abd600",
        "on-secondary-fixed": "#241a00",
        "outline-variant": "#444933",
        "surface-bright": "#3a3939",
        "tertiary": "#ffffff",
        "background": "#131313",
        "on-secondary-container": "#342800",
        "tertiary-fixed": "#7df4ff",
        "surface-dim": "#131313",
        "primary-container": "#c3f400",
        "inverse-on-surface": "#313030",
        "outline": "#8e9379",
        "surface-container-high": "#2a2a2a",
        "surface-container": "#201f1f",
        "secondary": "#e9c349",
        "surface-container-highest": "#353534",
        "on-surface": "#e5e2e1",
        "on-tertiary-fixed": "#002022",
        "inverse-primary": "#506600",
        "on-surface-variant": "#c4c9ac",
        "surface-tint": "#abd600",
        "tertiary-container": "#7df4ff",
        "error": "#ffb4ab",
        "on-error": "#690005",
        "on-primary-container": "#556d00",
        "on-tertiary": "#00363a",
        "on-secondary-fixed-variant": "#574500",
        "inverse-surface": "#e5e2e1",
        "on-background": "#e5e2e1",
        "primary": "#ffffff",
        "surface-container-lowest": "#0e0e0e",
        "error-container": "#93000a",
        "surface-container-low": "#1c1b1b",
        "surface-variant": "#353534"
      },
      "borderRadius": {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      "spacing": {
        "unit": "4px",
        "margin-page": "40px",
        "container-padding": "16px",
        "stack-md": "16px",
        "stack-lg": "32px",
        "gutter": "24px",
        "stack-sm": "8px"
      },
      "fontFamily": {
        "body-main": ["Inter", "sans-serif"],
        "label-caps": ["Inter", "sans-serif"],
        "data-tabular": ["Inter", "sans-serif"],
        "display-lg": ["Inter", "sans-serif"],
        "headline-md": ["Inter", "sans-serif"]
      },
      "fontSize": {
        "body-main": ["16px", {"lineHeight": "1.6", "letterSpacing": "0", "fontWeight": "400"}],
        "label-caps": ["12px", {"lineHeight": "1", "letterSpacing": "0.1em", "fontWeight": "700"}],
        "data-tabular": ["14px", {"lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "600"}],
        "display-lg": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "800"}],
        "headline-md": ["24px", {"lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "700"}]
      }
    }
  },
  plugins: [],
}
