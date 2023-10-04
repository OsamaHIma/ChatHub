import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { data: session } = useSession();
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    if (session) {
      setToken(session.user.token);
      setUser(session.user.user);
      // console.log(session);
    }
  }, [session]);
  const value = useMemo(() => {
    return {
      token,
      user,
    };
  }, [token, user]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContext");
  }
  return context;
}
