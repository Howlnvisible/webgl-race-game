import { useState } from "react";
import './style.css'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { KeyboardControls, Loader } from '@react-three/drei'
import Interface from './components/interface'
import LoadingScreen from './components/interface/LoadingScreen'

export default function App() {
    const [start, setStart] = useState(false);
    return (
        <KeyboardControls
        map={[
            {
                name: 'forward',
                keys: [
                    'ArrowUp',
                    'KeyW'
                ]
            },
            {
                name: 'backward',
                keys: [
                    'ArrowDown',
                    'KeyS'
                ]
            },
            {
                name: 'leftward',
                keys: [
                    'ArrowLeft',
                    'KeyA'
                ]
            },
            {
                name: 'rightward',
                keys: [
                    'ArrowRight',
                    'KeyD'
                ]
            },
            {
                name: 'jump',
                keys: [
                    'Space',
                ]
            },
        ]}
    >
    <Canvas
        shadows
        camera={{ position: [0, 0, 4.5], fov: 50 }}
    >
        <Experience />
    </Canvas>
    <LoadingScreen started={start} onStarted={() => setStart(true)} />
    <Interface />
    </KeyboardControls>
    )
}