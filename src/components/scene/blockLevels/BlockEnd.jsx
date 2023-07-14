import { useGLTF, useTexture } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier";

export default function BlockEnd({
    position = [0, 0, 0],
    boxGeometry,
    material
}) {
    const { nodes } = useGLTF('./model/portal.glb');
    const hamburger = useGLTF('./hamburger.glb');
    const bakedMaterial = useTexture('./model/baked.jpg');
    bakedMaterial.flipY = false;
    hamburger.scene.children.forEach((mesh) => {
        mesh.castShadow = true;
    })
    return (
        <group position={position}>
            <mesh 
                geometry={boxGeometry} 
                material={material}
                position={[0, 0, 0]} 
                scale={[4, 0.2, 4]} 
                receiveShadow
            >
            </mesh>
            {/* <RigidBody 
                type='fixed'
                colliders='hull'
                restitution={0.2}
                friction={0} 
            >
                <primitive object={hamburger.scene} scale={0.2} />
            </RigidBody> */}
            <mesh geometry={nodes.baked.geometry}>
                <meshBasicMaterial map={bakedMaterial} toneMapped={false} />
            </mesh>
            <mesh 
                geometry={nodes.poleLightA.geometry}
                position={nodes.poleLightA.position}  
            >
                <meshBasicMaterial color='#ffffe5' />
            </mesh>

            <mesh 
                geometry={nodes.poleLightB.geometry}
                position={nodes.poleLightB.position}  
            >
                <meshBasicMaterial color='#ffffe5' />
            </mesh>

            <mesh 
                geometry={nodes.portalLight.geometry}
                position={nodes.portalLight.position}
                rotation={nodes.portalLight.rotation}
            >
            </mesh>
        </group>
    )
}