'use client';
import { Center, Environment, OrbitControls } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Suspense, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { cn } from '@/utils/cn';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';

const products = [
    {
        name: 'Case',
        code: '1000',
        description: 'The basic PC case with a sleek design.',
        model: '/models/basic_pc_case.glb'
    },
    {
        name: 'Advanced',
        code: '101',
        description: 'The advanced PC case with a sleek design.',
        model: '/models/basic_pc_case.glb'
    }
];

function Model({ url }: { url: string }) {
    const gltf = useLoader(GLTFLoader, url);

    return <primitive object={gltf.scene} />;
}

export default function ProductsSection() {
    const controlsRef = useRef<OrbitControlsImpl>(null);
    const [sliderValue, setSliderValue] = useState(0);
    const [activeProductIndex, setActiveProductIndex] = useState(0);

    const activeProduct = products[activeProductIndex];

    function handleActiveProductIndexChange(index: number) {
        setActiveProductIndex(index);
        setSliderValue(0);
        const controls = controlsRef.current;
        if (!controls) return;
        controls.reset();
    }

    return (
        <section>
            <div className="container min-h-dvh py-10 md:py-44">
                <div className="flex h-full flex-col gap-20 md:flex-row lg:gap-40">
                    <div className="flex aspect-square max-h-152.5 flex-1 flex-col items-center gap-6 overflow-hidden lg:flex-[1.2]">
                        <div className="relative h-full w-full">
                            <motion.div
                                className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-4xl bg-black/50"
                                initial={{ opacity: 1 }}
                                whileInView={{
                                    opacity: [1, 1, 0]
                                }}
                                transition={{
                                    delay: 1,
                                    duration: 1.3,
                                    times: [0, 0.7, 1],
                                    ease: 'easeInOut'
                                }}
                                viewport={{ once: false }}
                            >
                                <div className="absolute -top-1/2 h-full w-[120%] rounded-full border border-dashed border-white/80"></div>
                                <motion.div
                                    whileInView={{
                                        x: [0, -15, 15, -10, 10, 0]
                                    }}
                                    transition={{
                                        delay: 0.3,
                                        duration: 1.2,
                                        ease: 'easeInOut'
                                    }}
                                    viewport={{ once: false }}
                                    className="primary text-primary z-20 flex h-12 w-12 items-center justify-center rounded-full border bg-black/80"
                                >
                                    <ArrowLeftIcon size={20} />
                                    <ArrowRightIcon size={20} />
                                </motion.div>
                            </motion.div>
                            <Canvas
                                className="h-full w-full"
                                camera={{ position: [0, 0, 0.8], fov: 50 }}
                            >
                                <Environment preset="studio" />

                                <Suspense fallback={null}>
                                    <Center>
                                        <Model url={activeProduct.model} />
                                    </Center>
                                </Suspense>

                                <OrbitControls
                                    ref={controlsRef}
                                    enableDamping
                                    enablePan={false}
                                    enableZoom={false}
                                    minPolarAngle={Math.PI / 2}
                                    maxPolarAngle={Math.PI / 2}
                                    minAzimuthAngle={-Math.PI}
                                    maxAzimuthAngle={Math.PI}
                                    onChange={(e) => {
                                        if (!e) return;
                                        setSliderValue(-e.target.getAzimuthalAngle());
                                    }}
                                />
                            </Canvas>
                        </div>
                        <input
                            type="range"
                            min={-Math.PI}
                            max={Math.PI}
                            step={0.01}
                            value={sliderValue}
                            onChange={(e) => {
                                const value = parseFloat(e.target.value);

                                const controls = controlsRef.current;
                                if (!controls) return;

                                controls.setAzimuthalAngle(-value);
                                controls.update();
                            }}
                            className="mx-auto h-fit w-full appearance-none rounded-full bg-gray-100 p-1 outline-none md:w-1/2"
                        />
                    </div>
                    <div className="flex flex-1 flex-col justify-between gap-10 text-black lg:gap-20">
                        <AnimatePresence initial={false}>
                            <motion.div
                                className="flex flex-col gap-6 md:pt-40"
                                key={activeProductIndex}
                                exit={{ opacity: 0, x: -100, position: 'absolute' }}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    transition: { delay: 0.3, duration: 0.4, ease: 'easeOut' }
                                }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                            >
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-1">
                                        <p className="font-mono text-xl font-thin lg:text-3xl">
                                            Our product lineup
                                        </p>
                                        <AnimatePresence mode="wait">
                                            <motion.h1
                                                className="text-5xl font-black uppercase lg:text-7xl"
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                transition={{ duration: 0.6 }}
                                                viewport={{ once: true }}
                                            >
                                                {activeProduct.name}{' '}
                                                <span className="font-mono font-light">
                                                    {activeProduct.code}
                                                </span>
                                            </motion.h1>
                                        </AnimatePresence>
                                    </div>
                                    <p className="max-w-sm font-light text-neutral-500 lg:text-2xl">
                                        {activeProduct.description}
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <Link
                                            href="/product"
                                            className="hover:bg-accent bg-primary w-fit rounded-full px-6 py-3 text-white transition-colors duration-300"
                                        >
                                            Learn More
                                        </Link>
                                        <Link
                                            href="/product"
                                            className="text-primary border-primary hover:border-accent w-fit rounded-full border px-6 py-3 transition-colors duration-300"
                                        >
                                            Configure
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <div className="text-primary flex items-center gap-4">
                            <button
                                onClick={() => {
                                    handleActiveProductIndexChange(
                                        (activeProductIndex - 1 + products.length) % products.length
                                    );
                                }}
                            >
                                <ArrowLeftIcon />
                            </button>
                            {products.map((_, index) => {
                                const isActive = index === activeProductIndex;
                                return (
                                    <button
                                        key={index}
                                        className={cn(
                                            'h-4 w-4 rounded-full border transition-colors',
                                            isActive ? 'border-primary' : 'border-gray-300'
                                        )}
                                        onClick={() => handleActiveProductIndexChange(index)}
                                    />
                                );
                            })}
                            <button
                                onClick={() => {
                                    handleActiveProductIndexChange(
                                        (activeProductIndex + 1) % products.length
                                    );
                                }}
                            >
                                <ArrowRightIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
