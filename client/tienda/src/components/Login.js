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
                <div>
                    <input type="text" placeholder="Email" onChange={(e) => {props.setMail(e.target.value)}}></input>
                    <input type="password" placeholder="Contraseña" onChange={(e) => {props.setPassword(e.target.value)}}></input>
                    <button onClick={props.login}  className='buttonLogin'>Entrar</button>
                    <div class="form__group field">
  <input type="input" class="form__field" placeholder="Name" name="name" id='name' required />
  <label for="name" class="form__label">Name</label>
</div>
                </div>

                <div className='noTienesUsuarioDiv'>
                        <p className='noTienesUsuario'>¿No tienes usuario?,<label onClick={() => props.setViewLogin(2)}> Registrate</label></p>
                    </div>
                    <a href='/'>¿Olvidaste el usuario o la contraseña?</a>
                    <p className='invalidLoginTxt'>{props.message}</p>
                </div>
            </div>
            }
            {isTabletOrMobile &&
            <div className='login-inner-Phone'>
                <h1>Hola!, Ingresa</h1>
                <div>
                    <input type="text" placeholder="Email" onChange={(e) => {props.setMail(e.target.value)}}></input>
                    <input type="password" placeholder="Contraseña" onChange={(e) => {props.setPassword(e.target.value)}}></input>
                    <button onClick={props.login}  className='buttonLogin'>Entrar</button>
                </div>
                <div className='noTienesUsuarioDiv'>
                    <p className='noTienesUsuario'>¿No tienes usuario?,<label onClick={() => props.setViewLogin(2)}>Registrate</label></p>
                </div>
                <a href='/'>¿Olvidaste el usuario o la contraseña?</a>
                <p className='invalidLoginTxt'>{props.message}</p>
            </div>
            
            }
        </div>
    )
}
