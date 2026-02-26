import ProductsSection from './products';

export default function Home() {
    return (
        <div className="flex flex-col">
            <div className="flex h-dvh items-end bg-linear-to-b from-neutral-700 to-neutral-950">
                <div className="container pb-32">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-6xl font-black">
                                CASE <span className="font-mono font-light">1000</span>
                            </h1>
                            <p className="font-mono text-3xl font-thin tracking-tight">
                                Redefine the future
                            </p>
                        </div>
                        <button className="text-primary border-primary hover:border-accent w-fit rounded-full border px-6 py-3 text-sm transition-colors duration-300">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
            <ProductsSection />
        </div>
    );
}
