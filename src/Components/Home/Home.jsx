import './Home.css'
import {Navigate, useNavigate} from "react-router-dom";
import  {useAuth} from '../Middleware/AuthProvider'
import {useEffect, useState} from "react";


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
                    Pianifica{/*  <span className="badge">New</span> */}
                </div>
            </div>
            <div className="elements">
                <div className="button-disabled" onClick={() => {/* navigate("/home/menusettimanale") */}}>
                    Menu Settimanale
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