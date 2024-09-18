import './Water.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import  {useAuth} from '../../Middleware/AuthProvider'
import Slider from '@mui/material/Slider';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import { BACKEND_URL } from "../../..";

const Home = () => {

    const navigate = useNavigate();
    const auth = useAuth();

    const [sliderValue, setSliderValue] = useState(2);
    const [showMessage, setShowMessage] = useState(0);

    async function versaCaffe() {
        let item = localStorage.getItem("site");
        setShowMessage(1);
        fetch(BACKEND_URL+"/coffemachine/makecoffe",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization":"Bearer "+item
            }
        }).then(response => {
            if(response.ok){
                setShowMessage(2);
            }
        });
    }

    return (
        <div className="container">
            <div className="header">
                <div className="title">Versa</div>
                <div className="underline"></div>
            </div>
            <div className="elements" style={{ height: 250, width: 300 }}>
                <Slider
                    sx={{
                        '& input[type="range"]': {
                        WebkitAppearance: 'slider-vertical',
                        },
                    }}
                    orientation="vertical"
                    defaultValue={2}
                    aria-label="Temperature"
                    valueLabelDisplay="off"
                    onChange={(event, value) => setSliderValue(value)}
                    min={1}
                    max={3}
                />
                <div className="elements" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: "10px" }}>
                        {Array.from({ length: Math.min(3, Math.max(1, sliderValue)) }).map((_, index) => (
                            <div className="icon" key={index}>
                                <WaterDropIcon style={{ fontSize: 48, color: "#0c00b4" }} />
                            </div>
                        ))}
                    </div>
                    <div className="buttonVersa" onClick={() => { versaCaffe() }}>
                        <LocalDrinkIcon style={{ fontSize: 48 }} />
                    </div>
                </div>
            </div>
            { showMessage==2 && 
                <div className="elements" style={{ marginTop: '20px', padding: '10px'}}>
                        <div className="message" style={{ fontWeight: 'bold', color: 'green' }}>
                            Macchinetta accesa. Fra 2 min avrai il tuo caffè. Non devi fare altro.
                            <br />
                            { showMessage == 2 &&
                                <div style={{ fontWeight: 'bold', color: 'red', textAlign: 'center'}}>
                                    Buona giornata amore, ti amo. ❤️
                                </div>
                            }
                        </div>
                </div>
            }
            { showMessage==1 && 
                <div className="elements" style={{ marginTop: '20px', padding: '10px'}}>
                        <div className="message" style={{ fontWeight: 'bold', color: 'green' }}>
                            Caricamento in corso... se questa scritta non va via fra qualche secondo sveglia salvo.
                        </div>
                </div>
            }
        </div>
    )
}

export default Home;