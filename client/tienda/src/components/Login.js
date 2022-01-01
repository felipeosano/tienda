import React from 'react'
import '../assets/css/loginAndSignup.css'
import { useMediaQuery } from 'react-responsive'


export default function Login(props) {
    
    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    return (
        <div>
            {isDesktopOrLaptop && 
            <div className='login'>
                <div className='login-inner'>
                <div className='divExitButton'>
                    <button className='exitButton' onClick={() => props.setViewLogin(0)}>Cerrar</button>
                </div>
                <h1>Hola!, Ingresa</h1>
                <form onSubmit={props.login}>
                    <input type="text" placeholder="Email" className='inputF' onChange={(e) => {props.setMail(e.target.value)}}></input>
                    <input type="password" placeholder="Contraseña" className='inputF' onChange={(e) => {props.setPassword(e.target.value)}}></input>
                    <button type='submit' className='buttonLogin'>Entrar</button>
                </form>

                <div className='noTienesUsuarioDiv'>
                        <p className='noTienesUsuario'>¿No tienes usuario?,<label className='labelButton'  onClick={() => props.setViewLogin(2)}> Registrate</label></p>
                    </div>
                    <a href='/'>¿Olvidaste el usuario o la contraseña?</a>
                    <p className='invalidLoginTxt'>{props.message}</p>
                </div>
            </div>
            }
            {isTabletOrMobile &&
            <div className='login-inner-Phone'>
                <h1>Hola!, Ingresa</h1>
                <form onSubmit={props.login}>
                    <input type="text" placeholder="Email" className='inputF' onChange={(e) => {props.setMail(e.target.value)}}></input>
                    <input type="password" placeholder="Contraseña" className='inputF' onChange={(e) => {props.setPassword(e.target.value)}}></input>
                    <button type='submit' className='buttonLogin'>Entrar</button>
                </form>
                <div className='noTienesUsuarioDiv'>
                    <p className='noTienesUsuario'>¿No tienes usuario?,<label  className='labelButton' onClick={() => props.setViewLogin(2)}>Registrate</label></p>
                </div>
                <a href='/'>¿Olvidaste el usuario o la contraseña?</a>
                <label>{props.message}</label>
            </div>
            
            }
        </div>
    )
}
