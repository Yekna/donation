"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { addSpaceBetweenNumber } from "@/utils/numbers";

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
  const [donations, setDonations] = useState({
    sled1: 0,
    sled2: 0,
    sled3: 0,
    sled4: 0,
  });

  const handleChange = useCallback(
    (inputName: string, value: string) => {
      const newValues = {
        ...donations,
        [inputName]: parseInt(value, 10),
      };

      // Check if the sum exceeds 12, if yes, prevent updating the state
      const sum = Object.values(newValues).reduce((acc, curr) => acc + curr, 0);
      if (sum <= 12) {
        switch (inputName) {
          case "sled1":
            if (firstSledRef.current && firstSliderRef.current)
              firstSledRef.current.style.left = `${
                sliderWidth * (Number(firstSliderRef.current.value) / 12) +
                width * 0.025
              }px`;
            break;
          case "sled2":
            if (secondSledRef.current && secondSliderRef.current)
              secondSledRef.current.style.left = `${
                sliderWidth * (Number(secondSliderRef.current.value) / 12) +
                width * 0.025
              }px`;
            break;
          case "sled3":
            if (thirdSledRef.current && thirdSliderRef.current)
              thirdSledRef.current.style.left = `${
                sliderWidth * (Number(thirdSliderRef.current.value) / 12) +
                width * 0.025
              }px`;
            break;
          case "sled4":
            if (fourthSledRef.current && fourthSliderRef.current)
              fourthSledRef.current.style.left = `${
                sliderWidth * (Number(fourthSliderRef.current.value) / 12) +
                width * 0.025
              }px`;
            break;
          default:
            break;
        }
        setDonations(newValues);
      }
    },
    [donations, sliderWidth, width]
  );

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
    <main ref={ref} className="max-w-xl mx-auto relative overflow-hidden">
      <Image
        className="w-full"
        src="/Háttér és Fejléc.svg"
        alt="Main Image"
        width={0}
        height={0}
      />
      {/* The reason why I chose 0.15 is because in the design the distance between the bottom of the last snow pile and the bottom of the main container is around 164px which is 15% of the main container's width. */}
      <section className="absolute bottom-0">
        <div
          className="relative select-none"
          style={{ marginBottom: width * 0.02 }}
        >
          <p className="text-right w-[85%] mx-auto text-4xl font-black tracking-wide text-[#26c6da]">
            {addSpaceBetweenNumber(donations.sled1)} Ft
          </p>
          <Image
            className="w-full"
            src="/Snow 4.svg"
            alt="Snow Pile 4"
            width={0}
            height={0}
          />
          <input
            onChange={(e) => handleChange("sled1", e.target.value)}
            ref={firstSliderRef}
            type="range"
            min="0"
            value={donations.sled1}
            max={12}
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[85%]"
            // TODO: figure out a better way to set the width without using magic numbers
          />
          <Image
            ref={firstSledRef}
            src="/Szánkó_csúszkák.svg"
            alt="Sled 1"
            width={width * 0.13}
            height={width * 0.07}
            style={{ left: width * 0.025 }}
            className="absolute z-10 pointer-events-none top-1/2 -translate-y-1/2"
          />
          <div
            style={{ left: width * 0.025 }}
            className="absolute z-10 bottom-0 flex gap-2"
          >
            <button>
              <Image
                src="/info.svg"
                alt="info 1"
                width={width * 0.05}
                height={width * 0.05}
              />
            </button>
            <a href="#" target="_blank">
            <Image
                src="/link.svg"
                alt="link 1"
                width={width * 0.05}
                height={width * 0.05}
              />
            </a>
          </div>
        </div>
        <div
          className="relative select-none"
          style={{ marginBottom: width * 0.02 }}
        >
          <p className="text-right w-[85%] mx-auto text-4xl font-black tracking-wide text-[#26c6da]">
            {addSpaceBetweenNumber(donations.sled2)} Ft
          </p>
          <Image
            className="w-full"
            src="/Snow 3.svg"
            alt="Snow Pile 3"
            width={0}
            height={0}
          />
          <input
            value={donations.sled2}
            onChange={(e) => handleChange("sled2", e.target.value)}
            ref={secondSliderRef}
            type="range"
            min="0"
            max={12}
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[85%]"
          />
          <Image
            ref={secondSledRef}
            src="/Szánkó_csúszkák.svg"
            alt="Sled 1"
            width={width * 0.13}
            height={width * 0.07}
            style={{ left: width * 0.025 }}
            className="absolute z-10 pointer-events-none top-1/2 -translate-y-1/2"
          />
          <div
            style={{ left: width * 0.025 }}
            className="absolute z-10 bottom-0 flex gap-2"
          >
            <button>
              <Image
                src="/info.svg"
                alt="info 2"
                width={width * 0.05}
                height={width * 0.05}
              />
            </button>
            <a href="#" target="_blank">
            <Image
                src="/link.svg"
                alt="link 2"
                width={width * 0.05}
                height={width * 0.05}
              />
            </a>
          </div>
        </div>
        <div
          className="relative select-none"
          style={{ marginBottom: width * 0.02 }}
        >
          <p className="text-right w-[85%] mx-auto text-4xl font-black tracking-wide text-[#26c6da]">
            {addSpaceBetweenNumber(donations.sled3)} Ft
          </p>

          <Image
            className="w-full"
            src="/Snow 2.svg"
            alt="Snow Pile 2"
            width={0}
            height={0}
          />
          <input
            onChange={(e) => handleChange("sled3", e.target.value)}
            ref={thirdSliderRef}
            type="range"
            value={donations.sled3}
            min="0"
            max={12}
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[85%]"
          />
          <Image
            ref={thirdSledRef}
            src="/Szánkó_csúszkák.svg"
            alt="Sled 1"
            width={width * 0.13}
            height={width * 0.07}
            style={{ left: width * 0.025 }}
            className="absolute z-10 pointer-events-none top-1/2 -translate-y-1/2"
          />
          <div
            style={{ left: width * 0.025 }}
            className="absolute z-10 bottom-0 flex gap-2"
          >
            <button>
              <Image
                src="/info.svg"
                alt="info 3"
                width={width * 0.05}
                height={width * 0.05}
              />
            </button>
            <a href="#" target="_blank">
            <Image
                src="/link.svg"
                alt="link 3"
                width={width * 0.05}
                height={width * 0.05}
              />
            </a>
          </div>
        </div>
        <div
          className="relative select-none"
          style={{ marginBottom: width * 0.02 }}
        >
          <p className="text-right w-[85%] mx-auto text-4xl font-black tracking-wide text-[#26c6da]">
            {addSpaceBetweenNumber(donations.sled4)} Ft
          </p>

          <Image
            className="w-full"
            src="/Snow 1.svg"
            alt="Snow Pile 1"
            width={0}
            height={0}
          />
          <input
            onChange={(e) => handleChange("sled4", e.target.value)}
            ref={fourthSliderRef}
            type="range"
            value={donations.sled4}
            min="0"
            max={12}
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[85%]"
          />
          <Image
            ref={fourthSledRef}
            src="/Szánkó_csúszkák.svg"
            alt="Sled 1"
            width={width * 0.13}
            height={width * 0.07}
            style={{ left: width * 0.025 }}
            className="absolute z-10 pointer-events-none top-1/2 -translate-y-1/2"
          />
          <div
            style={{ left: width * 0.025 }}
            className="absolute z-10 bottom-0 flex gap-2"
          >
            <button>
              <Image
                src="/info.svg"
                alt="info 4"
                width={width * 0.05}
                height={width * 0.05}
              />
            </button>
            <a href="#" target="_blank">
            <Image
                src="/link.svg"
                alt="link 4"
                width={width * 0.05}
                height={width * 0.05}
              />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
