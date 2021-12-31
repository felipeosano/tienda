import './assets/css/App.css';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive'
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './components/Main';
import { nameValidate, passwordValidate, emailValidate } from './inputValidate';

function App() {

  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] =useState("");
  const [mailReg, setMailReg] = useState("");

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const [message, setMessage] = useState("");
  const [errorNameSignup, setErrorNameSignup] = useState(false);
  const [errorPasswordSignup, setErrorPasswordSignup] = useState(false);
  const [errorEmailSignup, setErrorEmailSignup] =useState(false);
  const [errorEmailRegistred, setEmailRegistred] = useState("");

  const [viewLoggedIn, setViewLoggedIn] = useState(true);
  const [notViewLoggedIn, setnotViewLoggedIn] = useState(false);

  Axios.defaults.withCredentials = true;

  const register = () => {
    if(!nameValidate(usernameReg)){
      setErrorNameSignup(true);
    }else{
      setErrorNameSignup(false);
    }
    if(!passwordValidate(passwordReg)){
      setErrorPasswordSignup(true);
    }else{
      setErrorPasswordSignup(false);
    }
    if(!emailValidate(mailReg)){
      setErrorEmailSignup(true);
    }else{
      setErrorEmailSignup(false);
    }
    console.log(errorPasswordSignup);
    if(!errorNameSignup && !errorPasswordSignup && !errorEmailSignup){
      Axios.post('http://localhost:5000/register', {
        username: usernameReg,
        password: passwordReg,
        mail: mailReg
      }).then((response) => {
        if(response.data.message){
          setEmailRegistred(response.data.message);
        }else{
          setLoginStatus(response.data[0].username);
          setnotViewLoggedIn(false);
          setViewLoggedIn(true);
          window.location.reload();
        }
      });
    }
  }

  const login = () => {
    Axios.post('http://localhost:5000/login', {
      mail: mail,
      password: password
    }).then((response) => {
      if(response.data.message){
        setMessage(response.data.message);
      }else{
        setLoginStatus(response.data[0].username);
        setnotViewLoggedIn(false);
        setViewLoggedIn(true);
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
        setViewLoggedIn(false);
      }else{
        setnotViewLoggedIn(true);
      }
    });
  }, [])
  

  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const [view, setView] = useState(0);

  return (
    <div className="App">
      {viewLoggedIn ? null : <button onClick={logout}>Logout</button>}
      {isDesktopOrLaptop && 
      <div>
        <header className="App-header">
          <div className='divHeader'>
            <button className="title"  onClick={() => setView(0)}>FastVentas</button>
            {notViewLoggedIn && 
              <div>
                <button className={'btnHeader btnHeader-desktop'} onClick={() => setView(1)}>Ingresar</button>
                <button  className='btnHeader btnHeader-desktop' onClick={() => setView(2)}>Registrarme</button>
              </div>
            }
            
            
          </div>
        </header>
        <Main/>
        {view === 1 ? <Login  
        message={message} 
        setViewLogin={setView} 
        setMail={setMail} 
        setPassword={setPassword} 
        login={login} 
        loginStatus={loginStatus}
        /> : null}
        {view === 2 ? <Signup 
        errorEmailRegistred={errorEmailRegistred}
        errorNameSignup={errorNameSignup}
        errorPasswordSignup={errorPasswordSignup}
        errorEmailSignup={errorEmailSignup}
        setViewSignup={setView} 
        setUsernameReg={setUsernameReg}  
        setPasswordReg={setPasswordReg} 
        setMailReg={setMailReg} 
        register={register}/> : null}
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
              {!loginStatus && 
              <div>
                <li>
                  <label htmlFor='check' className='bar-btn' onClick={() => setView(1)}>Ingresar</label>
                </li>
                <li>
                  <label htmlFor='check' className='bar-btn' onClick={() => setView(2)}>Registrarme</label>
                </li>
              </div>
              }
              </ul>
            </nav>

          </header>
          {view === 0 ? <Main/> : null}
        {view === 1 ? <Login setViewLogin={setView} setMail={setMail} setPassword={setPassword} login={login} loginStatus={loginStatus} /> : null}
        {view === 2 ? <Signup setViewSignup={setView} setUsernameReg={setUsernameReg}  setPasswordReg={setPasswordReg} setMailReg={setMailReg} register={register} /> : null}
        {loginStatus}
        </div>
      }
    </div>
  );
}

export default App;
