'use client';
import { cn } from '@/utils/cn';
import { GlobeIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
    const [headerVisible, setHeaderVisible] = useState(true);

    useEffect(() => {
        let lastScroll = 0;
        const controller = new AbortController();

        window.addEventListener(
            'scroll',
            () => {
                const currentScroll = window.scrollY;

                if (currentScroll > lastScroll && currentScroll > 500) {
                    setHeaderVisible(false);
                } else {
                    setHeaderVisible(true);
                }

                lastScroll = currentScroll;
            },
            { signal: controller.signal }
        );

        return () => controller.abort();
    }, []);

    return (
        <header
            className={cn(
                'fixed top-0 w-full py-6 backdrop-blur-sm transition-discrete duration-400 ease-out',
                headerVisible ? '' : '-translate-y-full'
            )}
        >
            <div className="container flex items-center justify-between gap-4">
                <h1 className="font-mono text-2xl font-semibold">Three.js</h1>
                <nav className="flex items-center gap-4 text-sm">
                    <Link href="/" className="hover:underline">
                        Products
                    </Link>
                    <Link href="/" className="hover:underline">
                        About
                    </Link>
                </nav>
                <button className="flex items-center gap-2">
                    Language
                    <GlobeIcon />
                </button>
            </div>
        </header>
    );
}
