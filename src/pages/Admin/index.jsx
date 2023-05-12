import './admin.css'
import { useState } from 'react'

export default function Admin() {

    const [tarefaInput, setTarefaInput] = useState('')

    async function handleRegister(e) {
        e.preventDefault()

    }

    return(
        <div className='admin-container'>
           <h1>Minhas tarefas</h1>

           <form onSubmit={handleRegister}>

                <textarea placeholder='Digite sua tarefa...' onChange={(e) => setTarefaInput(e.target.value)}/>


                <button type='submit'>Registrar Tarefa</button>
           </form>

           <article>
            <p>Estudar js e react</p>

            <div>
                <button>Editar</button>
                <button className='btn-delete'>Concluir</button>
            </div>
           </article>


           <button className='btn-logout'>Sair</button>
        </div>
    )
}