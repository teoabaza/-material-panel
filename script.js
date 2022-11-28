
let scene, camera, renderer, plane, fov, aspect;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2a2a2a);
    
    if(window.innerWidth>window.innerHeight){
        aspect = window.innerWidth / window.innerHeight;
        fov = 75;}
    else {
        aspect = window.innerWidth / window.innerHeight;
        fov = 98;
    }
    camera = new THREE.PerspectiveCamera( fov, aspect, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls(camera, renderer.domElement)

    const geometry = new THREE.BoxGeometry(6, 5, 0.08 );

    const texture = new THREE.TextureLoader().load('./textures/hardwood2_diffuse.jpg');
    const material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide} );
    //material.metalness = 1;
    material.roughness = 0.1;

    const plane = new THREE.Mesh( geometry, material );
    scene.add(plane)

    // How far you can orbit vertically, upper and lower limits.
    // Range is 0 to Math.PI radians.
    controls.minPolarAngle = 0.5; // radians
    controls.maxPolarAngle = 2.5; // radians

    // How far you can orbit horizontally, upper and lower limits.
    // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
    controls.minAzimuthAngle = -1.2; // radians
    controls.maxAzimuthAngle = 1.2; // radians

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    camera.position.z = 5;
}

function animate() {
    requestAnimationFrame( animate );
    controls.update(); // required if controls.enableDamping = true

    renderer.render( scene, camera );
}

function onWindowResize() {

    if(window.innerWidth>window.innerHeight){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.fov = 75;}
    else {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.fov = 98;
    }

    //camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setPixelRatio(window.devicePixelRatio);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();
