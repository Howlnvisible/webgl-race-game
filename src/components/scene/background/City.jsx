export default function CityBg({
    geometry,
    material,
    position,
    rotation,
    scale
}) {
    return (
        <group 
            position={position}
            rotation={rotation}
            scale={scale}
        >
            <mesh 
                geometry={geometry}
                material={material}
                position={[- 8, 0, 3]}
            />
            <mesh 
                geometry={geometry}
                material={material}
                position={[- 14, -1, 5]}
                scale={0.9}
            />
            <mesh 
                geometry={geometry}
                material={material}
                position={[- 18, - 2, 8]}
                scale={0.9}
            />
        </group>
    )
}