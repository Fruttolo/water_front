import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from './Components/Middleware/AuthProvider';
import PrivateRoute from './Components/Middleware/PrivateRoute';
import CheckLogged from './Components/Middleware/CheckLogged';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import Home from './Components/Home/Home';
import DelUser from './Components/Manage/DelUser';
import ChangeUsername from './Components/Manage/ChangeUsername';
import ListUsers from './Components/Manage/ListUsers';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<CheckLogged />}>  
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/" element={<LoginSignup />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
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
