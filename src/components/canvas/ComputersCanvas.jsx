import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function ComputersCanvas() {
  const mountRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return undefined;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;
    let isMobile = window.innerWidth <= 640;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 1000);
    camera.position.set(20, 3, 5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    if ("outputColorSpace" in renderer) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    }

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Lighting matching Huzaif-Ahmed-Portfolio Computers.jsx
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1.15);
    scene.add(hemiLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 2.4);
    spotLight.position.set(-20, 50, 10);
    spotLight.angle = 0.12;
    spotLight.penumbra = 1;
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    scene.add(spotLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.4);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    const accentLight = new THREE.PointLight(0x915eff, 1.8, 30);
    accentLight.position.set(5, 2, 4);
    scene.add(accentLight);

    const warmLight = new THREE.PointLight(0xf97316, 1.4, 30);
    warmLight.position.set(-5, -1, 4);
    scene.add(warmLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 2;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;

    let model = null;
    let disposed = false;

    const loader = new GLTFLoader();
    loader.load(
      "/desktop_pc/scene.gltf",
      (gltf) => {
        if (disposed) return;
        model = gltf.scene;
        const s = isMobile ? 0.52 : 0.75;
        model.scale.set(s, s, s);
        if (isMobile) {
          model.position.set(0, -2.8, -1.8);
        } else {
          model.position.set(0, -3.25, -1.5);
        }
        model.rotation.set(-0.01, -0.2, -0.1);
        scene.add(model);
        setLoaded(true);
      },
      (xhr) => {
        if (xhr.total) {
          setProgress(Math.min(100, Math.round((xhr.loaded / xhr.total) * 100)));
        }
      },
      () => {
        setLoaded(true);
      }
    );

    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (document.hidden) return;
      if (model) {
        // Gentle subtle idle float
        model.rotation.y = -0.2 + Math.sin(Date.now() * 0.0006) * 0.08;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      isMobile = window.innerWidth <= 640;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      if (model) {
        const s = isMobile ? 0.52 : 0.75;
        model.scale.set(s, s, s);
        if (isMobile) {
          model.position.set(0, -2.8, -1.8);
        } else {
          model.position.set(0, -3.25, -1.5);
        }
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <div
        ref={mountRef}
        style={{ width: "100%", height: "100%", cursor: "grab" }}
        aria-label="Interactive 3D developer workstation"
      />
      {!loaded && (
        <div
          style={{
            position: "absolute",
            top: "58%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          <span className="canvas-loader" />
          <p
            style={{
              fontSize: 14,
              color: "#F1F1F1",
              fontWeight: 800,
              marginTop: 40,
            }}
          >
            {progress}%
          </p>
        </div>
      )}
    </div>
  );
}
