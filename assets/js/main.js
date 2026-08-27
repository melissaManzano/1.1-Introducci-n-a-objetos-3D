import * as THREE from 'three';

// Crear escena
const scene = new THREE.Scene();

scene.background = new THREE.Color(0x07111f);


// --------------------------------
// CÁMARA
// --------------------------------

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Cámara en una esquina superior
camera.position.set(6, 6, 8);

// Apuntar hacia el centro de la escena
camera.lookAt(0, 0, 0);


// --------------------------------
// RENDERER
// --------------------------------

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.body.appendChild(renderer.domElement);


// ========================================
// PRIMER OBJETO: PRISMA RECTANGULAR
// ========================================

const geometry = new THREE.BoxGeometry(
    3,
    2,
    1.6
);

// Material rosa
const material = new THREE.MeshBasicMaterial({
    color: 0xED9277
});

const cube = new THREE.Mesh(
    geometry,
    material
);

// Posición del primer objeto
cube.position.set(0, 0, 0);

scene.add(cube);


// --------------------------------
// ARISTAS DEL PRIMER OBJETO
// --------------------------------

const edges = new THREE.EdgesGeometry(geometry);

const edgesMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff
});

const edgesLines = new THREE.LineSegments(
    edges,
    edgesMaterial
);

cube.add(edgesLines);


// ========================================
// SEGUNDO OBJETO: ESFERA
// ========================================

const sphereGeometry = new THREE.SphereGeometry(
    1,      // radio
    32,     // segmentos horizontales
    16      // segmentos verticales
);

// Material verde/turquesa
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x7CCFC4
});

// Crear la esfera
const sphere = new THREE.Mesh(
    sphereGeometry,
    sphereMaterial
);

// Cambiar la posición de la esfera
sphere.position.set(-4, 0, 0);

// Agregarla a la escena
scene.add(sphere);


// ========================================
// ANIMACIÓN
// ========================================

function animate(time) {

    // Rotar el primer objeto
    cube.rotation.x = time / 2000;
    cube.rotation.y = time / 1000;

    // Rotar la esfera
    sphere.rotation.y = time / 1000;

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);


// ========================================
// RESPONSIVE
// ========================================

window.addEventListener('resize', () => {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
});