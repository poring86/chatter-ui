// src/components/Profile.tsx (ou o caminho correto)

import { Avatar, Button, Stack, Typography } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { useGetMe } from "../../hooks/useGetMe";
import { API_URL } from "../../constants/urls";
import { snackVar } from "../../constants/snack";
import { useState } from "react";

// 💡 IMPORTS PARA ATUALIZAÇÃO GLOBAL DO CACHE
import { useApolloClient, ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { updateMeObjectInCache } from "../../cache/me";


const Profile = () => {
  // Não precisamos mais do 'refetch' aqui, mas mantemos o 'data'
  const { data } = useGetMe();

  // 1. Hook e Tipagem Explícita para o Cache
  const client = useApolloClient() as ApolloClient<NormalizedCacheObject>;

  // 2. Estado para o Cache Busting (forçar o recarregamento da imagem no navegador)
  const [avatarVersion, setAvatarVersion] = useState(0);

  const handleFileUpload = async (event: any) => {
    try {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);

      const res = await fetch(`${API_URL}/users/image`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Image upload failed.");
      }

      // 3. Lê o objeto de usuário completo retornado pelo backend (deve ser JSON!)
      const result = await res.json();
      const updatedUser = result.user;

      if (!updatedUser || !updatedUser.imageUrl) {
        throw new Error("Server response did not contain updated user data.");
      }

      // 4. ATUALIZAÇÃO GLOBAL DO CACHE (Apollo):
      // Injeta o objeto user completo no cache, atualizando instantaneamente todos os componentes.
      updateMeObjectInCache(client.cache, updatedUser);

      // 5. QUEBRA DE CACHE DO NAVEGADOR:
      // Mudar a versão altera o 'src' da imagem, forçando o navegador a baixar a nova imagem.
      setAvatarVersion((v) => v + 1);

      snackVar({ message: "Image uploaded successfully!", type: "success" });
    } catch (err) {
      console.error("Upload Error:", err);
      snackVar({ message: "Error uploading file. Check console.", type: "error" });
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

      {/* USO DO CACHE BUSTING: */}
      <Avatar
        sx={{ width: 256, height: 256 }}
        // Adiciona ?v=X para forçar o recarregamento
        src={imageUrl ? `${imageUrl}?v=${avatarVersion}` : undefined}
      />

      <Button
        component="label"
        variant="contained"
        size="large"
        startIcon={<UploadFile />}
      >
        Upload Image
        <input
          type="file"
          hidden
          onChange={handleFileUpload}
          // Reseta o input para permitir o upload do mesmo arquivo novamente
          onClick={(e) => ((e.target as HTMLInputElement).value = "")}
        />
      </Button>
    </Stack>
  );
};

export default Profile;