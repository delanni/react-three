import React, {useState} from 'react';

import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";

import BasicBoxGeometry from "./scenes/BasicBoxGeometry";
import Animations from "./scenes/Animations";
import ManyBoxes from "./scenes/ManyBoxes";
import Models from "./scenes/Models";

const scenes = [
  <BasicBoxGeometry/>,
  <Animations/>,
  <ManyBoxes/>,
  <Models/>
];

export default () => {
  const [currentSceneIdx, setSceneIdx] = useState(0);

  const currentScene = scenes[currentSceneIdx];

  return <div className="fullSize">
    <button onClick={() => setSceneIdx(currentSceneIdx - 1)}>
      &lt; Previous scene
    </button>
    Scene: ({currentSceneIdx+1} / {scenes.length})
    <button onClick={() => setSceneIdx(currentSceneIdx + 1)}>
      Next scene &gt;
    </button>
    <div className="canvasContainer">
      <Canvas frameloop={"always"}>
        <OrbitControls/>
        {currentScene}
      </Canvas>
    </div>
  </div>
}