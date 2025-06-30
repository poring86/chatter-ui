import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { API_URL } from "./urls";
import excludedRoutes from "./excluded-routes";
import { onLogout } from "../utils/logout";

const logoutLink = onError((error) => {
  const statusCode = (
    error.graphQLErrors?.[0]?.extensions?.originalError as {
      statusCode?: number;
    }
  )?.statusCode;

  if (statusCode === 401) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      onLogout();
    }
  }
});

const httpLink = new HttpLink({ uri: `${API_URL}/graphql` });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: "include",
  link: logoutLink.concat(httpLink),
});

export default client;
