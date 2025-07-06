import { API_URL } from "../constants/urls";
import { authenticatedVar } from "../constants/authenticated";

const useLogout = () => {
  const logout = async () => {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Error logging out.");
    }

    authenticatedVar(false);
  };

  return { logout };
};

export { useLogout };
