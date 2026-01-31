import { createRoot } from 'react-dom/client'
import App from './App.js'
import { BrowserRouter } from 'react-router-dom'
import {AuthProvider} from './context/AuthContext.js'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>   
    </BrowserRouter>,
)