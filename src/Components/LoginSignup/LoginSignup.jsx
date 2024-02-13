import React, {useState, useEffect} from "react";
import "./LoginSignup.css";
import {useNavigate} from "react-router-dom";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import { useAuth } from "../Middleware/AuthProvider";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { BACKEND_URL } from "../..";

const LoginSignup = () => {

    async function SignUp() {
        let item = {email:email,username:username,password:password};
        let result = await fetch(BACKEND_URL+"/auth/register",{
            method:"POST",
            body:JSON.stringify(item),
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });
        
        if(result.ok){
            setAction("Login");
            setConfirm("Registrazione effettuata con successo");
        }else {
            setError("Errore registrazione");
        }
    }

    async function Login() {
        let input = {email:email,password:password};
        auth.loginAction(input);
        setError("Email o password errata");
    }

    const [error, setError] = useState("");
    const [confirm, setConfirm] = useState("");

    const [action,setAction] = useState("Login");
    const [showPass,setShowPass] = useState("password");

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [username,setUsername] = useState("");

    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setError("");
    }, [action]);
    
  return (
    <div className="container">
        <div className="header">
            <div className="title">{action}</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">
            {action==="Login"?<div></div>:<div className="input">
                <img src={user_icon} alt="" />
                <input type="text" placeholder="Username" 
                    onChange={(e)=>{setUsername(e.target.value)}}
                    onKeyPress={(e)=>{if(e.key === 'Enter') { action==="Login" ? Login() : SignUp(); }}}/>
            </div>}
            <div className="input">
                <img src={email_icon} alt="" />
                <input type="email" placeholder="Email" 
                    onChange={(e)=>{setEmail(e.target.value);}}
                    onKeyPress={(e)=>{if(e.key === 'Enter') { action==="Login" ? Login() : SignUp(); }}}/>
            </div>
            <div className="input">
                <img src={password_icon} alt="" />
                <input className="password" type={showPass} placeholder="Password" 
                    onChange={(e)=>{setPassword(e.target.value)}}
                    onKeyPress={(e)=>{if(e.key === 'Enter') { action==="Login" ? Login() : SignUp(); }}}/>
                {
                    showPass==="password" ?
                    <VisibilityIcon className="visibility-icon" onClick={()=>{setShowPass("text")}}/> :
                    <VisibilityOffIcon className="visibility-icon" onClick={()=>{setShowPass("password")}}/>
                }
            </div>
        </div>        
        {error!==""? <div className="error-message">{error}</div>: <div></div>}
        {confirm!==""? <div className="confirm-message">{confirm}</div>: <div></div>}
        {action==="Iscrizione"?<div></div>:<div className="forgot-password">Password persa? <span onClick={()=>{navigate('/resetpassword')}}>Clicca qui</span></div>}
        <div className="submit-container">
            <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{action==="Login"?setAction("Iscrizione"):SignUp()}}>Iscrizione</div>
            <div className={action==="Iscrizione"?"submit gray":"submit"} onClick={()=>{action==="Iscrizione"?setAction("Login"):Login()}}>Login</div>
        </div>
    </div>
  )
}

export default LoginSignup
