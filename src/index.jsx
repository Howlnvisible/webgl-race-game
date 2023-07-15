import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { KeyboardControls, Loader } from '@react-three/drei'
import Interface from './components/interface'
import { Suspense } from 'react'
import LoadingScreen from './components/interface/LoadingScreen'
import App from './App'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <App />
)