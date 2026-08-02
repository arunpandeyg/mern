import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    <Toaster position="top-right" richColors/>
    </BrowserRouter>
  </StrictMode>,
)
