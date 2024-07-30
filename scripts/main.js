import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 500)
camera.position.z = 3

const renderer = new THREE.WebGLRenderer()
renderer.setClearColor(0xffffff)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.append(renderer.domElement)

const light = new THREE.DirectionalLight(0xffffff, 10)
light.position.set(0,100,100)
scene.add(light)

let donut = null
// Loading the material first
const materialLoader = new MTLLoader()
materialLoader.load("assets/donut.mtl", (mat => {
    const objLoader = new OBJLoader()
    objLoader.setMaterials(mat)
    objLoader.load("assets/donut.obj", (obj => {
        donut = obj
        scene.add(obj)
    }))
}), (xhr => {
    console.log(xhr)
}))



function animate() {
    requestAnimationFrame(animate)
    if (donut) {
        donut.rotation.y += 0.01
    }
    renderer.render(scene, camera)
}

animate()
