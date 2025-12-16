import { Avatar, Button, Stack, Typography } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { useGetMe } from "../../hooks/useGetMe";
import { API_URL } from "../../constants/urls";
import { snackVar } from "../../constants/snack";
import { useState } from "react"; // 💡 IMPORTANTE: Importar useState

const Profile = () => {
  // 1. Receber 'data' e 'refetch' do seu hook
  const { data, refetch } = useGetMe();

  // 2. 💡 NOVO ESTADO: Variável de versão para quebrar o cache
  const [avatarVersion, setAvatarVersion] = useState(0);

  const handleFileUpload = async (event: any) => {
    try {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);

      const res = await fetch(`${API_URL}/users/image`, {
        method: "POST",
        body: formData,
        // Adicione aqui headers de autenticação, se necessário (ex: Bearer Token)
      });

      if (!res.ok) {
        throw new Error("Image upload failed.");
      }

      // 3. AÇÃO PÓS-UPLOAD BEM-SUCEDIDO:

      // A) Força o Apollo a reexecutar a query 'Me' e obter a nova imageUrl
      await refetch();

      // B) 💡 Incrementa a versão para mudar o 'src' do Avatar
      setAvatarVersion((v) => v + 1);

      snackVar({ message: "Image uploaded successfully!", type: "success" });
    } catch (err) {
      snackVar({ message: "Error uploading file.", type: "error" });
    }
  };

  const imageUrl = data?.me.imageUrl;

  return (
    <Stack
      spacing={6}
      sx={{
        marginTop: "2.5rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h1">{data?.me.username}</Typography>

      {/* 4. 💡 USO DO CACHE BUSTING: Adiciona o parâmetro ?v=X ao final do URL */}
      <Avatar
        sx={{ width: 256, height: 256 }}
        // Força a URL a mudar: "url_antiga.jpg?v=0" -> "url_antiga.jpg?v=1"
        src={imageUrl ? `${imageUrl}?v=${avatarVersion}` : undefined}
      />

      <Button
        component="label"
        variant="contained"
        size="large"
        startIcon={<UploadFile />}
      >
        Upload Image
        <input type="file" hidden onChange={handleFileUpload} />
      </Button>
    </Stack>
  );
};

export default Profile;