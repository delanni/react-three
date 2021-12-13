import React, {useEffect} from "react";
import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from "../utils";

const loader = new GLTFLoader();

export default () => {

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(-Infinity, Infinity);

  const sendMouseMoveEvent = (event: MouseEvent) => {
    const canvas = document.getElementById('modelCanvas')! as HTMLCanvasElement;
    const x = (event.clientX - canvas.offsetLeft);
    const y = (event.clientY - canvas.offsetTop);
    mouse.x = (x / canvas.width) * 2 - 1;
    mouse.y = -(y / canvas.height) * 2 + 1;
  }

  useEffect(() => {
    const canvas = document.getElementById('modelCanvas')! as HTMLCanvasElement;

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
    const light = new THREE.PointLight('white', 1.2);
    light.position.set(3, 3, 3);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight("lightgreen", 0.0);
    scene.add(ambientLight);

    // Start loading the model
    let modelGroup: THREE.Group;
    loader.load('http://127.0.0.1:4321/spiderman/scene.gltf', gltf => {
      const unscale = 1 / 100;
      modelGroup = gltf.scene;
      modelGroup.scale.set(unscale, unscale, unscale);
      scene.add(gltf.scene);
    }, undefined, error => {
      console.error(error);
    });

    const controls = new OrbitControls(camera, renderer.domElement);

    let lastFrameId: number;
    const renderScene = () => {

      // Set highlight if we hit something
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      if (intersects.length) {
        ambientLight.intensity = 0.8;
      } else {
        ambientLight.intensity = 0.0;
      }

      controls.update();
      renderer.render(scene, camera);
      lastFrameId = requestAnimationFrame(renderScene);
    }

    renderScene();

    return () => cancelAnimationFrame(lastFrameId);
  }, []);

  return <canvas id={"modelCanvas"} onMouseMove={ev => {
    sendMouseMoveEvent(ev as any)
  }}/>
}