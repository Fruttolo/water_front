import './Home.css'
import {Navigate, useNavigate} from "react-router-dom";


const Home = () => {

    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="header">
                <div className="title">Home</div>
                <div className="underline"></div>
            </div>
            <div className="elements">
                <div className="button" onClick={() => {navigate("/change")}}>
                    Cambia username
                </div>
            </div>
            <div className="elements">
                <div className="button" onClick={() => {navigate("/list")}}>
                    Tutti gli utenti
                </div>
            </div>
            <div className="elements">
                <div className="button" onClick={() => {navigate("/delete")}}>
                    Elimina account
                </div>
            </div>
        </div>
    )
}

export default Home;