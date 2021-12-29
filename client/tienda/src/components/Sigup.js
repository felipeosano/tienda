import React from 'react'

export default function Sigup(props) {
    return (
        <div>
            <div className="register">
        <h1>Registrate</h1>
        <label>Username</label>
        <input type="text" onChange={(e) => {props.setUsernameReg(e.target.value)}}/>
        <label>Lastname</label>
        <input type="text" onChange={(e) => {props.setLastNameReg(e.target.value)}}/>
        <label>Password</label>
        <input type="password" onChange={(e) => {props.setPasswordReg(e.target.value)}}/>
        <label>Mail</label>
        <input type="text" onChange={(e) => {props.setMailReg(e.target.value)}}/>
        <label>Phone</label>
        <input type="text" onChange={(e) => {props.setPhoneReg(e.target.value)}}/>
        <button onClick={props.register}>Register</button>
      </div>
        </div>
    )
}
