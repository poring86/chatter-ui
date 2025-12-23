import { useEffect, useState } from "react";
import router from "../components/Routes";

const usePath = () => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const unsubsribe = router.subscribe((state) => {
      setPath(state.location.pathname);
    });
    return () => unsubsribe();
  }, []);

  return { path };
};

export { usePath };
