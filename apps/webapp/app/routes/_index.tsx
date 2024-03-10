import { useEffect, useState } from "react";
import Login from "~/components/modals/Login";

export const Index: React.FC = () => {
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("never-show-login-modal-again"))
      setLoginOpen(true);
  }, []);

  return loginOpen ? <Login onClose={() => setLoginOpen(false)} /> : <></>;
};

export default Index;
