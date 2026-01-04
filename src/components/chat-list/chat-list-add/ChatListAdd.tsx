import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useCreateChat } from "../../../hooks/useCreateChat";
import { UNKNOWN_ERROR_MESSAGE } from "../../../constants/errors";
import router from "../../Routes";
import { alpha } from "@mui/material/styles";

interface ChatListAddProps {
  open: boolean;
  handleClose: () => void;
}


const ChatListAdd = ({ open, handleClose }: ChatListAddProps) => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [createChat] = useCreateChat();

  const onClose = () => {
    setError("");
    setName("");
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          width: 400,
          p: 4,
          borderRadius: 3,
          backgroundColor: alpha("#1a1a2e", 0.6),
          backdropFilter: "blur(20px)",
          border: `1px solid ${alpha("#ff00ff", 0.2)}`,
          boxShadow: `0 0 40px ${alpha("#000000", 0.6)}`,
          outline: 'none'
        }}
      >
        <Stack spacing={4}>
          <Typography variant="h4" sx={{
            fontWeight: 700,
            textAlign: 'center',
            background: "linear-gradient(45deg, #ff00ff 30%, #7000ff 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            New Chat
          </Typography>
          <TextField
            label="Chat Name"
            error={!!error}
            helperText={error}
            variant="outlined"
            fullWidth
            onChange={(event) => setName(event.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                backgroundColor: alpha("#ffffff", 0.05),
                '& fieldset': { borderColor: alpha("#ffffff", 0.2) },
                '&:hover fieldset': { borderColor: alpha("#ff00ff", 0.5) },
                '&.Mui-focused fieldset': { borderColor: "#ff00ff" },
              },
              '& .MuiInputLabel-root': { color: alpha("#ffffff", 0.6) },
              '& .MuiInputBase-input': { color: 'white' }
            }}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{
              py: 1.5,
              fontSize: '1.1rem',
              background: "linear-gradient(45deg, #ff00ff 30%, #7000ff 90%)",
              "&:hover": {
                boxShadow: "0 0 20px rgba(255, 0, 255, 0.5)",
              }
            }}
            onClick={async () => {
              if (!name.length) {
                setError("Chat name is required.");
                return;
              }
              try {
                const chat = await createChat({
                  variables: {
                    createChatInput: { name },
                  },
                });
                onClose();
                router.navigate(`/chats/${chat.data?.createChat._id}`);
              } catch (err) {
                setError(UNKNOWN_ERROR_MESSAGE);
              }
            }}
          >
            Create
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ChatListAdd;
