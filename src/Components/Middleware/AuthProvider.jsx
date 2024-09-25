import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiHelper from "../../Helpers/ApiHelper";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    check();
  }, []);

  const loginAction = async (item) => {
    const response = await ApiHelper.post(`/auth/login`, item);
    if (response.access_token) {
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);
      setLogged(true);
      navigate("/home");
      getUser();
      return ;
    } else {
      return response;
    }
  };

  const logOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setLogged(false);
    navigate("/login");
  };

  const check = async () => {

    const response = await ApiHelper.fullApi("/auth/check", "GET");
    //console.log('loggato',response.status);
    if (response.status !== 200) {
      setLogged(false);
      return false;
    }

    getUser();
    setLogged(true);
    return true;

  }

  const getUser = async () => {
    const response = await ApiHelper.get("/user");
    setUser(response.user);
  }

  return (
    <AuthContext.Provider value={{ logged, user, check, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
