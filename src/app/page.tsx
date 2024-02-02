"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const ref = useRef<HTMLElement>(null);
  const firstSliderRef = useRef<HTMLInputElement>(null);
  const secondSliderRef = useRef<HTMLInputElement>(null);
  const thirdSliderRef = useRef<HTMLInputElement>(null);
  const fourthSliderRef = useRef<HTMLInputElement>(null);
  const firstSledRef = useRef<HTMLImageElement>(null);
  const secondSledRef = useRef<HTMLImageElement>(null);
  const thirdSledRef = useRef<HTMLImageElement>(null);
  const fourthSledRef = useRef<HTMLImageElement>(null);

  // The main container is responsive which means the distance between the snow pile container and the main container is dynamic so the distance should be made dynamic as well
  const [width, setContainerWidth] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);

  // TODO: change size of slides based on main container width
  // TODO: use useCallback to stop repeating code in onInput props

  useEffect(() => {
    const updateWidth = () => {
      // TODO: use a debouncer
      if (ref.current) {
        const newWidth = ref.current.offsetWidth;
        setContainerWidth(newWidth);
      }

      // TODO: remove setTimeout entirely. For now this is the only solution I could come up with. Building the code makes it so offsetWidth is set to 0 for some reason.
      setTimeout(() => {
        if (firstSliderRef.current) {
          const newWidth = firstSliderRef.current.offsetWidth;
          setSliderWidth(newWidth);
        }
      }, 100);
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
            onInput={() => {
              if (firstSledRef.current && firstSliderRef.current) {
                firstSledRef.current.style.left = `${sliderWidth * (Number(firstSliderRef.current.value) / 12)}px`;
              }
            }}
            ref={firstSliderRef}
            defaultValue={0}
            type="range"
            min="0"
            max="12"
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[85%]"
            // TODO: figure out a better way to set the width without using magic numbers
          />
          <Image
            ref={firstSledRef}
            src="/Szánkó_csúszkák.svg"
            alt="Sled 1"
            width={100}
            height={100}
            className="absolute left-0 z-10 pointer-events-none top-0 h-full"
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
            onInput={() => {
              if (secondSledRef.current && secondSliderRef.current) {
                secondSledRef.current.style.left = `${sliderWidth * (Number(secondSliderRef.current.value) / 12)}px`;
              }
            }}
            ref={secondSliderRef}
            defaultValue={0}
            type="range"
            min="0"
            max="12"
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[85%]"
          />
          <Image
            ref={secondSledRef}
            src="/Szánkó_csúszkák.svg"
            alt="Sled 1"
            width={100}
            height={100}
            className="absolute left-0 z-10 pointer-events-none top-0 h-full"
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
            onInput={() => {
              if (thirdSledRef.current && thirdSliderRef.current) {
                thirdSledRef.current.style.left = `${sliderWidth * (Number(thirdSliderRef.current.value) / 12)}px`;
              }
            }}
            ref={thirdSliderRef}
            defaultValue={0}
            type="range"
            min="0"
            max="12"
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[85%]"
          />
          <Image
            ref={thirdSledRef}
            src="/Szánkó_csúszkák.svg"
            alt="Sled 1"
            width={100}
            height={100}
            className="absolute left-0 z-10 pointer-events-none top-0 h-full"
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
            onInput={() => {
              if (fourthSledRef.current && fourthSliderRef.current) {
                fourthSledRef.current.style.left = `${sliderWidth * (Number(fourthSliderRef.current.value) / 12)}px`;
              }
            }}
            ref={fourthSliderRef}
            defaultValue={0}
            type="range"
            min="0"
            max="12"
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[85%]"
          />
          <Image
            ref={fourthSledRef}
            src="/Szánkó_csúszkák.svg"
            alt="Sled 1"
            width={100}
            height={100}
            className="absolute left-0 z-10 pointer-events-none top-0 h-full"
          />
        </div>
      </section>
    </main>
  );
}
