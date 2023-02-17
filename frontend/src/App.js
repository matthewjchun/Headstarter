import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Zoom from './components/Video/Zoom';


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/zoom' element={ <Zoom />} />
      </Routes>
    </Router>
  );
}

export default App;
