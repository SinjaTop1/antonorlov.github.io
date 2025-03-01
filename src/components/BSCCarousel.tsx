// src/components/BSCCarousel.tsx
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function BSCCarousel() {
  const slides = [
    {
      src: "/PXL_20250206_162914543.MP.jpg",
      alt: "Event Photo 1",
      caption: "Networking Event, February 2025"
    },
    {
      src: "/PXL_20250206_162914543.MP.jpg",
      alt: "Event Photo 2",
      caption: "Startup Workshop, January 2025"
    },
    {
      src: "/PXL_20250206_162914543.MP.jpg",
      alt: "Event Photo 3",
      caption: "Pitch Competition, December 2024"
    },
    {
      src: "/PXL_20250206_162914543.MP.jpg",
      alt: "Event Photo 4",
      caption: "Industry Panel Discussion, November 2024"
    }
  ];

  return (
    <Carousel
      opts={{ loop: true }}
      className="w-full rounded-lg overflow-hidden"
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index} className="relative min-w-0">
            <img 
              src={slide.src} 
              alt={slide.alt} 
              className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 w-full p-3 bg-black/60 text-white text-center">
              {slide.caption}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      
      <CarouselPrevious className="left-4 bg-white/80 hover:bg-white" />
      <CarouselNext className="right-4 bg-white/80 hover:bg-white" />
    </Carousel>
  );
}