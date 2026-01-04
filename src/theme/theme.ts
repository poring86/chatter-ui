import { createTheme, alpha } from "@mui/material/styles";

export const modernTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff00ff", // Magenta
    },
    secondary: {
      main: "#7000ff", // Purple
    },
    background: {
      default: "#0c0c14",
      paper: alpha("#1a1a2e", 0.7),
    },
    text: {
      primary: "#ffffff",
      secondary: alpha("#ffffff", 0.7),
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      background: "linear-gradient(45deg, #ff00ff 30%, #7000ff 90%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "radial-gradient(circle at 50% 50%, #1a1a2e 0%, #0c0c14 100%)",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: alpha("#1a1a2e", 0.6),
          backdropFilter: "blur(12px)",
          border: `1px solid ${alpha("#ffffff", 0.1)}`,
          boxShadow: `0 8px 32px 0 ${alpha("#000000", 0.37)}`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 12,
          padding: "10px 24px",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 0 15px rgba(255, 0, 255, 0.5)",
            transform: "translateY(-2px)",
          },
        },
        containedPrimary: {
          background: "linear-gradient(45deg, #ff00ff 30%, #a000ff 90%)",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: `2px solid ${alpha("#ff00ff", 0.5)}`,
          boxShadow: "0 0 10px rgba(255, 0, 255, 0.3)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          margin: "4px 8px",
          transition: "all 0.2s ease",
          "&.Mui-selected": {
            backgroundColor: alpha("#ff00ff", 0.15),
            borderLeft: "4px solid #ff00ff",
            "&:hover": {
              backgroundColor: alpha("#ff00ff", 0.25),
            },
          },
        },
      },
    },
  },
});
