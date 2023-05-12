import { useState } from "react"
import './home.css'

import { Link } from "react-router-dom"
import { toast } from 'react-toastify';

import { auth } from '../../firebaseConnection'
import { signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from "react-router-dom";

export default function Home() {

    const [email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()
       
        if(email !== '' && password !== '') {
           if (password.length < 6 ) {
            toast.info('A senha deve ter 6 caracteres ou mais', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
                
           } else {
            await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                
                navigate('/admin', {replace: true})
    
               }).catch((error) => {
                    if (error.code === 'auth/user-not-found') {
                        toast.error('Usuário não encontrado!', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                            });
                    } else {
                        toast.error('Erro ao fazer login, verifique seu email e senha!', {
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
               })
           }
           
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
            <h1>Lista de tarefas </h1>
            <span>Gerencia sua agenda de forma fácil.</span>

            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Digite seu email..." onChange={(e) => {setEmail(e.target.value)}}/>

                <input type="password" autoComplete="false" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)}/>

                <button type="submit">Acessar</button>
            </form>

            <Link to="/register" className="button-link">Não possui uma conta? Cadastre-se</Link>
        </div>
    )
}