"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { X } from "lucide-react"

export default function Home() {
  const [isOpened, setIsOpened] = useState(false)
  const [showCarousel, setShowCarousel] = useState(false)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  useEffect(() => {
    if (isOpened && !showCarousel) {
      const timer = setTimeout(() => {
        setShowCarousel(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isOpened, showCarousel])

  const handleClick = () => {
    setIsOpened(true)
  }

  const handleCloseModal = () => {
    setIsOpened(false)
    setShowCarousel(false)
  }

  return (
    <div className="flex w-full min-h-screen bg-[#efefee] justify-center items-center p-5">
      <div className="flex flex-col items-center content-center gap-2">
        {!isOpened && (
          <>
            <h1 data-aos="fade-in" data-aos-delay="100" className="text-6xl kapakana-text text-amber-800">
              Renz & Rhonna
            </h1>
            <p data-aos="fade-in" data-aos-delay="300" className="text-lg mona-sans-text font-light text-amber-800">
              12.23.2025
            </p>
          </>
        )}

        {isOpened ? (
          <img
            src="images/Opened.png"
            alt="envelope"
            className="w-full max-w-[400px]"
            data-aos="fade-in"
            data-aos-delay="100"
          />
        ) : (
          <div data-aos="fade-in" data-aos-delay="500" className="relative p-5 cursor-pointer" onClick={handleClick}>
            <img src="images/Closed.png" alt="envelope" className="w-full max-w-[400px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <img src="images/Seal.png" alt="seal" className="w-[100px] animate-spin-slow" />
            </div>

            <img
              src="images/Seal-Logo.png"
              alt="seal"
              className="absolute top-1/2 left-1/2 w-[100px] -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        )}

        {isOpened && showCarousel && (
          <>
            <div data-aos="fade-in" className="fixed inset-0 bg-black/50 z-40" onClick={handleCloseModal} />
            <div data-aos="fade-in" className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 bg-[#efefef] hover:bg-gray-300 rounded-full p-2 transition-colors"
                aria-label="Close modal"
              >
                <X size={12} className="text-amber-800" />
              </button>
              <div data-aos="fade-up" className="bg-[#efefef] shadow-lg max-w-[500px] w-full">

                  <Carousel>
                    <CarouselContent>
                      <CarouselItem>
                        <img src="/posters/1.png" alt="Poster 1" className="w-full" />
                      </CarouselItem>
                      <CarouselItem>
                        <img src="/posters/2.png" alt="Poster 2" className="w-full" />
                      </CarouselItem>
                      <CarouselItem>
                        <img src="/posters/3.png" alt="Poster 3" className="w-full" />
                      </CarouselItem>
                      <CarouselItem>
                        <img src="/posters/4.png" alt="Poster 4" className="w-full" />
                      </CarouselItem>
                      <CarouselItem>
                        <img src="/posters/5.png" alt="Poster 5" className="w-full" />
                      </CarouselItem>
                      <CarouselItem>
                        <img src="/posters/6.png" alt="Poster 6" className="w-full" />
                      </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
              </div>
            </div>
          </>
          )}
      </div>
    </div>
  )
}
