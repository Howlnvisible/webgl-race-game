import { Html, Text } from "@react-three/drei";
import { useState } from "react";
import { ControlledInput } from "../../helpers/ControlledInput";

export default function NameInput(props) {
  const [text, setText] = useState("Enter your name...");
  return (
    <group {...props}>
      <Text
        position={[-1.2, -0.022, 0]}
        anchorX="0px"
        font="./Inter-Regular.woff"
        fontSize={0.335}
        letterSpacing={-0.0}
      >
        {text}
        <meshStandardMaterial color="black" />
      </Text>
      <mesh position={[0, -0.022, 0]} scale={[2.5, 0.48, 1]}>
        <planeGeometry />
        <meshBasicMaterial transparent opacity={0.3} depthWrite={false} />
      </mesh>
      <Html transform>
        <ControlledInput
          type={text}
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </Html>
    </group>
  );
}
