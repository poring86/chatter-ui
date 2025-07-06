import { API_URL } from "../constants/urls";
import { authenticatedVar } from "../constants/authenticated";

const useLogout = () => {
  const logout = async () => {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include", // envia cookies junto
    });
    if (!res.ok) {
      throw new Error("Error logging out.");
    }

    // Se cookie NÃO for HttpOnly, descomente para limpar no client
    // document.cookie = "Authentication=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Atualiza estado de autenticação, se você usa makeVar do Apollo
    authenticatedVar(false);
  };

  return { logout };
};

export { useLogout };
