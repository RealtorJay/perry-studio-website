"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function VAVBox() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(4, 3, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting — warmer and more dynamic
    const ambient = new THREE.AmbientLight(0xfff5e6, 0.5);
    scene.add(ambient);
    const directional = new THREE.DirectionalLight(0xffffff, 1.0);
    directional.position.set(5, 5, 5);
    scene.add(directional);
    const fillLight = new THREE.DirectionalLight(0x88aacc, 0.3);
    fillLight.position.set(-3, 2, -3);
    scene.add(fillLight);

    const group = new THREE.Group();

    // Main housing — galvanized steel look
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x8a9bae,
      metalness: 0.85,
      roughness: 0.25,
    });
    const housing = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 1.2, 1.6),
      metalMat
    );
    group.add(housing);

    // Inlet duct — slightly darker
    const ductMat = new THREE.MeshStandardMaterial({
      color: 0x7a8a9a,
      metalness: 0.75,
      roughness: 0.3,
    });
    const inlet = new THREE.Mesh(
      new THREE.CylinderGeometry(0.45, 0.45, 1.0, 24),
      ductMat
    );
    inlet.rotation.z = Math.PI / 2;
    inlet.position.set(-1.7, 0, 0);
    group.add(inlet);

    // Damper blade
    const damperMat = new THREE.MeshStandardMaterial({
      color: 0x6a7a8a,
      metalness: 0.65,
      roughness: 0.35,
    });
    const damper = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.7, 1.0),
      damperMat
    );
    damper.position.set(-1.1, 0, 0);
    group.add(damper);

    // Actuator box — dark charcoal with slight blue tint
    const actuatorMat = new THREE.MeshStandardMaterial({
      color: 0x3a4a5a,
      metalness: 0.7,
      roughness: 0.4,
    });
    const actuator = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.35, 0.4),
      actuatorMat
    );
    actuator.position.set(-0.5, 0.78, 0);
    group.add(actuator);

    // Actuator arm
    const arm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.5, 8),
      actuatorMat
    );
    arm.position.set(-0.5, 0.55, 0);
    group.add(arm);

    // Reheat coil tubes — warm copper
    const coilMat = new THREE.MeshStandardMaterial({
      color: 0xd4845a,
      metalness: 0.7,
      roughness: 0.3,
    });
    for (let i = 0; i < 6; i++) {
      const tube = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 1.4, 8),
        coilMat
      );
      tube.position.set(0.4, -0.35 + i * 0.14, 0);
      tube.rotation.x = Math.PI / 2;
      group.add(tube);
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
      // Resume auto-rotate after 3 seconds
      setTimeout(() => {
        if (!isDragging) autoRotate = true;
      }, 3000);
    };

    container.style.cursor = "grab";
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointerleave", onPointerUp);

    // Animation
    let running = true;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!running) return;
      frameRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (autoRotate) {
        targetRotationY += 0.004;
      }

      // Smooth interpolation
      group.rotation.y += (targetRotationY - group.rotation.y) * 0.08;
      group.rotation.x += (targetRotationX - group.rotation.x) * 0.08;
      damper.rotation.z = Math.sin(t * 0.8) * 0.6;

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
      className="w-full max-w-[600px] h-[400px] md:h-[500px] mx-auto touch-none"
    />
  );
}
