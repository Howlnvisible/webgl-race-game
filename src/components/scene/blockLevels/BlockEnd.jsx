import { shaderMaterial, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import portalVertexShader from "../../../shaders/portal/vertex.glsl";
import portalFragmentShader from "../../../shaders/portal/fragment.glsl";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#ffffff"),
    uColorEnd: new THREE.Color("#000000"),
  },
  portalVertexShader,
  portalFragmentShader
);

extend({ PortalMaterial });

export default function BlockEnd({
  position = [0, 0, 0],
  boxGeometry,
  material,
  isStarted,
}) {
  const portalMaterialRef = useRef();
  const { nodes } = useGLTF("./model/portal.glb");
  const bakedMaterial = useTexture("./model/baked.jpg");
  bakedMaterial.flipY = false;

  useFrame((_, delta) => {
    portalMaterialRef.current.uTime += delta * 2.5;
  });
  return (
    <group position={position} visible={isStarted ? true : false}>
      <mesh
        geometry={boxGeometry}
        material={material}
        position={[0, 0, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      ></mesh>
      <mesh geometry={nodes.baked.geometry}>
        <meshBasicMaterial map={bakedMaterial} toneMapped={false} />
      </mesh>
      <mesh
        geometry={nodes.poleLightA.geometry}
        position={nodes.poleLightA.position}
      >
        <meshBasicMaterial color="#ffffe5" />
      </mesh>

      <mesh
        geometry={nodes.poleLightB.geometry}
        position={nodes.poleLightB.position}
      >
        <meshBasicMaterial color="#ffffe5" />
      </mesh>

      <mesh
        geometry={nodes.portalLight.geometry}
        position={nodes.portalLight.position}
        rotation={nodes.portalLight.rotation}
      >
        <portalMaterial ref={portalMaterialRef} />
      </mesh>
    </group>
  );
}
