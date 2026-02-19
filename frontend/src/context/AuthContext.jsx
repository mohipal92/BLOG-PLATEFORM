import { createContext, useEffect, useState } from "react";
import { getProfile, logoutUser } from "../api/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch profile on app load
  useEffect(() => {
    getProfile()
      .then((res) => {
        setUser(res.data.user); //  correct shape
      })
      .catch(() => {
        setUser(null); //  not logged in
      })
      .finally(() => {
        setLoading(false); //  VERY IMPORTANT
      });
  }, []);

  // logout function
  const logout = async () => {
    try {
      await logoutUser(); //  await
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
