import { Float, Text } from "@react-three/drei";

export default function BlockStart({
    position = [0, 0, 0],
    boxGeometry,
    material
}) {
    return (
        <group position={position}>
            <Float floatIntensity={0.25} rotationIntensity={0.25}>
                <Text
                    font='./bebas-neue-v9-latin-regular.woff' 
                    scale={0.5}
                    maxWidth={0.25}
                    lineHeight={0.75}
                    textAlign='right'
                    position={[0.75, 0.85, 0]}
                    rotation-y={- 0.25}
                >
                        Welcome to the race
                        <meshBasicMaterial toneMapped={false} />
                </Text>
            </Float>
            <mesh 
                geometry={boxGeometry} 
                material={material}
                position={[0, -0.1, 0]} 
                scale={[4, 0.2, 4]} 
                receiveShadow
            >
            </mesh>
        </group>
    )
}