import './App.css';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive'
import Login from './components/Login';
import Sigup from './components/Sigup';

function App() {

  const [usernameReg, setUsernameReg] = useState("");
  const [lastNameReg, setLastNameReg] = useState("");
  const [passwordReg, setPasswordReg] =useState("");
  const [phoneReg, setPhoneReg] = useState("");
  const [mailReg, setMailReg] = useState("");

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post('http://localhost:5000/register', {
      username: usernameReg,
      lastname: lastNameReg,
      password: passwordReg,
      phone: phoneReg,
      mail: mailReg
    }).then((response) => {
      if(response.data.message){
        setLoginStatus(response.data.message);
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
        setLoginStatus(response.data.message);
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

  return (
    <div className="App">
      <button onClick={logout}>Logout</button>
      <Sigup setUsernameReg={setUsernameReg} setLastNameReg={setLastNameReg} setPasswordReg={setPasswordReg} setPhoneReg={setPhoneReg} setMailReg={setMailReg} register={register}/>
      <Login setMail={setMail} setPassword={setPassword} login={login} loginStatus={loginStatus}/>
    </div>
  );
}

export default App;
