
import React, {useState} from 'react';
import './App.css';
import Register from './Register';
import Login from './logSignIn';


function App(){
  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm = (forName) =>{
    setCurrentForm(forName);
  }
  return(
    <div>
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
      }
    </div>
  ) 
};

export default App;
