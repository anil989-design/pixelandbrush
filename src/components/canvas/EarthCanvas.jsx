import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function EarthCanvas() {
  const mountRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return undefined;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 200);
    camera.position.set(-4, 3, 6);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    if ("outputColorSpace" in renderer) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    }

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.6);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.2;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 2;

    let disposed = false;
    const loader = new GLTFLoader();
    loader.load(
      "/planet/scene.gltf",
      (gltf) => {
        if (disposed) return;
        const earth = gltf.scene;
        earth.scale.set(2.5, 2.5, 2.5);
        earth.position.set(0, 0, 0);
        scene.add(earth);
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
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 500;
      height = container.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
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
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 350 }}>
      <div
        ref={mountRef}
        style={{ width: "100%", height: "100%", minHeight: 350, cursor: "grab" }}
        aria-label="Interactive 3D rotating Earth"
      />
      {!loaded && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          <span className="canvas-loader" />
          <p style={{ fontSize: 14, color: "#F1F1F1", fontWeight: 800, marginTop: 40 }}>
            {progress}%
          </p>
        </div>
      )}
    </div>
  );
}
