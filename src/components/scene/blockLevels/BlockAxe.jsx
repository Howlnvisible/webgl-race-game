import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useState } from "react";
import { useRef } from "react";

export default function BlockAxe({
    position = [0, 0, 0],
    boxGeometry,
    material,
    obstacleMaterial,
    isStarted
}) {
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2)
    const obstacleRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const x = Math.sin(time + timeOffset) * 1.25;
        obstacleRef.current.setNextKinematicTranslation({
            x: position[0] + x,
            y: position[1] + 0.75,
            z: position[2]
        })

    })
    return (
        <group position={position} visible={isStarted ? true : false}>
            <mesh 
                geometry={boxGeometry} 
                material={material}
                position={[0, -0.1, 0]} 
                scale={[4, 0.2, 4]} 
                receiveShadow
            >
            </mesh>

            <RigidBody 
                type='kinematicPosition'
                position={[0, 0.3, 0]}
                restitution={0.2}
                friction={0}
                ref={obstacleRef}
            >
            <mesh 
                geometry={boxGeometry} 
                material={obstacleMaterial}
                scale={[1.5, 1.5, 0.3]}
                castShadow
                receiveShadow
            >
            </mesh>
            </RigidBody>
        </group>
    )
}