import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import MainContainer from "./components/DataProvider";
import MainContainer from "./components/comp_main_container";
import { ThemeProvider } from "@mui/material/styles";
import { mainTheme } from "./mui_configurations/themes/main_theme";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={mainTheme}>
          <MainContainer />
        </ThemeProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}

export default App;
