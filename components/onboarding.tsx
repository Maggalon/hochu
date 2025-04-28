"use client"

import Image from "next/image";

export default function Onboarding({ setStart }: {setStart: (start: boolean) => void}) {
  return (
    <div className="relative w-full h-screen">
        {/* Background image with lower z-index */}
        <div className="absolute inset-0 z-0">
            <Image
                alt="Onboarding background"
                src={"/hochu-onboarding-bg.png"}
                quality={100}
                fill
                sizes="100vw"
                style={{
                    objectFit: 'cover',
                }}
            />
        </div>
        {/* Content with higher z-index */}
        <div className="relative z-10 w-full h-screen flex flex-col gap-20 justify-center items-center">
            <Image
                alt="ХОЧУ"
                src={"/hochu-named-logo.png"}
                width={300}
                height={90}
            />
            <Image
                alt="Roadmap"
                src={"/hochu-onboarding-roadmap.png"}
                width={250}
                height={250}
            />
            <button onClick={() => setStart(true)} className="absolute bottom-10 bg-[#d4af37] text-white text-xl font-bold p-5 w-64 rounded-full">Начать</button>
        </div>
    </div>
  );
}