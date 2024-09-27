import './MenuSettimanale.css'
import {useEffect, useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ApiHelper from '../../../Helpers/ApiHelper';

const Home = () => {

    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    const GetData = async () => {
        const data = await ApiHelper.get('/menu');
        setTodos(data);
    }

    useEffect(() => {
        GetData();
    }, []);

    const addTodo = async () => {
        await ApiHelper.post('/menu', {description: newTodo});
        GetData();
    };

    const removeTodo = async (index) => {
        await ApiHelper.delete(`/menu/${index}`);
        GetData();
    };

    return (
        <div className="container">

            <div className="header">
                <div className="title">Menu Settimanale</div>
                <div className="underline"></div>
            </div>

            <div className="elements-pianifica">
                <input
                    className='aggiungi-piatto'
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Aggiungi un piatto"
                />
                <div className='button small' onClick={addTodo}>Aggiungi</div>
            </div>

            <div className="box-lista">
                { Array.isArray(todos) && todos.length !== 0 && todos.map((todo, index) => (
                    <div className="elements" style={{marginBottom: "10px", marginTop: "10px", width: "290px"}} key={index}>
                        <div className="box-pianificazione">
                            <div id={`testo-${index}`} >
                                {todo.description}
                            </div>
                            <DeleteIcon 
                                onClick={async () => {
                                    removeTodo(todo.id);
                                }} 
                                className='delete-icon'
                            />
                        </div>
                    </div>
                ))}
                { todos && todos.length === 0 && 
                    <div className="elements-pianifica">
                        <div className="testo">
                            Nessun piatto, devi fare la spesa !!!
                        </div>
                    </div>
                }
            </div>

        </div>
    );
}

export default Home;
