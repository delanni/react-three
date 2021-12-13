import React from "react";

export default () => {
  return <>
    <pointLight intensity={0.6} color={"white"} position={[1, 1, 1]}/>
    <mesh>
      <boxGeometry/>
      <meshStandardMaterial/>
    </mesh>
  </>
}




