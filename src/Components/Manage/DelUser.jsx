import './DelUser.css'; 
import {Navigate, useNavigate} from "react-router-dom";
import { useAuth } from "../Middleware/AuthProvider";
import { BACKEND_URL } from "../..";


const DelUser = () => {

    const navigate = useNavigate();
    const auth = useAuth();

    async function DeleteUser() {
        console.log('delete');
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