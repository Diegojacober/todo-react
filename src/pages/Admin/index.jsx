import './admin.css'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { auth, db } from '../../firebaseConnection.js'
import { signOut } from 'firebase/auth'

import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    doc,
    deleteDoc,
    updateDoc
} from 'firebase/firestore'

import { faPenToSquare, faCircleCheck, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Admin() {

    const [tarefaInput, setTarefaInput] = useState('')
    const [user, setUser] = useState({})

    const [tarefas, setTarefas] = useState([])
    const [edit, setEdit] = useState({})


    async function deleteTarefa(id) {
        const docRef = doc(db, "tarefas", id)

        await deleteDoc(docRef)
            .then(() => {
                return toast.success('Tarefa deletada com sucesso!', {
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


    function editTarefa(tarefa) {
        setTarefaInput(tarefa.tarefa)
        setEdit(tarefa)
    }

    async function handleUpdateTarefa() {
        const docRef = doc(db, "tarefas", edit.id)
        await updateDoc(docRef, {
            tarefa: tarefaInput
        })
            .then(() => {
                toast.success('Tarefa atualizada com sucesso!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setTarefaInput('')
                setEdit({})
            }).catch((e) => {
                setTarefaInput('')
                setEdit({})
                return toast.error('Erro ao atualizar a tarefa', {
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

    function cancelEdit() {
        setTarefaInput('')
        setEdit({})
    }


    async function handleRegister(e) {
        e.preventDefault()

        if (tarefaInput === '') {
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

        if (edit.id) {
            handleUpdateTarefa()
            return
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

            if (userDetail) {
                const data = JSON.parse(userDetail)

                const tarefasRef = collection(db, "tarefas")
                const q = query(tarefasRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))
                const unsub = onSnapshot(q, (snap) => {
                    let lista = []

                    snap.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid
                        })
                    })

                    setTarefas(lista)
                })
            }
        }

        loadTarefas()
    }, [])

    async function handleLogout() {
        await signOut(auth)
    }

    return (
        <div className='admin-container'>
            <h1>Minhas tarefas</h1>

            <form onSubmit={handleRegister}>

                <textarea value={tarefaInput} placeholder='Digite sua tarefa...' onChange={(e) => setTarefaInput(e.target.value)} />



                {Object.keys(edit).length > 0 ? (
                    <button type='submit'>Atualizar Tarefa</button>
                ) : (<button type='submit'>Registrar Tarefa</button>)}

                {Object.keys(edit).length > 0 &&
                    (
                        <button className='button-cancel' onClick={cancelEdit}>Cancelar edição</button>
                    )}
            </form>

            {tarefas.map((tarefa) => {
                return (
                    <article className='tarefas' key={tarefa.id}>
                        <p>{tarefa.tarefa}</p>


                        <div>
                            <button className="btn-edit" onClick={() => editTarefa(tarefa)}><FontAwesomeIcon icon={faPenToSquare} className="icon" size="xl" /> </button>
                            <button className='btn-delete' onClick={() => deleteTarefa(tarefa.id)}><FontAwesomeIcon icon={faCircleCheck} size="xl" style={{ color: '#ffcc23' }} /></button>
                        </div>
                    </article>
                )
            })}


            <button onClick={handleLogout} className='btn-logout'><FontAwesomeIcon icon={faRightFromBracket} size="2xl" /></button>
        </div>
    )
}
