import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Branding from "./Branding";
import MobileNavigation from "./mobile/MobileNavigation";
import MobileBranding from "./mobile/MobileBranding";
import Navigation from "./Navigation";
import Settings from "./Settings";
import { useQuery, gql } from "@apollo/client";

import { Page } from "../../interfaces/page.interface";

const pages: Page[] = [
  {
    title: "Home",
    path: "/",
  },
];

const unauthenticatedPages: Page[] = [
  {
    title: "Login",
    path: "/login",
  },
  {
    title: "Signup",
    path: "/signup",
  },
];

const ME_QUERY = gql`
  query Me {
    me {
      _id
      email
    }
  }
`;

const Header = () => {
  const { data, loading } = useQuery(ME_QUERY, {
    fetchPolicy: "network-only",
  });

  const authenticated = !!data?.me;

  console.log('authenticated', authenticated)

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Branding />
          <MobileNavigation
            pages={authenticated ? pages : unauthenticatedPages}
          />
          <MobileBranding />
          <Navigation pages={authenticated ? pages : unauthenticatedPages} />
          {authenticated && <Settings />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
