import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from './Components/Middleware/AuthProvider';
import PrivateRoute from './Components/Middleware/PrivateRoute';
import CheckLogged from './Components/Middleware/CheckLogged';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import Home from './Components/Home/Home';
import Water from './Components/Home/Water/Water';
import Pianifica from './Components/Home/Water/Pianifica';
import Profilo from './Components/Home/Profilo';
import DelUser from './Components/Manage/DelUser';
import ChangeUsername from './Components/Manage/ChangeUsername';
import ListUsers from './Components/Manage/ListUsers';
import PasswordDimenticata from "./Components/Manage/PasswordDimenticata";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<CheckLogged />}>  
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/" element={<LoginSignup />} />
              <Route path="/resetpassword" element={<PasswordDimenticata />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
                <Route path="/home/profilo" element={<Profilo />} />
                <Route path="/home/water" element={<Water />} />
                <Route path="/home/pianifica" element={<Pianifica />} />
              <Route path="/delete" element={<DelUser />} />
              <Route path="/change" element={<ChangeUsername />} />
              <Route path="/list" element={<ListUsers />} />
            </Route>
            
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
