import './admin.css'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { auth, db } from '../../firebaseConnection.js'
import { signOut } from 'firebase/auth'

import { 
    addDoc,
    collection } from 'firebase/firestore'

import { faPenToSquare, faCircleCheck, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Admin() {

    const [tarefaInput, setTarefaInput] = useState('')
    const [user, setUser] = useState({})

    async function handleRegister(e) {
        e.preventDefault()

        if(tarefaInput === '') {
            return toast.error('Digite algo para armazenar a tarefa!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }

        await addDoc(collection(db, "tarefas"), {
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user.uid
        })
        .then(() => {
            setTarefaInput('')
            return toast.success('Tarefa registrada com sucesso!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        })
        .catch(() => {
            return toast.error('Erro ao cadastrar a tarefa!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        })
    }

    useEffect(() => {
        async function loadTarefas() {
            const userDetail = localStorage.getItem("@userdetail")
            setUser(JSON.parse(userDetail))
        }

        loadTarefas()
    }, [])

    async function handleLogout() {
        await signOut(auth)
    }

    return(
        <div className='admin-container'>
           <h1>Minhas tarefas</h1>

           <form onSubmit={handleRegister}>

                <textarea value={tarefaInput} placeholder='Digite sua tarefa...' onChange={(e) => setTarefaInput(e.target.value)}/>


                <button type='submit'>Registrar Tarefa</button>
           </form>

           <article className='tarefas'>
            <p>Estudar js e react</p>
            

            <div>
                <button className="btn-edit"><FontAwesomeIcon icon={faPenToSquare} className="icon" size="xl"/> </button>
                <button className='btn-delete'><FontAwesomeIcon icon={faCircleCheck} size="xl" style={{color: '#ffcc23'}}/></button>
            </div>
           </article>


           <button onClick={handleLogout} className='btn-logout'><FontAwesomeIcon icon={faRightFromBracket} size="2xl"/></button>
        </div>
    )
}