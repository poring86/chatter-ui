// src/components/Profile.tsx (ou o caminho correto)

import { Avatar, Button, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
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

  const handleFileUpload = async (event: any) => {
    try {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);

      const res = await fetch(`${API_URL}/users/image`, {
        method: "POST",
        body: formData,
        credentials: "include",
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
      // Adicionamos um timestamp na URL para forçar todos os componentes a quebrarem o cache de imagem.
      const userToCache = {
        ...updatedUser,
        imageUrl: `${updatedUser.imageUrl}?v=${new Date().getTime()}`,
      };

      updateMeObjectInCache(client.cache, userToCache);

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
        marginTop: "4rem",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
        borderRadius: 4,
        background: alpha("#1a1a2e", 0.4),
        backdropFilter: "blur(20px)",
        border: `1px solid ${alpha("#ff00ff", 0.2)}`,
        boxShadow: "0 0 30px rgba(0, 0, 0, 0.5)"
      }}
    >
      <Typography variant="h1">{data?.me.username}</Typography>

      {/* USO DO CACHE BUSTING: */}
      <Avatar
        sx={{
          width: 200,
          height: 200,
          border: '4px solid #ff00ff',
          boxShadow: '0 0 20px rgba(255,0,255,0.4)'
        }}
        src={imageUrl || undefined}
      />

      <Button
        component="label"
        variant="contained"
        size="large"
        startIcon={<UploadFile />}
        sx={{
          px: 4,
          py: 1.5,
          fontSize: '1.1rem'
        }}
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