// Arquivo: cache/me.ts

import { ApolloCache, NormalizedCacheObject } from "@apollo/client";
import { getMeDocument } from "../hooks/useGetMe";
// 💡 CORREÇÃO: Importe o tipo correto 'UserFragmentFragment'
import { UserFragmentFragment } from "../gql/graphql";

// A função continua com a lógica de sobrescrever o objeto 'me' inteiro no cache.
export const updateMeObjectInCache = (
  cache: ApolloCache<NormalizedCacheObject>,
  // 💡 Use o tipo corrigido aqui
  updatedUser: UserFragmentFragment
) => {
  const meQueryOptions = { query: getMeDocument };

  cache.writeQuery({
    ...meQueryOptions,
    data: {
      me: updatedUser,
    },
  });
};
