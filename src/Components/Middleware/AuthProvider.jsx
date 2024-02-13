import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = 'http://192.168.1.126:8080';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const loginAction = async (item) => {
    try {
      const response = await fetch(BACKEND_URL+"/auth/login",{
        method:"POST",
        body:JSON.stringify(item),
        headers:{
            "Content-Type":"application/json",
            "Accept":"*/*"
        }
      });
      const res = await response.json();
        if (res) {
          setUser(res.userId);
          setToken(res.session);
          localStorage.setItem("site", res.session);
          navigate("/home");
          return;
        }
        throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
