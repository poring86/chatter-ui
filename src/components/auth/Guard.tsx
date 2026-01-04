import { useEffect } from "react";
import excludedRoutes from "../../constants/excluded-routes";
import { useGetMe } from "../../hooks/useGetMe";
import { authenticatedVar } from "../../constants/authenticated";
import { useReactiveVar } from "@apollo/client";
import { snackVar } from "../../constants/snack";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../../constants/errors";
import { usePath } from "../../hooks/usePath";
import router from "../Routes";

interface GuardProps {
  children: JSX.Element;
}

const Guard = ({ children }: GuardProps) => {
  const { data: user, loading } = useGetMe();
  const authenticated = useReactiveVar(authenticatedVar);
  const { path } = usePath();

  useEffect(() => {
    if (user) {
      authenticatedVar(true);
    }
  }, [user]);

  useEffect(() => {
    if (authenticated && user && excludedRoutes.includes(path)) {
      router.navigate("/");
    }
    if (!authenticated && !excludedRoutes.includes(path) && !loading) {
      router.navigate("/login");
    }
  }, [user, path, loading, authenticated]);

  return (
    <>
      {excludedRoutes.includes(path) ? (
        children
      ) : (
        <>{user ? children : null}</>
      )}
    </>
  );
};

export default Guard;
