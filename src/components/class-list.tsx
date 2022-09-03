import { useDispatch, useSelector } from "react-redux";
import { logout, initState } from "../redux/slice/classSlice";


export default function ClassList() {
    const dispatch = useDispatch();
    const data: [] = useSelector((state: initState) => state.data);
    const isLoading: Boolean = useSelector((state: initState) => state.isLoading);
    return (
        <>
            <button style={{ float:'right' }} onClick={() => dispatch(logout())}>Logout</button>
            <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '80%'
                }}>
                {isLoading && <h2 style={{ display: 'flex', justifyContent: 'center'}}>Loading...</h2>}
                {!isLoading && !data.length && (<div>No Results Found</div>)}
                {!isLoading && data && (
                    <div style={{ display: 'block', marginTop: '50px' }}>
                        {data.map(({Name, Students}, index) => (
                            <div key={index} style={{ 
                                border: '1px solid rgba(0, 0, 0, 0.05)',
                                padding: '30px',
                                margin: '10px',
                            }}>
                                <h2>Name</h2>
                                <div>{Name}</div>
                                <h2>Students</h2>
                                <div>{Students}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}