import React, {useEffect} from "react";
import * as THREE from 'three';
import {OrbitControls} from "../utils";

export default () => {
  useEffect(() => {
    const canvas = document.getElementById('basicBoxGeometryCanvas')! as HTMLCanvasElement;

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
    light.position.set(1, 1, 1);
    scene.add(light);

    // Create Cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial();
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const controls = new OrbitControls(camera, renderer.domElement);

    let lastFrameId: number;
    const renderScene = () => {
      controls.update();
      renderer.render(scene, camera);
      lastFrameId = requestAnimationFrame(renderScene);
    }

    renderScene();

    return () => cancelAnimationFrame(lastFrameId);
  }, []);

  return <canvas id={"basicBoxGeometryCanvas"}/>
}