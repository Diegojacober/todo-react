import { useState } from "react"
import './home.css'

import { Link } from "react-router-dom"
import { toast } from 'react-toastify';

export default function Home() {

    const [email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    function handleLogin(e) {
        e.preventDefault()
       
        if(email !== '' && password !== '') {
           
        }
         else{
            toast.error('Digite o email e senha para continuar!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
    }

    return(
        <div className="home-container">
            <h1>Lista de tarefas</h1>
            <span>Gerencia sua agenda de forma fácil.</span>

            <form className="form" onSubmit={handleLogin}>
                <input type="email" placeholder="Digite seu email..." onChange={(e) => {setEmail(e.target.value)}}/>

                <input type="password" autoComplete="false" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)}/>

                <button type="submit">Acessar</button>
            </form>

            <Link to="/register" className="button-link">Não possui uma conta? Cadastre-se</Link>
        </div>
    )
}