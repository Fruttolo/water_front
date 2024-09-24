import './Pianifica.css'
import {Navigate, useNavigate} from "react-router-dom";
import  {useAuth} from '../../Middleware/AuthProvider'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import {useEffect, useState} from "react";
import ApiHelper from '../../../Helpers/ApiHelper';

const Home = () => {

    const navigate = useNavigate();
    const auth = useAuth();

    const [days, setDays] = useState([0, 0, 0, 0, 0, 0, 0, 0]); // first or last is sunday
    const [hour, setHour] = useState(12);
    const [minute, setMinute] = useState(30);

    const [Action, setAction] = useState('Storico');
    const [ConfirmMessage, setConfirmMessage] = useState('');
    const [ErrorMessage, setErrorMessage] = useState('');   

    const [Pianificazioni, setPianificazioni] = useState([]);

    const GetData = async () => {
        ApiHelper.get('/coffemachine/schedule')
            .then(data => {
                setPianificazioni(data);
            });
    }

    useEffect(() => {
        GetData();
    }, []);

    const incrementHour = () => {
        setHour(prevHour => (prevHour + 1) % 24);
    };

    const decrementHour = () => {
        setHour(prevHour => (prevHour - 1 + 24) % 24);
    };

    const incrementMinute = () => {
        setMinute(prevMinute => (prevMinute + 1) % 60);
    };

    const decrementMinute = () => {
        setMinute(prevMinute => (prevMinute - 1 + 60) % 60);
    };

    const Pianifica = async () => {
        
        // make a string like * * * * * * * 
        // time: every 'second minute hour dayOfMonth month dayOfWeek' 'every 10 seconds' => '*/10 * * * * *'
        // every sunday and wednesday at 10:30 => '30 10 * * 0,3'
        // every monday at 12:30 => '30 12 * * 1'

        const daysString = days.map((day, index) => day ? index : '').filter(day => day !== '').join(',');
        const timeString = `${minute} ${hour} * * ${daysString}`;

        if(daysString === '' || timeString === '') {
            setErrorMessage('Seleziona almeno un giorno');
            return;
        }

        await ApiHelper.post('/coffemachine/schedule', {
            time: timeString
        });

        setConfirmMessage('Pianificazione inserita');
        GetData();
    }

    const convertToText  = (time) => {
        const [minute, hour, tmp, tmp2, dayOfWeek] = time.split(' ');
        const index = dayOfWeek.split(',').map(day => parseInt(day));
        const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
        const result  = index.map(i => days[i]).join(', ');
        return `${result} alle ${hour}:${minute}`;
    }

    useEffect(() => {
        if (ConfirmMessage) {
            const timer = setTimeout(() => {
                setConfirmMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [ConfirmMessage]);

    useEffect(() => {
        if (ErrorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [ErrorMessage]);

    const handleButton = (button) => {
        if(button === 'Pianifica') {
            if(Action === 'Pianifica') {
                Pianifica();
            }
            else {
                document.getElementById('pianifica').classList.add('red');
                document.getElementById('storico').classList.remove('white');
                document.getElementById('storico').innerText = 'Lista';
                setAction('Pianifica');
            }
        }
        if(button === 'Storico') {
            if(Action === 'Storico') {
                navigate("/home");
            }
            else {
                document.getElementById('pianifica').classList.remove('red');
                document.getElementById('storico').classList.add('white');
                document.getElementById('storico').innerText = 'Indietro';
                setAction('Storico');
            }
        }
    }

    return (
        <div className="container">
            <div className="header">
                <div className="title">Pianifica</div>
                <div className="underline"></div>
            </div>
            {
                Action === 'Pianifica' &&
                <>
                    <div className="elements-pianifica">
                        <div className="testo">
                            Imposta i giorni da pianificare
                        </div>
                    </div>

                    <div className="elements-pianifica">

                        {['X', 'L', 'M', 'M', 'G', 'V', 'S', 'D'].map((day, index) => (
                            index === 0 ? null : 
                            <div key={index} className={`day-button ${days[index] ? 'selected' : ''}`} 
                            onClick={() => {
                                const newDays = [...days];
                                newDays[index] = newDays[index] ? 0 : 1;
                                setDays(newDays);
                            }}>
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="elements-pianifica">
                        <div className="testo">
                            Imposta l'orario
                        </div>
                    </div>

                    <div className="elements-pianifica">
                        <div className="time-picker">
                            <div className="time-box">
                                <div className="arrow-button" onClick={ incrementHour }> <ArrowUpwardIcon /></div>
                                    <input type="text" className="time-input" min="0" max="23" value={hour} onChange={(e) => setHour(parseInt(e.target.value) || 0)}></input>
                                <div className="arrow-button" onClick={ decrementHour }> <ArrowDownwardIcon /></div>
                            </div>
                            <div className="time-separator">:</div>
                            <div className="time-box">
                                <div className="arrow-button" onClick={ incrementMinute } > <ArrowUpwardIcon /> </div>
                                    <input type="text" className="time-input" min="0" max="59" value={minute} onChange={(e) => setMinute(parseInt(e.target.value) || 0)}></input>
                                <div className="arrow-button" onClick={ decrementMinute } > <ArrowDownwardIcon /></div>
                            </div>
                        </div>
                    </div>
                </>
            }
            {
                Action === 'Storico' &&
                <>
                    <div className="elements-pianifica">
                        <div className="testo">
                            Pianificazioni:
                        </div>
                    </div>

                    { Pianificazioni.map((pianificazione, index) => (
                        <div key={index} className="elements-pianifica">
                            <div className="box-pianificazione">
                                <div>
                                    {convertToText(pianificazione.time)}
                                </div>
                                <DeleteIcon 
                                    onClick={async () => {
                                        await ApiHelper.delete(`/coffemachine/schedule/${pianificazione.id}`);
                                        GetData();
                                    }} 
                                    className='delete-icon'
                                />
                            </div>
                        </div>
                    ))}
                </>
            }

            {
                Pianificazioni.length === 0 && Action === 'Storico' &&
                <div className="elements-pianifica">
                    <div className="testo">
                        Nessuna pianificazione
                    </div>
                </div>
            }

            {
                ConfirmMessage &&
                <div className="elements-pianifica">
                    <div className="testo" style={{ color: 'green', fontWeight: 'bold' }}>
                        {ConfirmMessage}
                    </div>
                </div>
            }

            {
                ErrorMessage &&
                <div className="elements-pianifica">
                    <div className="testo" style={{ color: 'red', fontWeight: 'bold' }}>
                        {ErrorMessage}
                    </div>
                </div>
            }

            <div className="elements-pianifica">
                <div className="button-pianifica white" id='storico' onClick={() => {handleButton('Storico')}}>
                    Indietro
                </div>
                <div className="button-pianifica" id='pianifica' onClick={() => {handleButton('Pianifica')}}>
                    Pianifica
                </div>
            </div>
            
        </div>
    )
}

export default Home;