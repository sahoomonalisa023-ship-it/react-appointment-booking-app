import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#10645C",
      dark: "#093E39",
      light: "#E4F2F0",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#C9622A",
      dark: "#9C4A1E",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F3F7F6",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0D1B2A",
      secondary: "#5A6C69",
    },
    divider: "#DCE3E1",
    success: { main: "#2E8B57" },
    error: { main: "#C0392B" },
    warning: { main: "#B8860B" },
    info: { main: "#2C6FB0" },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h3: {
      fontFamily: '"Sora", sans-serif',
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h4: {
      fontFamily: '"Sora", sans-serif',
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h5: {
      fontFamily: '"Sora", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Sora", sans-serif',
      fontWeight: 600,
    },
    subtitle2: {
      fontFamily: '"IBM Plex Mono", monospace',
      letterSpacing: "0.09em",
      textTransform: "uppercase",
      fontSize: "0.72rem",
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow:
            "0 1px 2px rgba(13,27,42,0.06), 0 1px 0 rgba(13,27,42,0.04)",
          border: "1px solid #DCE3E1",
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          paddingLeft: 18,
          paddingRight: 18,
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 10px rgba(16,100,92,0.24)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "medium",
      },
    },
  },
});

export default theme;
