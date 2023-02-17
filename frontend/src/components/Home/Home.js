import { useContext } from 'react';
import './Home.css';
import Dummy from '../dummy';
import Sidebar from '../Sidebar/Sidebar';
import Video from '../Video/Video';
import Header from '../Header/Header'
import { PageContext } from '../../contexts/Page';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function Home() {

  const [page, setPage] = useContext(PageContext)

  return (
    <div className="home">
      <Header></Header>
      <div className="home-middle">
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

export default Home;
