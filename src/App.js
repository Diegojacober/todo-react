import RoutesApp from './routes/index'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
    return (
        <>
            <ToastContainer autoClose={3000}/>
            
            <BrowserRouter>
        
            <RoutesApp />
            </BrowserRouter>
        </>
        
    )
}


export default App