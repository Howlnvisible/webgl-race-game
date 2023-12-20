import {
  AccumulativeShadows,
  RandomizedLight,
  useKeyboardControls,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, useRapier } from "@react-three/rapier";
import { useState, useRef, Suspense, useEffect } from "react";
import * as THREE from "three";
import useGame from "../../../stores/useGame";

export default function Player() {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const bodyRef = useRef();
  const { rapier, world } = useRapier();

  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(-10, 10, 10)
  );
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  const start = useGame((state) => state.start);
  const end = useGame((state) => state.end);
  const blocksCount = useGame((state) => state.blocksCount);
  const restart = useGame((state) => state.restart);
  const isStarted = useGame((state) => state.isStarted);

  const reset = () => {
    bodyRef.current.setTranslation({ x: 0, y: 1, z: 0 });
    bodyRef.current.setLinvel({ x: 0, y: 0, z: 0 });
    bodyRef.current.setAngvel({ x: 0, y: 0, z: 0 });
  };

  useEffect(() => {
    const unsubscribeReset = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        if (value === "ready") {
          reset();
        }
      }
    );
    const unsubscribe = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) {
          const origin = bodyRef.current.translation();
          origin.y -= 0.31;
          const direction = { x: 0, y: -1, z: 0 };

          const ray = new rapier.Ray(origin, direction);
          const hit = world.castRay(ray, 10, true);
          if (hit.toi < 0.15) {
            bodyRef.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
          }
        }
      }
    );

    // const unsubscribeReload = subscribeKeys(
    //   (state) => state.reload,
    //   (value) => {
    //     restart()
    //   }
    // )

    const unsubscribeAnyKey = subscribeKeys(() => start());
    return () => {
      unsubscribe();
      unsubscribeAnyKey();
      unsubscribeReset();
      // unsubscribeReload()
    };
  }, []);

  useFrame((state, delta) => {
    if (isStarted) {
      const { forward, backward, leftward, rightward } = getKeys();
      const impulse = { x: 0, y: 0, z: 0 };
      const torque = { x: 0, y: 0, z: 0 };

      const impulseStrength = 0.6 * delta;
      const torqueStrength = 0.2 * delta;

      if (forward) {
        impulse.z -= impulseStrength;
        torque.x -= torqueStrength;
      }

      if (rightward) {
        impulse.x += impulseStrength;
        torque.z -= torqueStrength;
      }

      if (backward) {
        impulse.z += impulseStrength;
        torque.x += torqueStrength;
      }

      if (leftward) {
        impulse.x -= impulseStrength;
        torque.z += torqueStrength;
      }

      bodyRef.current.applyImpulse(impulse);
      bodyRef.current.applyTorqueImpulse(torque);

      const bodyPosition = bodyRef.current.translation();
      const cameraPosition = new THREE.Vector3();
      cameraPosition.copy(bodyPosition);
      cameraPosition.z += 2.25;
      cameraPosition.y += 0.65;

      const cameraTarget = new THREE.Vector3();
      cameraTarget.copy(bodyPosition);
      cameraTarget.y += 0.5;

      smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
      smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

      if (isStarted) {
        state.camera.position.copy(smoothedCameraPosition);
        state.camera.lookAt(smoothedCameraTarget);
      }

      if (bodyPosition.z < -(blocksCount * 4 + 2)) {
        end();
      }

      if (bodyPosition.y < -4 && !forward) {
        restart();
      }
    }
  });
  return (
    <>
      <Suspense>
        {!isStarted && (
          <AccumulativeShadows
            temporal
            frames={200}
            color="purple"
            colorBlend={0.5}
            opacity={1}
            scale={10}
            alphaTest={0.85}
          >
            <RandomizedLight
              amount={8}
              radius={5}
              ambient={0.5}
              position={[5, 3, 2]}
              bias={0.001}
            />
          </AccumulativeShadows>
        )}
      </Suspense>
      <RigidBody
        position={[0, 1, 0]}
        colliders="ball"
        restitution={0.2}
        friction={1}
        canSleep={false}
        ref={bodyRef}
        linearDamping={0.5}
        angularDamping={0.5}
      >
        <mesh castShadow>
          <icosahedronGeometry args={[0.3, 3]} />
          <meshStandardMaterial metalness={1} roughness={1} />
        </mesh>
      </RigidBody>
    </>
  );
}
