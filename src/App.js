import RoutesApp from './routes/index'
import { BrowserRouter } from 'react-router-dom'

function App() {
    return (
        <BrowserRouter>
            <RoutesApp />
        </BrowserRouter>
    )
}


export default App