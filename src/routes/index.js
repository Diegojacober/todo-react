import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Register from '../pages/Register'
import Admin from '../pages/Admin'
import Private from './private'
import Public from './public'

function RoutesApp() {
    return (
        <Routes>
            <Route path='/' element={<Public> <Home /> </Public>} />
            <Route path='/register' element={<Public> <Register /> </Public>} />
            <Route path='/admin' element={<Private> <Admin /> </Private>} />
            
        </Routes>
    )
}

export default RoutesApp