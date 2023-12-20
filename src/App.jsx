import { useState } from "react";
import "./style.css";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { KeyboardControls } from "@react-three/drei";
import Interface from "./components/interface";
import LoadingScreen from "./components/interface/LoadingScreen";
import MobileLayout from "./components/interface/Layouts/MobileLayout";

export default function App() {
  const [start, setStart] = useState(false);
  const innerWidth = window.innerWidth;
  const isDesktop = innerWidth >= 1024;

  return isDesktop ? (
    <KeyboardControls
      map={[
        {
          name: "forward",
          keys: ["ArrowUp", "KeyW"],
        },
        {
          name: "backward",
          keys: ["ArrowDown", "KeyS"],
        },
        {
          name: "leftward",
          keys: ["ArrowLeft", "KeyA"],
        },
        {
          name: "rightward",
          keys: ["ArrowRight", "KeyD"],
        },
        {
          name: "jump",
          keys: ["Space"],
        },
      ]}
    >
      <Canvas shadows camera={{ position: [0, 0, 4.5], fov: 50 }}>
        <Experience />
      </Canvas>
      <LoadingScreen started={start} onStarted={() => setStart(true)} />
      <Interface />
    </KeyboardControls>
  ) : (
    <MobileLayout>Desktop experience only</MobileLayout>
  );
}
