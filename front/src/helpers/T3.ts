import * as T3 from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

import { SERVERURL } from "./URL"

export default class T3Helper {
  public scene = new T3.Scene();
  public renderer = new T3.WebGLRenderer({ antialias: false });
  public camera: T3.PerspectiveCamera;
  public controls: OrbitControls;
  public loader = new GLTFLoader();

  constructor (width: number, height: number) {
    this.camera = new T3.PerspectiveCamera(
      40,
      width / height,
      0.1,
      1800
    );

    this.renderer.setSize(
      width, 
      height
    )

    this.renderer.setPixelRatio(window.devicePixelRatio * 1)

    this.scene.background = new T3.Color(0xdddddd);

    this.scene.add(new T3.GridHelper(9, 9));

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.scene.add(new T3.AmbientLight(0xfcfcfc, 1));

    const dlight = new T3.DirectionalLight(0xfff9d8, .3);
    dlight.position.set(0, 1, 0);
    dlight.castShadow = true;
    this.scene.add(dlight);
  }

  degToRad (deg: number) {
    return (deg * Math.PI) / 180
  }

  arrayNotEmpty (arr: Array<any>) {
    return arr && Array.isArray(arr) && arr.length > 0
  }

  render () {        
    this.renderer.render(this.scene, this.camera);
  }

  animate () {
    requestAnimationFrame(this.animate.bind(this))

    this.render()
  }

  setCameraPosition () {
    this.camera.position.set(0.2, 1.4, 0);
    this.camera.rotation.x = 30;
    // this.camera.lookAt(new T3.Vector3(-5, 0, 0))
    this.controls.update()
  }

  loadImage (image: string) {
    let loader = new T3.TextureLoader()

    var material = new T3.MeshLambertMaterial({
      map: loader.load(`${SERVERURL}/assets/uploads/artwork/paintings/${image}`)
    });

    // create a plane geometry for the image with a width of 10
    // and a height that preserves the image's aspect ratio
    var geometry = new T3.PlaneGeometry(1.1, 1.4 * .75);

    // combine our image geometry and material into a mesh
    var mesh = new T3.Mesh(geometry, material);

    // set the position of the image mesh in the x,y,z dimensions
    mesh.position.set(...[-3, 3, 0.2])

    let rotation = [0, this.degToRad(90), 0];

    if (rotation && this.arrayNotEmpty(rotation)) {
      rotation = rotation || [0, 0, 0];

      mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
    }

    // add the image to the scene
    this.scene.add(mesh);
  }

  loadModel (folder: string, fileName: string, scale = .08) {
    this.loader.load(`${SERVERURL}/assets/uploads/artwork/models/${folder}/${fileName}`, (gltf) => {
      gltf.scene.children[0].scale.set(.01, .01, .01)
      gltf.scene.children[0].position.set(-0.07, .9, -0.01)

      this.scene.add(gltf.scene)
    })
  }
}

