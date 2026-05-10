"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function BuildingScene() {
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
    camera.position.set(6, 4, 8);
    camera.lookAt(0, 1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    scene.add(new THREE.AmbientLight(0xfff5e6, 0.4));
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(5, 8, 5);
    scene.add(dir);
    const fillLight = new THREE.DirectionalLight(0x88aacc, 0.2);
    fillLight.position.set(-5, 3, -3);
    scene.add(fillLight);

    const building = new THREE.Group();

    // Building exterior — blue-tinted glass
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x6a8fb5,
      metalness: 0.4,
      roughness: 0.1,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const exterior = new THREE.Mesh(
      new THREE.BoxGeometry(3, 6, 2.5),
      glassMat
    );
    exterior.position.y = 3;
    building.add(exterior);

    // Floor plates — warm concrete
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xc8bfb5,
      metalness: 0.15,
      roughness: 0.7,
      transparent: true,
      opacity: 0.5,
    });
    for (let i = 0; i < 8; i++) {
      const floor = new THREE.Mesh(
        new THREE.BoxGeometry(2.9, 0.06, 2.4),
        floorMat
      );
      floor.position.y = 0.5 + i * 0.75;
      building.add(floor);
    }

    // Rooftop equipment — metallic
    const rtuMat = new THREE.MeshStandardMaterial({
      color: 0x7a8a9a,
      metalness: 0.7,
      roughness: 0.35,
    });
    const rtuPositions = [
      [-0.7, 6.25, -0.5],
      [0.5, 6.2, 0.6],
      [-0.3, 6.3, 0.4],
    ];
    rtuPositions.forEach(([x, y, z]) => {
      const rtu = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.3, 0.5),
        rtuMat
      );
      rtu.position.set(x, y, z);
      building.add(rtu);
    });

    // Sensor dots
    interface SensorDot {
      mesh: THREE.Mesh;
      pulseSpeed: number;
      pulseOffset: number;
      isFault: boolean;
    }

    const sensors: SensorDot[] = [];
    const greenEmissive = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      emissive: 0x34d399,
      emissiveIntensity: 0.8,
    });
    const redEmissive = new THREE.MeshStandardMaterial({
      color: 0xf87171,
      emissive: 0xf87171,
      emissiveIntensity: 0.8,
    });

    const sensorPositions = [
      [1.51, 1.5, 0.5], [1.51, 2.5, -0.3], [1.51, 3.5, 0.7],
      [1.51, 4.5, -0.5], [1.51, 5.0, 0.2],
      [-1.51, 1.8, 0.3], [-1.51, 3.0, -0.4], [-1.51, 4.2, 0.6],
      [-1.51, 5.2, -0.2],
      [0.5, 1.5, 1.26], [-0.3, 2.8, 1.26], [0.7, 4.0, 1.26],
      [-0.5, 5.0, 1.26],
      [0.3, 2.0, -1.26], [-0.4, 3.5, -1.26], [0.6, 4.8, -1.26],
      [1.51, 2.0, -0.8], [-1.51, 4.8, 0.0],
      [0.0, 1.2, 1.26], [0.2, 3.8, -1.26],
    ];

    const faultIndices = [3, 11, 17];

    sensorPositions.forEach(([x, y, z], i) => {
      const isFault = faultIndices.includes(i);
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 12, 12),
        isFault ? redEmissive.clone() : greenEmissive.clone()
      );
      mesh.position.set(x, y, z);
      building.add(mesh);
      sensors.push({
        mesh,
        pulseSpeed: 1.5 + Math.random() * 1.0,
        pulseOffset: Math.random() * Math.PI * 2,
        isFault,
      });
    });

    scene.add(building);

    // Mouse drag interaction
    let isDragging = false;
    let previousX = 0;
    let targetAngle = 0;
    let autoRotate = true;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      autoRotate = false;
      previousX = e.clientX;
      container.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousX;
      targetAngle += deltaX * 0.008;
      previousX = e.clientX;
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
    let cameraAngle = 0;

    const animate = () => {
      if (!running) return;
      frameRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (autoRotate) {
        targetAngle += 0.003;
      }

      cameraAngle += (targetAngle - cameraAngle) * 0.06;
      camera.position.x = Math.sin(cameraAngle) * 9;
      camera.position.z = Math.cos(cameraAngle) * 9;
      camera.lookAt(0, 2.5, 0);

      sensors.forEach((s) => {
        const pulse =
          1.0 + 0.3 * Math.sin(t * s.pulseSpeed + s.pulseOffset);
        s.mesh.scale.setScalar(pulse);

        if (s.isFault) {
          const mat = s.mesh.material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = 0.5 + 0.5 * Math.sin(t * 3 + s.pulseOffset);
        }
      });

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
