import { useState } from "react";
import { API_URL } from "../constants/urls";
import client from "../constants/apollo-client";

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
};

const useLogin = () => {
  const [error, setError] = useState<string>();

  const login = async (request: LoginRequest) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      if (res.status === 401) {
        setError("Credentials are not valid.");
      } else {
        setError("Unknown error occured.");
      }
      // Se a resposta NÃO for OK (e o erro foi setado), saímos daqui.
      return;
    }

    // ✅ CORREÇÃO: Usar try...catch para ler o JSON
    try {
      const data: LoginResponse = await res.json();

      // 🚨 SUCESSO: Armazenar e finalizar
      localStorage.setItem("accessToken", data.accessToken);

      setError("");

      await client.refetchQueries({ include: "active" });
    } catch (e) {
      // ⚠️ Trata a falha de leitura do JSON (corpo vazio ou malformado),
      // o que causa o erro "Unexpected end of JSON input".
      setError("Login succeeded but failed to process server response.");
      console.error("Failed to parse JSON response on successful login:", e);
      return;
    }
  };

  return { login, error };
};

export { useLogin };
