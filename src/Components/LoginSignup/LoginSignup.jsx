import React, {useState} from "react";
import "./LoginSignup.css";
import user_icon from "../Assets/person.png";
import password_icon from "../Assets/password.png";
import { useAuth } from "../Middleware/AuthProvider";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const LoginSignup = () => {

    async function Login() {
        let input = {username:username,password:password};
        let message = await auth.loginAction(input);
        setError(message);
    }

    const [error, setError] = useState("");

    const [showPass,setShowPass] = useState("password");

    const [password,setPassword] = useState("");
    const [username,setUsername] = useState("");

    const auth = useAuth();
    
  return (
    <div className="container">
        <div className="header">
            <div className="title">Login</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            <div className="input">
                <img src={user_icon} alt="" />
                <input type="email" placeholder="Username" 
                    onChange={(e)=>{setUsername(e.target.value);}}
                    onKeyPress={(e)=>{if(e.key === 'Enter') {Login()}}}/>
            </div>
            <div className="input">
                <img src={password_icon} alt="" />
                <input className="password" type={showPass} placeholder="Password" 
                    onChange={(e)=>{setPassword(e.target.value)}}
                    onKeyPress={(e)=>{if(e.key === 'Enter') {Login()}}}/>
                {
                    showPass==="password" ?
                    <VisibilityIcon className="visibility-icon" onClick={()=>{setShowPass("text")}}/> :
                    <VisibilityOffIcon className="visibility-icon" onClick={()=>{setShowPass("password")}}/>
                }
            </div>
        </div>        
        {error!==""? <div className="error-message">{error}</div>: <div></div>}
        {/* {action==="Iscrizione"?<div></div>:<div className="forgot-password">Password persa? <span onClick={()=>{navigate('/resetpassword')}}>Clicca qui</span></div>} */}
        <div className="submit-container" style={{ justifyContent: 'center'}}>
            <div className="submit" onClick={()=>{Login()}}>Login</div>
        </div>
    </div>
  )
}

export default LoginSignup
