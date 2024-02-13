import './DelUser.css'; 
import {Navigate, useNavigate} from "react-router-dom";
import { useAuth } from "../Middleware/AuthProvider";

const BACKEND_URL = 'http://192.168.1.126:8080';

const DelUser = () => {

    const navigate = useNavigate();
    const auth = useAuth();

    async function DeleteUser() {
        let item = localStorage.getItem("site");
        await fetch(BACKEND_URL + "/users",{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization":"Bearer "+item
            }
        }).catch((error) => {  
            console.log(error);
        });
        auth.logOut();
    }

    return (
        <div className="container">
            <div className="header">
                <div className="title">Elimina account</div>
                <div className="underline"></div>
            </div>
            <div className="messagebox">
                <div className="text">
                    Sei sicuro di voler eliminare il tuo account?
                </div>
            </div>
            <div className="submit-container" onClick={() => {navigate("/home")}}>
                <div className="submit2">
                    Annulla
                </div>
                <div className="submit2 red" onClick={()=>{DeleteUser()}}>
                    Elimina
                </div>
            </div>
        </div>
    );
}

export default DelUser;