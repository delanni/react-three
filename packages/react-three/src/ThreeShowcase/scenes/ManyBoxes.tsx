import React, {useRef} from "react";
import {Vector3, Mesh} from "three";
import {useFrame} from "@react-three/fiber";

import {generateRandomBoxesForCoordinates, AnimatedBoxProperty} from "../utils";

export default () => {
  const boxProperties = generateRandomBoxesForCoordinates([-1, 0, 1], [-1, 0, 1], [-1, 0, 1]);
  return <>
    {boxProperties.map((boxProp, i) =>
        <AnimatedBox key={i} {...boxProp} />)
    }
    <pointLight intensity={0.6} color={"white"} position={[1, 1, 1]}/>
  </>
}

function AnimatedBox(props: AnimatedBoxProperty) {
  const meshRef = useRef<Mesh>();

  useFrame((state, delta) => {
    if (meshRef.current) {
      const phaseX = (state.clock.elapsedTime % props.phaseSpeedX) / props.phaseSpeedX;
      const phaseY = (state.clock.elapsedTime % props.phaseSpeedY) / props.phaseSpeedY;
      const phaseZ = (state.clock.elapsedTime % props.phaseSpeedZ) / props.phaseSpeedZ;

      meshRef.current.rotation.x = phaseX * Math.PI * 2;
      meshRef.current.rotation.y = phaseY * Math.PI * 2;
      meshRef.current.rotation.z = phaseZ * Math.PI * 2;

      const sizePhase = Math.sin(phaseX * Math.PI) / 2;
      meshRef.current?.scale.set(sizePhase, sizePhase, sizePhase);
    }
  });

  return <mesh ref={meshRef} position={new Vector3(props.x, props.y, props.z)}>
    <boxGeometry/>
    <meshStandardMaterial color={props.color}/>
  </mesh>
}
