import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
export default class Experience {
  constructor() {
    this.sizes = {
      width: window.innerWidth,
      heigth: window.innerHeight,
    };
    this.canvas = document.querySelector('.webgl');
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
    window.addEventListener('resize', this.resize.bind(this));

    this.createCamera();
    this.createObjects();
    this.createRenderer();
    this.animate();
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.heigth
    );
    this.scene.add(this.camera);
    this.camera.position.x = -20;
    this.camera.position.y = -1;
    this.camera.position.z = -30;

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
  }

  createRenderer() {
    this.renderer = new THREE.WebGL1Renderer({
      canvas: this.canvas,
    });
    this.renderer.setSize(this.sizes.width, this.sizes.heigth);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.render(this.scene, this.camera);
  }

  createObjects() {
    //
    const cube = new THREE.BoxGeometry(10, 10, 10);
    const materialcube = new THREE.MeshMatcapMaterial({
      color: '#ff0000',
    });
    this.cube = new THREE.Mesh(cube, materialcube);

    //
    const sphere = new THREE.SphereGeometry(15, 64, 64);
    const materialSphere = new THREE.MeshMatcapMaterial({
      color: '#ff00ff',
    });
    this.sphere = new THREE.Mesh(sphere, materialSphere);
    this.sphere.position.x = 40;
    this.sphere.position.y = 0;
    this.sphere.position.z = 10;

    //
    const torus = new THREE.TorusKnotGeometry(10, 3, 48, 32);
    const materialTorus = new THREE.MeshBasicMaterial({
      color: '#adfc92',
      wireframe: true,
    });
    this.torus = new THREE.Mesh(torus, materialTorus);
    this.torus.position.x = -40;
    this.torus.position.y = 20;
    this.torus.position.z = 0;

    //
    const cone = new THREE.ConeGeometry(5, 20, 32);
    const materialcone = new THREE.MeshBasicMaterial({
      color: '#00f1bd',
      wireframe: true,
    });
    this.cone = new THREE.Mesh(cone, materialcone);

    //
    const cylindre = new THREE.CylinderGeometry(5, 5, 20, 32);
    const materialcylindre = new THREE.MeshBasicMaterial({
      color: '#de3d3d',
    });
    this.cylindre = new THREE.Mesh(cylindre, materialcylindre);
    this.cylindre.position.x = -40;
    this.cylindre.position.y = -40;
    this.cylindre.position.y = 10;

    // ajoute objects
    this.scene.add(this.cone, this.cylindre);
  }

  animate() {
    const elapsedTime = this.clock.getElapsedTime();
    this.torus.rotation.x = elapsedTime * 0.1;
    this.torus.rotation.z = elapsedTime * 0.25;

    this.controls.update();

    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.sizes.width = window.innerWidth;
    this.sizes.heigth = window.innerHeight;

    this.camera.aspect = this.sizes.width / this.sizes.heigth;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.sizes.width, this.sizes.heigth);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.render(this.scene, this.camera);
  }
}
