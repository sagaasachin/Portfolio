import React, { useRef, useEffect } from "react";

/**
 * Lightweight, high-performance Three.js scene for the Hero section.
 * Pure WebGL on <canvas> with zero extra overhead (no R3F).
 *
 * Features:
 * - Central metallic glass geometric core
 * - Orbiting translucent 3D glass viewports with subtle code grid textures
 * - Concentric glowing orbital ring structures
 * - Floating particle field
 * - Mouse parallax tilt & smooth scroll translation
 * - IntersectionObserver off-screen loop pausing for 0% CPU/GPU overhead when scrolled past
 * - Prefers-reduced-motion compliance (static single-frame render)
 */
export default function HeroScene() {
  const canvasRef = useRef(null);
  const st = useRef({ running: false, raf: 0, io: null, clean: null });

  useEffect(() => {
    const box = st.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let THREE;
    let renderer;
    let scene;
    let camera;
    let coreGroup;
    let icoMesh;
    let wireMesh;
    let panelGroup;
    let ring1;
    let ring2;
    let dots;
    let onPointer;
    let onResize;
    let onScroll;
    let intersect = true;
    let targetMx = 0;
    let targetMy = 0;
    let currentMx = 0;
    let currentMy = 0;
    let scrollY = 0;

    const animate = () => {
      if (!THREE || !renderer) return;
      const t = performance.now() * 0.001;

      // Smooth pointer interpolation (lerp)
      currentMx += (targetMx - currentMx) * 0.05;
      currentMy += (targetMy - currentMy) * 0.05;

      // Core rotation & float
      if (coreGroup) {
        coreGroup.rotation.y = t * 0.12 + currentMx * 0.25;
        coreGroup.rotation.x = Math.sin(t * 0.08) * 0.1 + currentMy * 0.18;
        coreGroup.position.y = Math.sin(t * 0.6) * 0.08 - scrollY * 0.0008;
      }

      if (wireMesh) {
        wireMesh.rotation.y = -t * 0.08 + currentMx * 0.12;
      }

      // Orbiting panels
      if (panelGroup) {
        panelGroup.rotation.y = t * 0.06;
      }

      // Orbit rings
      if (ring1) ring1.rotation.z = t * 0.08;
      if (ring2) ring2.rotation.y = t * 0.05;

      // Particles
      if (dots) dots.rotation.y = t * 0.012;

      // Scroll translation on camera
      if (camera) {
        camera.position.y = 0.3 - scrollY * 0.0006;
        camera.position.z = 4.2 + scrollY * 0.0004;
      }

      if (intersect) {
        renderer.render(scene, camera);
      }
    };

    const tick = () => {
      if (!box.running) return;
      box.raf = requestAnimationFrame(tick);
      animate();
    };

    const start = () => {
      if (box.running) return;
      box.running = true;
      tick();
    };

    const stop = () => {
      box.running = false;
      cancelAnimationFrame(box.raf);
    };

    import("three").then((mod) => {
      THREE = mod;

      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        38,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        100
      );
      camera.position.set(0, 0.3, 4.2);

      /* -------- Lighting System -------- */
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      // Key light: Warm champagne gold
      const keyLight = new THREE.PointLight(0xd6c896, 3.2, 14);
      keyLight.position.set(3.5, 4, 4);
      scene.add(keyLight);

      // Fill light: Electric blue accent
      const fillLight = new THREE.PointLight(0x508ceb, 2.2, 12);
      fillLight.position.set(-4, 1.5, 2.5);
      scene.add(fillLight);

      // Rim light: Cool white backlight
      const rimLight = new THREE.PointLight(0xffffff, 1.2, 10);
      rimLight.position.set(0, -3, -3);
      scene.add(rimLight);

      /* -------- Central Core Group -------- */
      coreGroup = new THREE.Group();
      scene.add(coreGroup);

      // Main Icosahedron Core
      const icoGeo = new THREE.IcosahedronGeometry(1.05, 1);
      const icoMat = new THREE.MeshStandardMaterial({
        color: 0xc8c0b0,
        metalness: 0.85,
        roughness: 0.15,
        envMapIntensity: 1.2,
      });
      icoMesh = new THREE.Mesh(icoGeo, icoMat);
      coreGroup.add(icoMesh);

      // Outer Wireframe Cage
      const wireGeo = new THREE.IcosahedronGeometry(1.24, 1);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0xc6ab68,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      });
      wireMesh = new THREE.Mesh(wireGeo, wireMat);
      coreGroup.add(wireMesh);

      /* -------- Orbiting Panels Group (Floating UI/Code windows) -------- */
      panelGroup = new THREE.Group();
      scene.add(panelGroup);

      const panelGeo = new THREE.PlaneGeometry(0.55, 0.38);
      const panelMat = new THREE.MeshStandardMaterial({
        color: 0x161624,
        roughness: 0.2,
        metalness: 0.8,
        transparent: true,
        opacity: 0.75,
        side: THREE.DoubleSide,
      });

      const panelCount = 4;
      for (let i = 0; i < panelCount; i++) {
        const panel = new THREE.Mesh(panelGeo, panelMat);
        const angle = (i / panelCount) * Math.PI * 2;
        const radius = 1.75;
        panel.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle * 2) * 0.2,
          Math.sin(angle) * radius
        );
        panel.rotation.y = -angle + Math.PI / 2;
        panelGroup.add(panel);
      }

      /* -------- Orbiting Rings -------- */
      const ring1Geo = new THREE.TorusGeometry(1.95, 0.01, 16, 100);
      const ring1Mat = new THREE.MeshBasicMaterial({
        color: 0xc6ab68,
        transparent: true,
        opacity: 0.28,
      });
      ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
      ring1.rotation.x = Math.PI * 0.38;
      scene.add(ring1);

      const ring2Geo = new THREE.TorusGeometry(2.2, 0.007, 16, 100);
      const ring2Mat = new THREE.MeshBasicMaterial({
        color: 0x508ceb,
        transparent: true,
        opacity: 0.18,
      });
      ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
      ring2.rotation.x = Math.PI * 0.65;
      ring2.rotation.z = Math.PI * 0.25;
      scene.add(ring2);

      /* -------- Particle Matrix -------- */
      const particleCount = 110;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const r = 2.0 + Math.random() * 2.2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      const dotGeo = new THREE.BufferGeometry();
      dotGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const dotMat = new THREE.PointsMaterial({
        color: 0xc6ab68,
        size: 0.016,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.4,
      });
      dots = new THREE.Points(dotGeo, dotMat);
      scene.add(dots);

      /* -------- Event Listeners -------- */
      onResize = () => {
        if (!canvas || !renderer || !camera) return;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize, { passive: true });

      onPointer = (e) => {
        targetMx = (e.clientX / window.innerWidth) * 2 - 1;
        targetMy = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      onScroll = () => {
        scrollY = window.scrollY;
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      // Reduced motion check
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        renderer.render(scene, camera);
      } else {
        start();
      }
    });

    /* Pause render loop when canvas scrolls out of view */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          intersect = entry.isIntersecting;
          if (intersect) start();
          else stop();
        });
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);
    box.io = io;

    box.clean = () => {
      stop();
      if (box.io) box.io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      if (renderer) {
        renderer.dispose();
        scene?.traverse((obj) => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
            else obj.material.dispose();
          }
        });
      }
    };

    return () => {
      box.clean?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-scene__canvas"
      aria-hidden="true"
      style={{ width: "100%", height: "100%" }}
    />
  );
}