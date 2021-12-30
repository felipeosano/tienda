import './assets/css/App.css';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive'
import Login from './components/Login';
import Signup from './components/Signup';

function App() {

  const [usernameReg, setUsernameReg] = useState("");
  const [lastNameReg, setLastNameReg] = useState("");
  const [passwordReg, setPasswordReg] =useState("");
  const [phoneReg, setPhoneReg] = useState("");
  const [mailReg, setMailReg] = useState("");

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const [message, setMessage] = useState("");

  Axios.defaults.withCredentials = true;

  const messageEmpty = () => {
    setMessage("");
  }

  const register = () => {
    Axios.post('http://localhost:5000/register', {
      username: usernameReg,
      lastname: lastNameReg,
      password: passwordReg,
      phone: phoneReg,
      mail: mailReg
    }).then((response) => {
      if(response.data.message){
        setMessage(response.data.message);
      }else{
        setLoginStatus(response.data[0].mail);
        window.location.reload();
      }
    });
    
  }

  const login = () => {
    Axios.post('http://localhost:5000/login', {
      mail: mail,
      password: password
    }).then((response) => {
      if(response.data.message){
        setMessage(response.data.message);
      }else{
        setLoginStatus(response.data[0].mail);
        window.location.reload();

      }
    });
  }

  const logout = () => {
    Axios.get("http://localhost:5000/logout");
    window.location.reload();
  }

  useEffect(() => {
    Axios.get("http://localhost:5000/login").then((response) => {
      if(response.data.loggedIn === true){
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, [])

  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const [view, setView] = useState(0);

  return (
    <div className="App">
      <button onClick={logout}>Logout</button>
      {isDesktopOrLaptop && 
      <div>
        <header className="App-header">
          <div className='divHeader'>
            <button className="title"  onClick={() => setView(0)}>FastVentas</button>
            <button className='btnHeader btnHeader-desktop' onClick={() => setView(1)}>Ingresar</button>
            <button  className='btnHeader btnHeader-desktop' onClick={() => setView(2)}>Registrarme</button>
          </div>
        </header>
        {view === 1 ? <Login messageEmpty={messageEmpty} message={message} setViewLogin={setView} setMail={setMail} setPassword={setPassword} login={login} loginStatus={loginStatus} /> : null}
        {view === 2 ? <Signup message={message} setViewSignup={setView} setUsernameReg={setUsernameReg} setLastNameReg={setLastNameReg} setPasswordReg={setPasswordReg} setPhoneReg={setPhoneReg} setMailReg={setMailReg} register={register}/> : null}
        {loginStatus}
        </div>
      }
      {isTabletOrMobile && 
        <div>
          <header className="App-header">
            <nav>
              <input type="checkbox" id='check'></input>
              <label htmlFor='check' className='bar-btn'>
                <i className="fas fa-bars"></i>
              </label>
              <button className="title" onClick={() => setView(0)}>FastVentas</button>
              <ul className='nav-menu-Phone'>
              <li>
                <label htmlFor='check' className='bar-btn' onClick={() => setView(0)}>Inicio</label>
              </li>
                <li>
                <label htmlFor='check' className='bar-btn' onClick={() => setView(1)}>Ingresar</label>
              </li>
                <li>
                <label htmlFor='check' className='bar-btn' onClick={() => setView(2)}>Registrarme</label>
                </li>
              </ul>
            </nav>

          </header>
        {view === 1 ? <Login setViewLogin={setView} setMail={setMail} setPassword={setPassword} login={login} loginStatus={loginStatus} /> : null}
        {view === 2 ? <Signup setViewSignup={setView} setUsernameReg={setUsernameReg} setLastNameReg={setLastNameReg} setPasswordReg={setPasswordReg} setPhoneReg={setPhoneReg} setMailReg={setMailReg} register={register} /> : null}
        {loginStatus}
        </div>
      }
    </div>
  );
}

export default App;
