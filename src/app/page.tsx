"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const ref = useRef<HTMLElement>(null);

  // The main container is responsive which means the distance between the snow pile container and the main container is dynamic so the distance should be made dynamic as well
  const [width, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      // TODO: use a debouncer
      if (ref.current) {
        const newWidth = ref.current.getBoundingClientRect().width;
        setContainerWidth(newWidth);
      }
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <main ref={ref} className="max-w-xl mx-auto relative">
      <Image
        className="w-full"
        src="/Háttér és Fejléc.svg"
        alt="Main Image"
        width={0}
        height={0}
      />
      {/* The reason why I chose 0.15 is because in the design the distance between the bottom of the last snow pile and the bottom of the main container is around 164px which is 15% of the main container's width. */}
      <section className="absolute" style={{ bottom: width * 0.15 }}>
        <div className="relative">
          <Image
            className="w-full"
            src="/Snow 4.svg"
            alt="Snow Pile 4"
            width={0}
            height={0}
            style={{ marginBottom: width * 0.1 }}
          />
          <input
            defaultValue={0}
            type="range"
            min="0"
            max="12"
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[85%]"
            // TODO: figure out a better way to set the width without using magic numbers
          />
        </div>
        <div className="relative">
          <Image
            className="w-full"
            src="/Snow 3.svg"
            alt="Snow Pile 3"
            width={0}
            height={0}
            style={{ marginBottom: width * 0.1 }}
          />
          <input
            defaultValue={0}
            type="range"
            min="0"
            max="12"
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[85%]"
          />
        </div>
        <div className="relative">
          <Image
            className="w-full"
            src="/Snow 2.svg"
            alt="Snow Pile 2"
            width={0}
            height={0}
            style={{ marginBottom: width * 0.1 }}
          />
          <input
            defaultValue={0}
            type="range"
            min="0"
            max="12"
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[85%]"
          />
        </div>
        <div className="relative">
          <Image
            className="w-full"
            src="/Snow 1.svg"
            alt="Snow Pile 1"
            width={0}
            height={0}
          />
          <input
            defaultValue={0}
            type="range"
            min="0"
            max="12"
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[85%]"
          />
        </div>
      </section>
    </main>
  );
}
