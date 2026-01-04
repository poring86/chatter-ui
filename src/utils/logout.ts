import router from "../components/Routes";
import client from "../constants/apollo-client";
import { authenticatedVar } from "../constants/authenticated";

let isLoggingOut = false;

export const onLogout = async () => {
  if (isLoggingOut) return;
  isLoggingOut = true;
  authenticatedVar(false);
  try {
    await client.clearStore();
  } catch (err) {
    console.error("Error clearing store:", err);
  } finally {
    router.navigate("/login");
    isLoggingOut = false;
  }
};
