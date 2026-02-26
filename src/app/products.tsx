'use client';
import { Center, Environment, OrbitControls } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Suspense } from 'react';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

function Model() {
    const gltf = useLoader(GLTFLoader, '/models/basic_pc_case.glb');

    return (
        <group>
            <primitive object={gltf.scene} />;
        </group>
    );
}

export default function ProductsSection() {
    return (
        <div className="bg-white">
            <div className="container h-dvh py-44">
                <div className="flex h-full gap-40">
                    <div className="h-152.5 flex-[1.2] rounded-2xl">
                        <Canvas camera={{ position: [0, 0, 0.8], fov: 50 }}>
                            <Environment preset="studio" />
                            <Suspense fallback={null}>
                                <Center>
                                    <Model />
                                </Center>
                            </Suspense>
                            <OrbitControls
                                enablePan={false}
                                enableZoom={false}
                                minPolarAngle={Math.PI / 2}
                                maxPolarAngle={Math.PI / 2}
                                minAzimuthAngle={-Math.PI}
                                maxAzimuthAngle={Math.PI}
                            />
                        </Canvas>
                    </div>
                    <div className="flex flex-1 flex-col justify-between gap-20 text-black">
                        <div className="flex flex-col gap-6 pt-40">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-1">
                                    <p className="font-mono text-3xl font-thin">
                                        Our product lineup
                                    </p>
                                    <h1 className="text-6xl font-black">
                                        CASE <span className="font-mono font-light">1000</span>
                                    </h1>
                                </div>
                                <p className="max-w-sm text-2xl font-light text-neutral-500">
                                    Powerful and flexible case with a sleek design.
                                </p>
                                <div className="flex items-center gap-3">
                                    <button className="hover:bg-accent bg-primary w-fit rounded-full px-6 py-3 text-white transition-colors duration-300">
                                        Learn More
                                    </button>
                                    <button className="text-primary border-primary hover:border-accent w-fit rounded-full border px-6 py-3 transition-colors duration-300">
                                        Configure
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="text-primary flex items-center gap-4">
                            <ArrowLeftIcon />
                            ...
                            <ArrowRightIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
