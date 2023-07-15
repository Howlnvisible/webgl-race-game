import { CuboidCollider, RigidBody } from "@react-three/rapier";

export default function Bounds({
    bounds = 1,
    geometry,
    material,
    isStarted
}) {
    return (
        <group visible={isStarted ? true : false}>
        <RigidBody 
            type='fixed'
            restitution={0.2}
            friction={0}
        >
        
        <mesh
            material={material}
            geometry={geometry}
            position={[2.15, 0.75, - (bounds * 2) + 2]}
            scale={[0.3, 1.5, bounds * 4]}
            castShadow
        />
        <mesh
            material={material}
            geometry={geometry}
            position={[- 2.15, 0.75, - (bounds * 2) + 2]}
            scale={[0.3, 1.5, bounds * 4]}
            receiveShadow
        />
        <mesh
            material={material}
            geometry={geometry}
            position={[0, 0.75, - (bounds * 4) + 2]}
            scale={[4, 1.5, 0.3]}
            receiveShadow
        />
        
        <CuboidCollider
            args={[2, 0.1, 2 * bounds]}
            position={[0, - 0.1, - (bounds * 2) + 2]}
            restitution={0.2}
            friction={1} 
        />
        </RigidBody>
        </group>
    )
}