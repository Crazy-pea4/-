import * as THREE from "three";

// 1. 创建场景
const scene = new THREE.Scene();
// 2. 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
// 3. 设置相机3D空间位置
camera.position.set(0, 0, 10);
scene.add(camera);

// 4. 创建几何体
const geometry = new THREE.BoxGeometry(5, 5, 5);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material); // 将材质和几何体结合
scene.add(cube);

// 5. 生成canvas并上树
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 6. 使用渲染器，通过相机将场景渲染进来
renderer.render(scene, camera);
