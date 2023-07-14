import BlockStart from "../blockLevels/BlockStart";
import * as THREE from 'three';
import BlockSpinner from "../blockLevels/BlockSpinner";
import BlockLimbo from "../blockLevels/BlockLimbo";
import BlockAxe from "../blockLevels/BlockAxe";
import BlockEnd from "../blockLevels/BlockEnd";
import { useMemo } from "react";
import Bounds from "../blockLevels/Bounds";

THREE.ColorManagement.legacyMode = false;

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floor1Material = new THREE.MeshStandardMaterial({color: 'limegreen'});
const floor2Material = new THREE.MeshStandardMaterial({color: 'greenyellow'});
const obstacleMaterial = new THREE.MeshStandardMaterial({color: 'orangered'});
const wallMaterial = new THREE.MeshStandardMaterial({color: 'slategrey'});

export default function Level({
  levelCount,
  levelTypes = [BlockSpinner, BlockAxe, BlockLimbo],
  levelSeed = 0
}) {
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
      />
      {levelBlocks.map((Block, index) => (
        <Block 
          key={`levelBlocks-${index}`}
          boxGeometry={boxGeometry}
          material={floor2Material}
          obstacleMaterial={obstacleMaterial}
          position={[0, 0, - (index + 1) * 4]}
        />
      ))}
      <BlockEnd 
        boxGeometry={boxGeometry}
        material={floor1Material} 
        position={[0, 0, - (levelCount + 1) * 4]}
      />
      <Bounds
        geometry={boxGeometry}
        material={wallMaterial}
        bounds={levelCount + 2} 
      />
    </>
  );
}
