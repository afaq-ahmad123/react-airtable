import { useSelector } from 'react-redux';
import './App.css';
import ClassList from './components/class-list';
import Home from './components/home';
import { initState } from './redux/slice/classSlice';

function App() {
  const isLoggedIn = useSelector((state: initState) => state.isLoggedIn);

  return (
    <>
      {!isLoggedIn && <Home />}
      {isLoggedIn && <ClassList />}
    </>
  );
}

export default App;
