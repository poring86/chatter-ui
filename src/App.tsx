import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import GridRaw from "@mui/material/Grid";
import { RouterProvider } from "react-router-dom";
import router from "./components/Routes";
import { ApolloProvider } from "@apollo/client";
import client from "./constants/apollo-client";
import Guard from "./components/auth/Guard";
import Header from "./components/header/Header";
import Snackbar from "./components/snackbar/Snackbar";
import ChatList from "./components/chat-list/ChatList";
import { usePath } from "./hooks/usePath";

const Grid = GridRaw as unknown as React.ComponentType<any>;

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  const { path } = usePath();

  console.log('path', path)

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <ChatList />
        <Guard>
          {path === "/" ? (
            <Grid container>
              <Grid item xs={12} md={3}>
                <ChatList />
              </Grid>
              <Grid item xs={12} md={9}>
                <AppRoutes />
              </Grid>
            </Grid>
          ) : (
            <AppRoutes />
          )}
        </Guard>
        <Snackbar />
      </ThemeProvider>
    </ApolloProvider>
  );
};

const AppRoutes = () => (
  <Container>
    <RouterProvider router={router} />
  </Container>
);

export default App;
