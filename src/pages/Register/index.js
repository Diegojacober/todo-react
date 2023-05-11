import { useState } from "react"
import './register.css'

import { Link } from "react-router-dom"
import { toast } from 'react-toastify';

export default function Register() {

    const [email, setEmail] = useState('')
    const[password, setPassword] = useState('')

    function handleRegister(e) {
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
            <h1>Cadastre-se</h1>
            <span>Vamos criar sua conta!</span>

            <form className="form" onSubmit={handleRegister}>
                <input type="email" placeholder="Digite seu email..." onChange={(e) => {setEmail(e.target.value)}}/>

                <input type="password" autoComplete="false" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)}/>

                <button type="submit">Cadastrar</button>
            </form>

            <Link to="/" className="button-link">Já tem uma conta? faça login</Link>
        </div>
    )
}