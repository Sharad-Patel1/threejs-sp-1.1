import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/textures/NormalMap.png')

// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)

// Materials
const material = new THREE.MeshStandardMaterial()

// Options for material
material.metalness = 0.7
material.roughness = 0.2

// NormalMap
material.normalMap = normalTexture; 

material.color = new THREE.Color(0x292929)


// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// Red Light
const redLight = new THREE.PointLight(0xff0000, 0.2)
redLight.position.set(-4.7,2.36,1)
redLight.intensity = 5
scene.add(redLight)

// const rLight = gui.addFolder("Red Light")
// rLight.add(redLight.position, 'y').min(-3).max(3).step(0.01)
// rLight.add(redLight.position, 'x').min(-6).max(6).step(0.01)
// rLight.add(redLight.position, 'z').min(-3).max(3).step(0.01)
// rLight.add(redLight, 'intensity').min(0).max(10).step(0.01)

// Blue Light
const blueLight = new THREE.PointLight(0x0000ff, 0.2)
blueLight.position.set(1.86,-1,1)
blueLight.intensity = 5
scene.add(blueLight)

// const bLight = gui.addFolder("Blue Light")
// bLight.add(redLight.position, 'y').min(-3).max(3).step(0.01)
// bLight.add(redLight.position, 'x').min(-6).max(6).step(0.01)
// bLight.add(redLight.position, 'z').min(-3).max(3).step(0.01)
// bLight.add(redLight, 'intensity').min(0).max(10).step(0.01)

// const bLightColor = {
//     color: 0x0000ff
// }

// bLight.addColor(bLightColor, 'color')
//     .onChange(() => {
//         blueLight.color.set(bLightColor.color)
//     })

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0 

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2; 

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}

const updateSphere = (event) => {
    sphere.position.y = window.scrollY * 0.001
}

window.addEventListener('scroll', updateSphere)


const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX * 0.001
    targetY = mouseY * 0.001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()