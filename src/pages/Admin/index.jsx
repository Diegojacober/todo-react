import './admin.css'
import { useState } from 'react'
import { auth } from '../../firebaseConnection.js'
import { signOut } from 'firebase/auth'

import { faPenToSquare, faCircleCheck, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Admin() {

    const [tarefaInput, setTarefaInput] = useState('')

    async function handleRegister(e) {
        e.preventDefault()

    }

    async function handleLogout() {
        await signOut(auth)
    }

    return(
        <div className='admin-container'>
           <h1>Minhas tarefas</h1>

           <form onSubmit={handleRegister}>

                <textarea placeholder='Digite sua tarefa...' onChange={(e) => setTarefaInput(e.target.value)}/>


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