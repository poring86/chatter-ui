import { useQuery } from "@apollo/client";
import { graphql } from "../gql";

export const getChatsDocument = graphql(`
  query Chats {
    chats {
      _id
      name
      isPrivate
    }
  }
`);

const useGetChats = () => {
  return useQuery(getChatsDocument);
};

export { useGetChats };
