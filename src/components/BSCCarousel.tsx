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
      src: "/event1photo.jpg",
      alt: "BSC Event 1",
      caption: "BSC Event: Networking"
    },
    {
      src: "/event1photo2.jpg",
      alt: "BSC Event 2",
      caption: "BSC Event: Workshop"
    },
    {
      src: "/event1photo3.jpg",
      alt: "BSC Event 3",
      caption: "BSC Event: Teamwork"
    },
    {
      src: "/event2photo2.png",
      alt: "BSC Event 4",
      caption: "BSC Event: Panel"
    }
  ];

  return (
    <Carousel
      opts={{ loop: true }}
      className="w-full rounded-xl overflow-hidden shadow-xl bg-neutral-900"
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index} className="relative min-w-0">
            <div className="w-full aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center">
              <img 
                src={slide.src} 
                alt={slide.alt} 
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105" 
                loading="lazy"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-full p-2 bg-black/60 text-white text-xs text-center rounded-b-xl tracking-wide">
              {slide.caption}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      
      <CarouselPrevious className="left-2 bg-white/70 hover:bg-white/90 text-black rounded-full shadow transition-all duration-300" />
      <CarouselNext className="right-2 bg-white/70 hover:bg-white/90 text-black rounded-full shadow transition-all duration-300" />
    </Carousel>
  );
}