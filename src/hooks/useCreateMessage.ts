import { useMutation } from "@apollo/client";
import { graphql } from "../gql";
import { getMessagesDocument } from "./useGetMessages";

export const createMessageDocument = graphql(`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      ...MessageFragment
    }
  }
`);

const useCreateMessage = (chatId: string) => {
  return useMutation(createMessageDocument, {
    update(cache, { data }) {
      if (!data?.createMessage) return;

      const messagesQueryOptions = {
        query: getMessagesDocument,
        variables: { chatId },
      };

      const messages = cache.readQuery(messagesQueryOptions);
      if (!messages) return;

      cache.writeQuery({
        ...messagesQueryOptions,
        data: {
          messages: [...messages.messages, data.createMessage],
        },
      });
    },
  });
};

export { useCreateMessage };
