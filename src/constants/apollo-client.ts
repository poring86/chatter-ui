import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { API_URL, WS_URL } from "./urls";
import excludedRoutes from "./excluded-routes";
import { onLogout } from "../utils/logout";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

// 1. --- Link de Erro (Logout 401) ---
const logoutLink = onError((error) => {
  if (
    error.graphQLErrors?.length &&
    (error.graphQLErrors[0].extensions?.originalError as any)?.statusCode ===
      401
  ) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      onLogout();
    }
  }
});

// 2. --- Link de Autenticação (Adiciona o Token no Header) ---
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("accessToken");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// 3. --- Link HTTP (Base) ---
const httpLink = new HttpLink({ uri: `${API_URL}/graphql` });

// 4. --- Link WebSocket (Subscriptions) ---
const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${WS_URL}/graphql`,
    connectionParams: () => {
      // Envia o token para autenticação do handshake WebSocket
      const token = localStorage.getItem("accessToken");
      return {
        Authorization: token ? `Bearer ${token}` : "",
      };
    },
  })
);

// 5. --- Link Encadeado Final ---
// O authLink deve ser encadeado no httpLink para que o header vá nas Queries/Mutations.
const httpAuthLink = authLink.concat(httpLink);

// 6. --- Link Split (Decisão de Rota) ---
const splitLink = split(
  // Função de teste: TRUE se for 'subscription'
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  // Se TRUE, usa o wsLink (para subscriptions)
  wsLink,
  // Se FALSE, usa o httpAuthLink (para queries e mutations)
  httpAuthLink
);

// 7. --- Cliente Apollo ---
const client = new ApolloClient({
  cache: new InMemoryCache(),
  // Encadeia o logoutLink ANTES do splitLink (para pegar erros de qualquer link)
  link: logoutLink.concat(splitLink),
});

export default client;
