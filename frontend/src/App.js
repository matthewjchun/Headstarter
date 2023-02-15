import { useContext } from 'react';
import './App.css';
import Dummy from './components/dummy';
import Sidebar from './components/Sidebar/Sidebar';
import Video from './components/Video/Video';
import { PageContext } from './contexts/Page';


function App() {

  const [page, setPage] = useContext(PageContext)

  return (
    <div className="App">

      <div className="App-middle">
        <Sidebar></Sidebar>
        {page == '1' ?
          <Dummy
            number={page}
          ></Dummy>
          : page == '2' ?
            <Dummy
              number={page}
            ></Dummy>
            :
            <Video></Video>
        }
      </div>
    </div>
  );
}

export default App;
