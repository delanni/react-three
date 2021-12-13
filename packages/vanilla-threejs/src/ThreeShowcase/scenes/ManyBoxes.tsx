import React, {useEffect} from "react";
import * as THREE from 'three';
import {OrbitControls} from "../utils";
import {generateRandomBoxesForCoordinates} from "../utils";



export default () => {

  useEffect(() => {
    const canvas = document.getElementById('manyBoxesCanvas')! as HTMLCanvasElement;

    const canvasContainer = canvas.parentElement!;
    canvas.width = canvasContainer.clientWidth;
    canvas.height = canvasContainer.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({canvas, alpha: true});

    // Light
    const light = new THREE.PointLight('white', 0.6);
    light.position.set(0, 0, 3);
    scene.add(light);

    // Create Cubes
    const boxProperties = generateRandomBoxesForCoordinates([-1, 0, 1], [-1, 0, 1], [-1, 0, 1], 1);

    const geometry = new THREE.BoxGeometry();

    const cubes = boxProperties.map((boxProps) => {
      const material = new THREE.MeshStandardMaterial();
      material.color.set(boxProps.color);

      const cube = new THREE.Mesh(geometry, material);
      cube.userData.boxProperties = boxProps;
      cube.position.set(boxProps.x, boxProps.y, boxProps.z);

      scene.add(cube);
      return cube;
    });

    const controls = new OrbitControls(camera, renderer.domElement);

    let lastFrameId: number;
    const renderScene = (totalTime: number) => {
      // Animation
      cubes.forEach(c => animateCube(c, totalTime));

      controls.update();
      renderer.render(scene, camera);
      lastFrameId = requestAnimationFrame(renderScene);
    }

    renderScene(0);

    return () => cancelAnimationFrame(lastFrameId);
  }, [])

  return <canvas id={"manyBoxesCanvas"}/>
}

function animateCube(cube: THREE.Mesh, elapsedTimeMs: number) {
  const elapsedTime = elapsedTimeMs / 1000;
  const props = cube.userData.boxProperties;

  const phaseX = (elapsedTime % props.phaseSpeedX) / props.phaseSpeedX;
  const phaseY = (elapsedTime % props.phaseSpeedY) / props.phaseSpeedY;
  const phaseZ = (elapsedTime % props.phaseSpeedZ) / props.phaseSpeedZ;

  cube.rotation.x = phaseX * Math.PI * 2;
  cube.rotation.y = phaseY * Math.PI * 2;
  cube.rotation.z = phaseZ * Math.PI * 2;

  const sizePhase = Math.sin(phaseX * Math.PI) / 2;
  cube.scale.set(sizePhase, sizePhase, sizePhase);
}
