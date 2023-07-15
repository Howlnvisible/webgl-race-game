import { Float, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function BlockStart({
    position = [0, 0, 0],
    boxGeometry,
    material,
    isStarted
}) {
    const { size } = useThree();

    const calculateScale = () => {
        const screenWidth = size.width;
        const screenHeight = size.height;
        // console.log(screenWidth, screenHeight);
        // Calculate the desired scale based on the screen size
        // You can adjust these values according to your needs
        const scale = Math.min(screenWidth, screenHeight) * 0.0005;
        // console.log(scale);
        return scale;
    };

    const calculateFontPosition = () => {
        const screenWidth = size.width;
        const screenHeight = size.height;
        // console.log(screenWidth, screenHeight);

        const position = Math.min(screenWidth, screenHeight) * 0.0005;
        // console.log(position);
        return position

    };
    return (
        <group position={position} visible={isStarted ? true : false}>
            <Float floatIntensity={0.25} rotationIntensity={0.25}>
                <Text
                    font='./bebas-neue-v9-latin-regular.woff' 
                    scale={calculateScale()}
                    // fontSize={calculateFontSize()}
                    maxWidth={0.25}
                    lineHeight={0.75}
                    textAlign='right'
                    position={[calculateFontPosition(), 0.85, 0]}
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