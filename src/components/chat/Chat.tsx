import { useLocation, useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useEffect, useRef, useState } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";
import { PAGE_SIZE } from "../../constants/page-size";
import { useCountMessages } from "../../hooks/useCountMessages";
import InfiniteScroll from "react-infinite-scroller";

const Chat = () => {
  const params = useParams();
  const [message, setMessage] = useState("");
  const chatId = params._id!;
  const { data } = useGetChat({ _id: chatId });
  const [createMessage] = useCreateMessage();
  const { data: messages, fetchMore } = useGetMessages({
    chatId,
    skip: 0,
    limit: PAGE_SIZE,
  });
  const divRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const { messagesCount, countMessages } = useCountMessages(chatId);

  useEffect(() => {
    countMessages();
  }, [countMessages]);

  const scrollToBottom = () => divRef.current?.scrollIntoView();

  // Identifica o ID da última mensagem (a mais recente no tempo)
  const lastMessageId = messages?.messages.length
    ? [...messages.messages].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    ).pop()?._id
    : undefined;

  // Scrolla para o fundo sempre que uma NOVA mensagem chegar ou mudar de chat
  useEffect(() => {
    if (lastMessageId) {
      scrollToBottom();
    }
  }, [lastMessageId]);

  // Limpa o input quando trocar de chat
  useEffect(() => {
    setMessage("");
  }, [location.pathname]);

  const handleCreateMessage = async () => {
    await createMessage({
      variables: { createMessageInput: { content: message, chatId } },
    });
    setMessage("");
    scrollToBottom();
  };

  return (
    <Stack sx={{ height: "100%", justifyContent: "space-between", gap: 2 }}>
      <Typography variant="h1" sx={{ mb: 2 }}>{data?.chat.name}</Typography>
      <Box sx={{
        height: "70vh",
        overflow: "auto",
        pr: 1,
        '&::-webkit-scrollbar': { width: '6px' },
        '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(255, 0, 255, 0.2)', borderRadius: '10px' }
      }}>
        {/* @ts-ignore */}
        <InfiniteScroll
          pageStart={0}
          isReverse={true}
          loadMore={() =>
            fetchMore({ variables: { skip: messages?.messages.length || 0 } })
          }
          hasMore={
            messages && messagesCount
              ? messages.messages.length < messagesCount
              : false
          }
          useWindow={false}
        >
          {messages &&
            [...messages.messages]
              .sort(
                (messageA, messageB) =>
                  new Date(messageA.createdAt).getTime() -
                  new Date(messageB.createdAt).getTime()
              )
              .map((message) => (
                <Grid container alignItems="flex-start" marginBottom="1.5rem" spacing={2}>
                  <Grid item xs={2} lg={1}>
                    <Stack
                      spacing={1}
                      alignItems="center"
                    >
                      <Avatar
                        src={message.user.imageUrl}
                        sx={{ width: 44, height: 44 }}
                      />
                      <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 500 }}>
                        {message.user.username}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={10} lg={11}>
                    <Stack>
                      <Paper sx={{
                        width: "fit-content",
                        borderRadius: 2,
                        padding: "4px 8px"
                      }}>
                        <Typography sx={{ padding: "0.6rem 1rem", fontSize: "0.95rem" }}>
                          {message.content}
                        </Typography>
                      </Paper>
                      <Typography
                        variant="caption"
                        sx={{ marginLeft: "0.5rem", marginTop: "0.25rem", opacity: 0.5 }}
                      >
                        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              ))}
          <div ref={divRef}></div>
        </InfiniteScroll>
      </Box>
      <Paper
        sx={{
          p: "8px 16px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderRadius: 4,
          backgroundColor: alpha("#1a1a2e", 0.4),
          border: `1px solid ${alpha("#ff00ff", 0.3)}`,
          mb: 2
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, color: 'white' }}
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          placeholder="Type a message..."
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              await handleCreateMessage();
            }
          }}
        />
        <IconButton
          onClick={handleCreateMessage}
          color="primary"
          sx={{
            p: "8px",
            background: "linear-gradient(45deg, #ff00ff 30%, #7000ff 90%)",
            color: "white",
            "&:hover": {
              boxShadow: "0 0 15px rgba(255, 0, 255, 0.6)",
            }
          }}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
