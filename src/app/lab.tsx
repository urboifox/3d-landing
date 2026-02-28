'use client';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export default function LabSection() {
    const ref = useRef<HTMLImageElement>(null);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();

            if (rect.bottom <= window.innerHeight) {
                setExpanded(true);
            } else {
                setExpanded(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="flex min-h-dvh w-full flex-col gap-10 pb-40">
            <motion.img
                ref={ref}
                src="/images/lab.png"
                alt="Lab"
                className="w-full object-cover"
                initial={{ clipPath: 'inset(10% 10% round 2rem)' }}
                animate={
                    expanded
                        ? { clipPath: 'inset(0% 0% round 0rem)' }
                        : { clipPath: 'inset(10% 10% round 2rem)' }
                }
                transition={{
                    duration: 0.4,
                    ease: 'easeInOut'
                }}
            />

            <div className="flex flex-col items-center gap-8 text-center">
                <div className="flex flex-col">
                    <p className="text-primary text-2xl font-medium tracking-wider">Testing</p>
                    <h2 className="font-mono text-5xl font-thin tracking-tighter lg:text-8xl">
                        Power Cycling
                    </h2>
                </div>
                <p className="max-w-4xl text-xl font-light text-neutral-500">
                    Our advanced power cycling laboratory assesses the endurance of power
                    semiconductor modules crucial for energy conversion, determining their longevity
                    and offering accurate evaluations for diverse applications. Since 2010, we've
                    been designing power cycling test benches, with our testing protocols
                    consistently following ECPE Guideline AQG 324, recognized as the gold standard
                    by power electronics manufacturers worldwide.
                </p>
            </div>
        </section>
    );
}
