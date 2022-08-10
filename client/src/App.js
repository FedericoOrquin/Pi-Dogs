import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import LandingPage from './Components/LandingPage/index.jsx';
import Home from './Components/Home/index.jsx';
import CreatedCard from './Components/CreatedCard';
import Detail from './Components/Detail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/dog" element={<CreatedCard/>}></Route>
        <Route path="/dogs/:id" element={<Detail/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
