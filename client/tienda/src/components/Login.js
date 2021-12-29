import React from 'react'

export default function Login(porps) {
    return (
        <div>
            <div className="login">
            <h1>Login</h1>
            <input type="text" placeholder="mail" onChange={(e) => {porps.setMail(e.target.value)}}></input>
            <input type="password" placeholder="password" onChange={(e) => {porps.setPassword(e.target.value)}}></input>
            <button onClick={porps.login}>Login</button>
        </div>
        <h1>{porps.loginStatus}</h1>
        </div>
    )
}
