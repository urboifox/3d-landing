'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Environment } from '@react-three/drei';
import { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { motion, useScroll, useTransform } from 'motion/react';
import * as THREE from 'three';

function Model({ scrollProgress }: { scrollProgress: any }) {
    const gltf = useLoader(GLTFLoader, '/models/basic_pc_case.glb');
    const modelRef = useRef<THREE.Group>(null);

    const rotationY = useTransform(scrollProgress, [0, 1], [0, Math.PI * 2]);
    const positionY = useTransform(scrollProgress, [0, 1], [0, -0.5]);
    const scale = useTransform(scrollProgress, [0, 0.25, 0.5, 1], [1, 3.2, 3.2, 2]);
    const positionX = useTransform(
        scrollProgress,
        [0, 0.15, 0.25, 0.35, 0.4, 0.6, 1],
        [0, 0.2, 1, 0.8, 0.8, -1, 0.6]
    );

    useFrame(() => {
        if (!modelRef.current) return;

        modelRef.current.rotation.y = rotationY.get();
        modelRef.current.position.y = positionY.get();
        modelRef.current.position.x = positionX.get();
        modelRef.current.scale.setScalar(scale.get());
    });

    return (
        <group ref={modelRef}>
            <primitive object={gltf.scene} />
        </group>
    );
}

export default function ProductStoryPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    return (
        <section ref={containerRef} className="relative h-[400vh]">
            {/* Sticky Canvas */}
            <div className="sticky top-0 h-screen w-full">
                <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
                    <Environment preset="studio" />
                    <Center>
                        <Model scrollProgress={scrollYProgress} />
                    </Center>
                </Canvas>
            </div>

            {/* Scroll Sections */}
            <div className="absolute top-0 w-full">
                <Section align="right">
                    <h1 className="text-6xl font-black">Design</h1>
                    <p className="mt-6 max-w-md text-lg text-neutral-500">
                        Crafted with precision and minimal aesthetics.
                    </p>
                </Section>

                <Section align="left">
                    <h1 className="text-6xl font-black">Cooling</h1>
                    <p className="mt-6 max-w-md text-lg text-neutral-500">
                        Optimized airflow system for peak performance.
                    </p>
                </Section>

                <Section align="right">
                    <h1 className="text-6xl font-black">Performance</h1>
                    <p className="mt-6 max-w-md text-lg text-neutral-500">
                        Built to handle next-generation hardware.
                    </p>
                </Section>

                <Section align="left">
                    <h1 className="text-6xl font-black">Details</h1>
                    <p className="mt-6 max-w-md text-lg text-neutral-500">
                        Premium materials. Engineered durability.
                    </p>
                </Section>
            </div>
        </section>
    );
}

function Section({ children, align }: { children: React.ReactNode; align: 'left' | 'right' }) {
    return (
        <div className="flex h-screen items-center">
            <div className={`container flex ${align === 'left' ? 'justify-start' : 'justify-end'}`}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-lg"
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
}
