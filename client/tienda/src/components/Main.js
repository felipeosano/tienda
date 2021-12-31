import '../assets/css/main.css'


function Main() {
    return (
        <div className='div-container'>
            <div className='serch'>
                <form className='serchForm'>
                    <input placeholder="Buscar" type='text'className='inputForm'></input>
                    <input type='submit' className='inputFormSerch'></input>
                </form>
            </div>
            
        </div>
     );
}

export default Main;