import { AppBar, IconButton, Toolbar, Typography, Box } from "@mui/material";
import { alpha } from "@mui/material/styles";
import AddCircle from "@mui/icons-material/AddCircle";

interface ChatListHeaderProps {
  handleAddChat: () => void;
}

const ChatListHeader = ({ handleAddChat }: ChatListHeaderProps) => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        backgroundImage: "none",
        boxShadow: "none",
        borderBottom: `1px solid ${alpha("#ffffff", 0.1)}`,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, opacity: 0.9 }}>
          Messages
        </Typography>
        <IconButton
          size="medium"
          onClick={handleAddChat}
          sx={{
            background: "linear-gradient(45deg, #ff00ff 30%, #7000ff 90%)",
            color: 'white',
            '&:hover': {
              boxShadow: "0 0 15px rgba(255, 0, 255, 0.4)",
            }
          }}
        >
          <AddCircle sx={{ fontSize: 24 }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default ChatListHeader;
