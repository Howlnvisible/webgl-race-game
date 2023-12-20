import { Environment, OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Lights from "./components/lights/Lights.jsx";
import Level from "./components/scene/level/index.jsx";
import Player from "./components/scene/Player/index.jsx";
import useGame from "./stores/useGame.js";

export default function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blockSeed = useGame((state) => state.blockSeed);

  return (
    <>
      <color args={["#000000"]} attach="background" />
      <OrbitControls
        autoRotate
        autoRotateSpeed={4}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.1}
        maxPolarAngle={Math.PI / 2.1}
      />
      <Environment preset="sunset" background blur={0.65} />

      <Physics debug={false}>
        <Lights />
        <Level levelCount={blocksCount} levelSeed={blockSeed} />
        <Player />
      </Physics>
    </>
  );
}
