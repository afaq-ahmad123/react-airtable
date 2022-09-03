import { FormEventHandler, useState } from "react"
import { useDispatch } from "react-redux";
import { getAllClasses, login } from "../redux/slice/classSlice";


function Home() {
    const [value, setValue] = useState('');
    // const [noText, setNoText] = useState(false);
    const dispatch = useDispatch();
    const submit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        // if (!value) return setNoText(true);
        dispatch(getAllClasses(value));
        dispatch(login());
    }
    
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'  
        }}>
            <form onSubmit={submit}>
                Student Name:
                <input value={value} onChange={({ target: { value }}) => setValue(value)} />
                <button type="submit">Login</button>
            </form>
            {/* {noText && (<div style={{ display: 'block' }}>Please enter Student Name to Search</div>)} */}
        </div>
    )
}

export default Home;