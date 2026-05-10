"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function AHUScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(5, 3, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    scene.add(new THREE.AmbientLight(0xfff5e6, 0.5));
    const dir = new THREE.DirectionalLight(0xffffff, 1.0);
    dir.position.set(5, 5, 5);
    scene.add(dir);
    const fillLight = new THREE.DirectionalLight(0x88aacc, 0.3);
    fillLight.position.set(-3, 2, -3);
    scene.add(fillLight);

    const group = new THREE.Group();

    // Main housing — semi-transparent with slight blue tint
    const housingMat = new THREE.MeshStandardMaterial({
      color: 0x8a9bae,
      metalness: 0.5,
      roughness: 0.3,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
    });
    const housing = new THREE.Mesh(
      new THREE.BoxGeometry(4.0, 1.8, 2.0),
      housingMat
    );
    group.add(housing);

    // Filter bank (left side) — off-white
    const filterMat = new THREE.MeshStandardMaterial({
      color: 0xe8e0d8,
      roughness: 0.9,
    });
    const filter = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 1.4, 1.6),
      filterMat
    );
    filter.position.set(-1.5, 0, 0);
    group.add(filter);

    // Cooling coil — vibrant blue
    const coolMat = new THREE.MeshStandardMaterial({
      color: 0x4488cc,
      metalness: 0.6,
      roughness: 0.3,
    });
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 4; col++) {
        const tube = new THREE.Mesh(
          new THREE.CylinderGeometry(0.03, 0.03, 1.6, 8),
          coolMat
        );
        tube.rotation.x = Math.PI / 2;
        tube.position.set(-0.7 + col * 0.12, -0.5 + row * 0.28, 0);
        group.add(tube);
      }
    }

    // Heating coil — warm copper/orange
    const heatMat = new THREE.MeshStandardMaterial({
      color: 0xd4845a,
      metalness: 0.6,
      roughness: 0.3,
    });
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 3; col++) {
        const tube = new THREE.Mesh(
          new THREE.CylinderGeometry(0.03, 0.03, 1.6, 8),
          heatMat
        );
        tube.rotation.x = Math.PI / 2;
        tube.position.set(0.2 + col * 0.12, -0.5 + row * 0.28, 0);
        group.add(tube);
      }
    }

    // Fan hub — dark metallic
    const fanHub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.15, 0.2, 16),
      new THREE.MeshStandardMaterial({
        color: 0x4a5568,
        metalness: 0.8,
        roughness: 0.25,
      })
    );
    fanHub.rotation.x = Math.PI / 2;
    fanHub.position.set(1.2, 0, 0);
    group.add(fanHub);

    // Fan blades — bright metallic
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0x8a9bae,
      metalness: 0.7,
      roughness: 0.25,
    });
    const blades = new THREE.Group();
    for (let i = 0; i < 6; i++) {
      const blade = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.55, 0.02),
        bladeMat
      );
      blade.position.y = 0.3;
      const pivot = new THREE.Group();
      pivot.add(blade);
      pivot.rotation.z = (i * Math.PI * 2) / 6;
      blades.add(pivot);
    }
    blades.position.set(1.2, 0, 0.12);
    group.add(blades);

    // Damper blades at intake
    const damperMat = new THREE.MeshStandardMaterial({
      color: 0x6a7a8a,
      metalness: 0.6,
      roughness: 0.35,
    });
    for (let i = 0; i < 3; i++) {
      const blade = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 0.35, 1.4),
        damperMat
      );
      blade.position.set(-1.85, -0.4 + i * 0.4, 0);
      group.add(blade);
    }

    scene.add(group);

    // Mouse drag interaction
    let isDragging = false;
    let previousX = 0;
    let previousY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;
    let autoRotate = true;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      autoRotate = false;
      previousX = e.clientX;
      previousY = e.clientY;
      container.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousX;
      const deltaY = e.clientY - previousY;
      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.005;
      targetRotationX = Math.max(-0.5, Math.min(0.5, targetRotationX));
      previousX = e.clientX;
      previousY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
      container.style.cursor = "grab";
      setTimeout(() => {
        if (!isDragging) autoRotate = true;
      }, 3000);
    };

    container.style.cursor = "grab";
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointerleave", onPointerUp);

    let running = true;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!running) return;
      frameRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (autoRotate) {
        targetRotationY += 0.004;
      }

      group.rotation.y += (targetRotationY - group.rotation.y) * 0.08;
      group.rotation.x += (targetRotationX - group.rotation.x) * 0.08;
      blades.rotation.z += 0.04;
      group.position.y = Math.sin(t * 0.5) * 0.02;

      renderer.render(scene, camera);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          running = true;
          animate();
        } else {
          running = false;
          cancelAnimationFrame(frameRef.current);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(frameRef.current);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointerleave", onPointerUp);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[500px] h-[350px] md:h-[400px] mx-auto touch-none"
    />
  );
}
