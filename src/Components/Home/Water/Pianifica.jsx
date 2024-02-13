import './Water.css'
import {Navigate, useNavigate} from "react-router-dom";
import  {useAuth} from '../../Middleware/AuthProvider'


const Home = () => {

    const navigate = useNavigate();
    const auth = useAuth();

    return (
        <div className="container">
            <div className="header">
                <div className="title">Pianifica</div>
                <div className="underline"></div>
            </div>
            
        </div>
    )
}

export default Home;