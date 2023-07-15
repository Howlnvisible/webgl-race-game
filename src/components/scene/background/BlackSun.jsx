import * as THREE from 'three'
import { useState } from 'react'
import { Canvas, extend } from '@react-three/fiber'
import { Effects } from '@react-three/drei'
import { UnrealBloomPass } from 'three-stdlib'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass'
import { useControls } from 'leva'

extend({ UnrealBloomPass, OutputPass })

export default function BlackSun({
    position,
    levelCount
}) {
  const { intensity, radius } = useControls({
    intensity: { value: 0.4, min: 0, max: 1.5, step: 0.01 },
    radius: { value: 0, min: 0, max: 1, step: 0.01 }
  })
  const blackSunGeometry = new THREE.CircleGeometry(0.8, 64)
  return (
    <>
      {/* <Effects disableGamma>
        <unrealBloomPass threshold={1} strength={0.66} radius={0.58} />
        <outputPass args={[THREE.ACESFilmicToneMapping]} />
      </Effects> */}

      <mesh
            geometry={blackSunGeometry}
            position={[0, 15.5, - (levelCount + 4) * 6]}
            scale={15.9}
        >
            <meshStandardMaterial
                color={[1.5, 1, 4]}
                emissive={[1.5, 1, 4]}
                toneMapped={false}
                emissiveIntensity={2}
            />
        </mesh>
        <mesh
            geometry={blackSunGeometry} 
            position={position} 
            scale={15}
        >
            <meshStandardMaterial color="#000000" />
        </mesh>
    </>
  )
}

function Shape({ children, color, ...props }) {
  const [hovered, hover] = useState(true)
  return (
    <mesh {...props} onPointerOver={() => hover(false)} onPointerOut={() => hover(true)}>
      {children}
      {/* Now, in order to get selective bloom we simply crank colors out of
        their natural spectrum. Where colors are normally defined between 0 - 1 we push them
        way out of range, into a higher defintion (HDR). What previously was [1, 1, 1] now could
        for instance be [10, 10, 10]. This requires that toneMapping is off, or it clamps to 1 */}
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 2 : 0} toneMapped={false} />
    </mesh>
  )
}


// import { AccumulativeShadows, Circle, Effects, RandomizedLight, useHelper } from "@react-three/drei";
// import { useRef } from "react";
// import { DirectionalLightHelper } from "three";
// import * as THREE from 'three';
// import { UnrealBloomPass } from 'three-stdlib'
// import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass'
// import { extend } from "@react-three/fiber";
// import { useControls } from "leva";

// extend({ UnrealBloomPass, OutputPass })

// export default function BlackSun({
//     position,
//     levelCount
// }) {
//     const { intensity, radius } = useControls({
//         intensity: { value: 0.4, min: 0, max: 1.5, step: 0.01 },
//         radius: { value: 0, min: 0, max: 1, step: 0.01 }
//     })
//     const blackSunGeometry = new THREE.CircleGeometry(0.8, 64)
//     return (
//         <>
//         <mesh
//             geometry={blackSunGeometry}
//             position={[0, 15.5, - (levelCount + 4) * 6]}
//             scale={16.5}
//         >
//             <meshStandardMaterial
//                 color='skyblue'
//                 emissive='skyblue'
//                 // toneMapped={false}
//             />
//         </mesh>
//         <mesh
//             geometry={blackSunGeometry} 
//             position={position} 
//             scale={15}
//         >
//             <meshStandardMaterial color="#000000" />
//         </mesh>
//         </>
//     )
// }