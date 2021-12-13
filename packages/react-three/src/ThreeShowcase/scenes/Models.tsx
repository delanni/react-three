import React, {useState} from "react";
import {Vector3} from "three";
import {Html} from '@react-three/drei'

import SpidermanModel from '../models/Spiderman';

export default () => {
  const [hover, setHover] = useState(false);

  const unscale = 1 / 100;

  return <>
    {hover && <ambientLight intensity={0.8} color={"lightgreen"}/>}
    {hover && <Html>
      <a className={'label'} href={"https://en.wikipedia.org/wiki/Spider-Man"}
         onPointerOver={() => setHover(true)}>
        Spooder man
      </a>
    </Html>}
    <pointLight intensity={0.6} color={"white"} position={[3, 3, 3]}/>
    <SpidermanModel onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                    scale={new Vector3(unscale, unscale, unscale)}/>
  </>
}
