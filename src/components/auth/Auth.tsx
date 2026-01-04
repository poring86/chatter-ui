import { Button, Stack, TextField, Paper, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetMe } from "../../hooks/useGetMe";
import { useNavigate } from "react-router";
import { alpha } from "@mui/material/styles";

interface AuthProps {
  submitLabel: string;
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  children: React.ReactNode;
  extraFields?: React.ReactNode[];
  error?: string;
}

const Auth = ({
  submitLabel,
  onSubmit,
  children,
  error,
  extraFields,
}: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data } = useGetMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <Box sx={{
      height: "100vh",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Paper
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 4,
          backgroundColor: alpha("#1a1a2e", 0.6),
          backdropFilter: "blur(20px)",
          border: `1px solid ${alpha("#ff00ff", 0.2)}`,
          boxShadow: `0 0 40px ${alpha("#000000", 0.6)}`,
        }}
      >
        <Stack spacing={4}>
          <Typography variant="h4" sx={{
            fontWeight: 700,
            textAlign: 'center',
            background: "linear-gradient(45deg, #ff00ff 30%, #7000ff 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1
          }}>
            {submitLabel}
          </Typography>

          <TextField
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={!!error}
            helperText={error}
            InputLabelProps={{ shrink: true }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: alpha("#ffffff", 0.05),
                '& fieldset': { borderColor: alpha("#ffffff", 0.2) },
                '&:hover fieldset': { borderColor: alpha("#ff00ff", 0.5) },
                '&.Mui-focused fieldset': { borderColor: "#ff00ff" },
              },
              '& .MuiInputLabel-root': { color: alpha("#ffffff", 0.6) },
              '& .MuiInputBase-input': { color: 'white' }
            }}
          />

          {extraFields?.map((field, index) => (
            <Box key={index} sx={{
              '& .MuiTextField-root': { width: '100%' },
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: alpha("#ffffff", 0.05),
                '& fieldset': { borderColor: alpha("#ffffff", 0.2) },
                '&:hover fieldset': { borderColor: alpha("#ff00ff", 0.5) },
                '&.Mui-focused fieldset': { borderColor: "#ff00ff" },
              },
              '& .MuiInputLabel-root': { color: alpha("#ffffff", 0.6) },
              '& .MuiInputBase-input': { color: 'white' }
            }}>
              {/* @ts-ignore */}
              {field}
            </Box>
          ))}

          <TextField
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            error={!!error}
            helperText={error}
            onChange={(event) => setPassword(event.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
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
            size="large"
            fullWidth
            sx={{
              py: 1.5,
              fontSize: '1.1rem',
              background: "linear-gradient(45deg, #ff00ff 30%, #7000ff 90%)",
              "&:hover": {
                boxShadow: "0 0 20px rgba(255, 0, 255, 0.5)",
              }
            }}
            onClick={() => onSubmit({ email, password })}
          >
            {submitLabel}
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {children}
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Auth;
