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
                            <input placeholder='Nombre y Apellido' type="text" className={props.errorNameSignup ? 'errorInputRed' : 'inputF'} onChange={(e) => {props.setUsernameReg(e.target.value)}}/>
                            <label className='messageIncorrectoInput'>{props.errorNameSignup ? 'Incorrecto' : null}</label>
                            <input placeholder='Contraseña'  type="password" className={props.errorPasswordSignup ? 'errorInputRed' : 'inputF'} onChange={(e) => {props.setPasswordReg(e.target.value)}}/>
                            <label className='messageIncorrectoInput'>{props.errorPasswordSignup ? 'Incorrecto' : null}</label>
                            <div className='espPassword'>
                            <p>Contraseña de mas de 6 caracteres</p>
                            </div>
                            <input placeholder='Email' type="text" className={props.errorEmailSignup ? 'errorInputRed' : 'inputF'} onChange={(e) => {props.setMailReg(e.target.value)}}/>
                            <label className='messageIncorrectoInput'>{props.errorEmailSignup ? 'Incorrecto' : null}</label>
                            
                            <button onClick={props.register} className='buttonLogin'>Registrarme</button>
                            
                            
                        </div>
                         <div className='noTienesUsuarioDiv'>
                            <p className='noTienesUsuario'>¿Ya tienes usuario?,<label className='labelButton' onClick={() => props.setViewSignup(1)}> Iniciar Sesion</label></p>
                        </div>
                        <p className='MailRegistred'>{props.errorEmailRegistred}</p>
                    </div>
                </div>
            }
            {isTabletOrMobile &&
                <div className='login-inner-Phone'>
                    <h1>Hola bienvenido!</h1>
                    <div className="register">
                            <input placeholder='Nombre y Apellido' type="text" className='inputF' onChange={(e) => {props.setUsernameReg(e.target.value)}}/>
                            <input placeholder='Contraseña'  type="password" className='inputF' onChange={(e) => {props.setPasswordReg(e.target.value)}}/>
                            <div className='espPassword'>
                            <p>Contraseña de mas de 6 caracteres</p>
                            </div>
                            <input placeholder='Email' type="text" className='inputF' onChange={(e) => {props.setMailReg(e.target.value)}}/>
                            <button onClick={props.register} className='buttonLogin'>Registrarme</button>
                        </div>
                    <div className='noTienesUsuarioDiv'>
                        <p className='noTienesUsuario'>¿Ya tienes usuario?,<label  className='labelButton' onClick={() => props.setViewSignup(1)}> Iniciar Sesion</label></p>
                    </div>
                </div>
            }
        </div>
    )
}
