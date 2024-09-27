import './Home.css'
import {useNavigate} from "react-router-dom";
import  {useAuth} from '../Middleware/AuthProvider'


const Home = () => {

    const navigate = useNavigate();
    const auth = useAuth();

    return (
        <div className="container">
            <div className="header">
                <div className="title">Home</div>
                <div className="underline"></div>
            </div>
            <div className="elements">
                <div className="button" onClick={() => {navigate("/home/water")}}>
                    Caffé
                </div>
            </div>
            <div className="disabled">
                <div className="button" onClick={() => {navigate("/home/pianifica")}}>
                    Pianifica
                </div>
            </div>
            <div className="elements">
                <div className="button" onClick={() => {navigate("/home/menusettimanale")}}>
                    Menu Settimanale <span className="badge">New</span>
                </div>
            </div>
            { auth && auth.user && auth.user.role == 1 &&
                <div className="elements">
                    <div className="button" onClick={() => {navigate("/home/profilo")}}>
                        Profilo
                    </div>
                </div>
            }
            <div className="elements">
                <div className="button red" onClick={() => {auth.logOut()}}>
                    Logout
                </div>
            </div>
        </div>
    )
}

export default Home;