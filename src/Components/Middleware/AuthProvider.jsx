import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiHelper from "../../Helpers/ApiHelper";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const navigate = useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("access_token"));
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    check();
  }, []);

  const loginAction = async (item) => {
    const response = await ApiHelper.post(`/auth/login`, item);
    if (response.access_token) {
      sessionStorage.setItem("access_token", response.access_token);
      setToken(response.access_token);
      setLogged(true);
      localStorage.setItem("refresh_token", response.refresh_token);
      navigate("/home");
      return null;
    } else {
      return response;
    }

  };

  const logOut = () => {
    sessionStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setToken(null);
    setLogged(false);
    navigate("/login");
  };

  const check = async () => {

    const response = await ApiHelper.fullApi("/auth/check", "GET");
    console.log('loggato',response.status);
    if (response.status !== 200) {
      setLogged(false);
      return false;
    }

    setLogged(true);
    return true;

  }

  return (
    <AuthContext.Provider value={{ token, logged,check, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
