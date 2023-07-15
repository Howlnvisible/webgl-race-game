import BlockStart from "../blockLevels/BlockStart";
import * as THREE from 'three';
import BlockSpinner from "../blockLevels/BlockSpinner";
import BlockLimbo from "../blockLevels/BlockLimbo";
import BlockAxe from "../blockLevels/BlockAxe";
import BlockEnd from "../blockLevels/BlockEnd";
import { useMemo } from "react";
import Bounds from "../blockLevels/Bounds";
import CityBg from "../background/City";
import BlackSun from "../background/BlackSun";
import useGame from "../../../stores/useGame";
import NameInput from "../nameInput";

THREE.ColorManagement.legacyMode = false;

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floor1Material = new THREE.MeshStandardMaterial({color: '#bdcad1', roughness: 0.65, metalness: 1,});
const obstacleMaterial = new THREE.MeshStandardMaterial({color: '#85c6ff', roughness: 0.65, metalness: 1, opacity: 0.4});
const wallMaterial = new THREE.MeshStandardMaterial({color: '#85c6ff', roughness: 0.2, metalness: 1, opacity: 0.4});

const cityGeometry = new THREE.BoxGeometry(4,8,4);
const cityMaterial = new THREE.MeshStandardMaterial({color: 'black'})

export default function Level({
  levelCount,
  levelTypes = [BlockSpinner, BlockAxe, BlockLimbo],
  levelSeed = 0
}) {
  const isStarted = useGame((state) => state.isStarted);
  
  const levelBlocks = useMemo(() => {
    const levelBlocks = [];
    for (let i = 0; i < levelCount; i++) {
      const levelType = levelTypes[Math.floor(Math.random() * levelTypes.length)]
      levelBlocks.push(levelType)
    }
    return levelBlocks;
  }, [levelCount, levelTypes, levelSeed])
  return (
    <>
      <BlockStart 
        boxGeometry={boxGeometry}
        material={floor1Material} 
        position={[0, 0, 0]}
        isStarted={isStarted}
      />
      {levelBlocks.map((Block, index) => (
        <Block 
          key={`levelBlocks-${index}`}
          boxGeometry={boxGeometry}
          material={floor1Material}
          obstacleMaterial={obstacleMaterial}
          position={[0, 0, - (index + 1) * 4]}
          isStarted={isStarted}
        />
      ))}
      <BlockEnd 
        boxGeometry={boxGeometry}
        material={floor1Material} 
        position={[0, 0, - (levelCount + 1) * 4]}
        // position={[0, 0, -4]}
        isStarted={isStarted}
      />
      <Bounds
        geometry={boxGeometry}
        material={wallMaterial}
        bounds={levelCount + 2}
        isStarted={isStarted}
      />
      {/* <NameInput
        scale={2} 
        position={[0.4, 0.25, -1]} 
      /> */}

      {/* <CityBg
        geometry={cityGeometry}
        material={cityMaterial}
        position={[-4, 6, - (levelCount + 2) * 6]} 
        rotation={[0, Math.PI * 0.25, 0]}
        scale={2.5}
      />

      <CityBg
        geometry={cityGeometry}
        material={cityMaterial}
        position={[4, 6, - (levelCount + 2) * 6]} 
        rotation={[0, Math.PI * 0.5, 0]}
        scale={2.5}
      /> */}

      {/* <BlackSun
        position={[0, 15, - (levelCount + 3) * 6]}
        levelCount={levelCount} 
      /> */}
    </>
  );
}
