import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useState } from "react";
import { useRef } from "react";

export default function BlockLimbo({
    position = [0, 0, 0],
    boxGeometry,
    material,
    obstacleMaterial
}) {
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2)
    const obstacleRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const y = Math.sin(time + timeOffset) + 1.15;
        obstacleRef.current.setNextKinematicTranslation({
            x: position[0],
            y: position[1] + y,
            z: position[2]
        })

    })
    return (
        <group position={position}>
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
                // position={[0, -0.1, 0]} 
                scale={[3.5, 0.3, 0.9]}
                castShadow
                receiveShadow
            >
            </mesh>
            </RigidBody>
        </group>
    )
}