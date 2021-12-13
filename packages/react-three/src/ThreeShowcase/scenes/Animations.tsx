import React, {useRef} from "react";
import THREE from "three";
import {useFrame} from "@react-three/fiber";

export default () => {
  const meshRef = useRef<THREE.Mesh>();

  useFrame((state, delta) => {
    if (meshRef.current) {
      const phase = ((state.clock.elapsedTime % 3) / 3);
      meshRef.current.rotation.x = phase * Math.PI * 2;
      meshRef.current.rotation.y = phase * Math.PI;
    }
  });

  return <>
    <pointLight intensity={0.6} color={"white"} position={[1, 1, 1]}/>
    <mesh ref={meshRef}>
      <boxGeometry/>
      <meshStandardMaterial/>
    </mesh>
  </>
}

