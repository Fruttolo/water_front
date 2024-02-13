import './Water.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import  {useAuth} from '../../Middleware/AuthProvider'
import Slider from '@mui/material/Slider';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

const Home = () => {

    const navigate = useNavigate();
    const auth = useAuth();

    const [sliderValue, setSliderValue] = useState(2);
    
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
                    <div className="buttonVersa" onClick={() => {}}>
                        <LocalDrinkIcon style={{ fontSize: 48 }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;