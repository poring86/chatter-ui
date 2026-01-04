import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, ListItemButton } from "@mui/material";
import { alpha } from "@mui/material/styles";
import router from "../../Routes";
import { Chat } from "../../../gql/graphql";
import "./ChatListItem.css";

interface ChatListProps {
  chat: Chat;
  selected: boolean;
}

const ChatListItem = ({ chat, selected }: ChatListProps) => {
  return (
    <ListItem alignItems="flex-start" disablePadding sx={{ mb: 1 }}>
      <ListItemButton
        onClick={() => router.navigate(`/chats/${chat._id}`)}
        selected={selected}
        sx={{
          py: 1.5,
          borderRadius: 1.5,
          mx: 1,
          '&.Mui-selected': {
            boxShadow: 'none',
            backgroundColor: alpha("#ff00ff", 0.1),
            borderLeft: '4px solid #ff00ff'
          }
        }}
      >
        <ListItemAvatar>
          <Avatar
            src={chat.latestMessage?.user.imageUrl}
            sx={{ width: 48, height: 48 }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'white' }}>
              {chat.name}
            </Typography>
          }
          secondary={
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5rem",
                mt: 0.5,
                opacity: 0.8
              }}
            >
              <Typography
                sx={{ display: "inline", fontWeight: 700 }}
                component="span"
                variant="body2"
                color="primary.main"
              >
                {chat.latestMessage?.user.username || ""}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'white',
                  opacity: 0.6,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {chat.latestMessage?.content || ""}
              </Typography>
            </Box>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default ChatListItem;
