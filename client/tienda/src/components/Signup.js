import React from 'react'
import '../assets/css/loginAndSignup.css'
import { useMediaQuery } from 'react-responsive'


export default function Signup(props) {

    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 1224px)' })

    return (
        <div>
            {isDesktopOrLaptop &&
                <div className='login'>
                    <div className='login-inner'>
                        <div className='divExitButton'>
                            <button className='exitButton' onClick={() => props.setViewSignup(0)}>Cerrar</button>
                         </div> 
                         <h1>Hola bienvenido!</h1>
                         <div className="register">
                            <input placeholder='Nombre' type="text" onChange={(e) => {props.setUsernameReg(e.target.value)}}/>
                            <input placeholder='Apellido' type="text" onChange={(e) => {props.setLastNameReg(e.target.value)}}/>
                            <input placeholder='Contraseña'  type="password" onChange={(e) => {props.setPasswordReg(e.target.value)}}/>
                            <div className='espPassword'>
                                <p>Contraseña:</p><br/>
                                <p>-Entre 6 y 16 caracteres</p><br/>
                                <p>-Un numero o mas</p><br/>
                                <p>-Un carater especial o mas (!@#$%)</p><br/>
                            </div>
                            <input placeholder='Mail' type="text" onChange={(e) => {props.setMailReg(e.target.value)}}/>
                            <input placeholder='Telefono' type="text" onChange={(e) => {props.setPhoneReg(e.target.value)}}/>
                            <button onClick={props.register} className='buttonLogin'>Registrarme</button>
                        </div>
                         <div className='noTienesUsuarioDiv'>
                            <p className='noTienesUsuario'>¿Ya tienes usuario?,<label onClick={() => props.setViewSignup(1)}> Iniciar Sesion</label></p>
                        </div>
                    </div>
                </div>
            }
            {isTabletOrMobile &&
                <div className='login-inner-Phone'>
                    <h1>Hola bienvenido!</h1>
                    <div className="register">
                            <input placeholder='Nombre' type="text" onChange={(e) => {props.setUsernameReg(e.target.value)}}/>
                            <input placeholder='Apellido' type="text" onChange={(e) => {props.setLastNameReg(e.target.value)}}/>
                            <input placeholder='Contraseña'  type="password" onChange={(e) => {props.setPasswordReg(e.target.value)}}/>
                            <div className='espPassword'>
                                <p>Contraseña:</p><br/>
                                <p>-Entre 6 y 16 caracteres</p><br/>
                                <p>-Un numero o mas</p><br/>
                                <p>-Un carater especial o mas (!@#$%)</p><br/>
                            </div>
                            
                            <input placeholder='Mail' type="text" onChange={(e) => {props.setMailReg(e.target.value)}}/>
                            <input placeholder='Telefono' type="text" onChange={(e) => {props.setPhoneReg(e.target.value)}}/>
                            <button onClick={props.register} className='buttonLogin'>Registrarme</button>
                        </div>
                    <div className='noTienesUsuarioDiv'>
                        <p className='noTienesUsuario'>¿Ya tienes usuario?,<label onClick={() => props.setViewSignup(1)}> Iniciar Sesion</label></p>
                    </div>
                </div>
            }
        </div>
    )
}
