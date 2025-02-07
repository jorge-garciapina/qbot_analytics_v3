//TODO: THE VARIANTS MUST BE DEFINED ON THE typesConfig.d.ts FILE

// IN ORDER TO USE THIS, INSTALL:
// npm install @fontsource/roboto
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { lime, purple } from "@mui/material/colors";
// import { lime, purple, green, orange } from "@mui/material/colors";

import { createTheme } from "@mui/material/styles";

// Create a itemBoardTheme instance
export const mainTheme = createTheme({
  palette: {
    primary: {
      main: lime[500],
      light: lime[300],
      dark: lime[700],
    },
    secondary: {
      main: purple[500],
      light: purple[300],
      dark: purple[700],
    },
  },

  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    // In order to include variants, fo to the typesConfig.d.ts file and include them
    modalChartTitle: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#333", // Example color
    },
    modalChartText: {
      fontSize: "1rem",
      fontWeight: 700,
      color: "#333", // Example color
    },
  },
});
