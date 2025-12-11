"use client"

import { useEffect, useState, useRef } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { X } from "lucide-react"
import emailjs from "@emailjs/browser"
import { toast } from "sonner"

const GUEST_LIST = [
  "Rony Pilande",
  "Ronald Baga-an",
  "Winiefrenda Pilande",
  "Janette Baga-an",
  "Rizzalyn Pilande",
  "Cherry Mae Baga-an",
  "Leliane Torres",
  "John Ronald Baga-an",
  "Cherryl Cunanan",
  "Adonis Eduvane",
  "Eva Rose Cunanan",
  "Mary Jane Eduvane",
  "Keano Mickel Cunanan",
  "Donna Marie Eduvane",
  "Sophia Louise Cunanan",
  "Mark Jaedon Eduvane",
  "Rushel Pilande",
  "Reymar Baylon",
  "Aries Diolola",
  "Juvy Baylon",
  "Kristoff Karl Namuco",
  "Rhian Joy Baylon",
  "Athena Faith Namuco",
  "Rica Joy Baylon",
  "Gysel Gabad",
  "Joel Menaje",
  "Gabriel Oliver Carreon",
  "John Allen Menaje",
  "Frances Claire Garcia",
  "Marian Bo",
  "Yadah Sheneniah Yanson",
  "Arjhay Diaz",
  "Azariah Matthew Yanson",
  "Joan Pereira",
  "Leonardo Yanson",
  "Kenneth Pereira",
  "Anna Ezhra Alburo",
  "Anaiah Faith Pereira",
  "Zion Amos Alburo",
  "Rod Acle",
  "Menchan Alburo",
  "Aldrin Espedido",
  "Jonah Kezia Andrino",
  "Elizabeth Dumadaog",
  "Nanette Velasco",
  "Jean Yaptinchay",
  "Dhave Racaza"
];


export default function Home() {
  // ----- STATE -----
  const [isOpened, setIsOpened] = useState(false)
  const [showCarousel, setShowCarousel] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const [selectedGuests, setSelectedGuests] = useState<string[]>([])
  const [filteredGuests, setFilteredGuests] = useState<string[]>([])

  // ----- REFS -----
  const form = useRef<HTMLFormElement>(null)

  // ----- HANDLERS -----
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInput(value)

    if (value.trim()) {
      const filtered = GUEST_LIST.filter(
        (guest) =>
          guest.toLowerCase().includes(value.toLowerCase()) &&
          !selectedGuests.includes(guest)
      )
      setFilteredGuests(filtered)
    } else {
      setFilteredGuests([])
    }
  }

  const handleSelectGuest = (guest: string) => {
    setSelectedGuests([...selectedGuests, guest])
    setSearchInput("")
    setFilteredGuests([])
  }

  const handleRemoveGuest = (guest: string) => {
    setSelectedGuests(selectedGuests.filter((g) => g !== guest))
  }

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const templateParams = {
      guest_list: selectedGuests.join(", "),
      attendance: form.current?.attendance?.value || "No response",
    }

    emailjs.send("service_8c0x7a7", "template_tiy1kvq", templateParams, "CayUjwp0k8rhkHzqQ").then(
      (result) => {
        console.log("Email sent!", result.text)
        toast.success("Thank You!", {
          description: "Thank you for your response. We look forward to celebrating with you!",
        })
        // Reset form fields
        setSelectedGuests([])
        setSearchInput("")
        setFilteredGuests([])
      },
      (error) => {
        console.error("Email error:", error)
      },
    )
  }

  const handleClick = () => setIsOpened(true)
  const handleCloseModal = () => {
    setIsOpened(false)
    setShowCarousel(false)
  }

  // ----- EFFECTS -----
  useEffect(() => {
    AOS.init({ duration: 1000, once: true })
  }, [])

  useEffect(() => {
    if (isOpened && !showCarousel) {
      const timer = setTimeout(() => setShowCarousel(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [isOpened, showCarousel])

  // ----- RENDER -----
  return (
    <div className="flex w-full min-h-screen bg-[#efefee] justify-center items-center p-5">
      <div className="flex flex-col items-center content-center gap-2">
        {!isOpened && (
          <>
            <h1
              data-aos="fade-in"
              data-aos-delay="100"
              className="text-6xl kapakana-text text-amber-800"
            >
              Renz & Rhonna
            </h1>
            <p
              data-aos="fade-in"
              data-aos-delay="300"
              className="text-lg mona-sans-text font-light text-amber-800"
            >
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
          <>
            <div
              data-aos="fade-in"
              data-aos-delay="500"
              className="relative p-5 cursor-pointer"
              onClick={handleClick}
            >
              <img
                src="images/Closed.png"
                alt="envelope"
                className="w-full max-w-[400px]"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <img
                  src="images/Seal.png"
                  alt="seal"
                  className="w-[100px] animate-spin-slow"
                />
              </div>

              <img
                src="images/Seal-Logo.png"
                alt="seal"
                className="absolute top-1/2 left-1/2 w-[100px] -translate-x-1/2 -translate-y-1/2"
              />
            </div>
            <p
              data-aos="fade-in"
              data-aos-delay="600"
              className="text-xs text-amber-800 font-light tracking-wide mt-4"
            >
              Click the envelope to open
            </p>
          </>
        )}

        {isOpened && showCarousel && (
          <>
            <div
              data-aos="fade-in"
              className="fixed inset-0 bg-black/50 z-40"
              onClick={handleCloseModal}
            />
            <div
              data-aos="fade-in"
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
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
                    {/* Posters 1-8 */}
                    {Array.from({ length: 8 }, (_, i) => (
                      <CarouselItem key={i}>
                        <img src={`/posters/${i + 1}.png`} alt={`Poster ${i + 1}`} className="w-full" />
                      </CarouselItem>
                    ))}

                    {/* RSVP Slide */}
                    <CarouselItem className="relative flex items-center justify-center w-full lora-text">
                      <img
                        src="/posters/10.png"
                        alt="Poster 10"
                        className="w-full h-full object-cover absolute inset-0 -z-10"
                      />
                      <div className="relative w-full max-w-md px-6 mt-4">
                        <form ref={form} onSubmit={sendEmail} className="space-y-6">
                          <div className="flex justify-center flex-wrap">
                            <img src="/images/RSVP.png" alt="title" className="w-30" />
                            <p className="text-center text-black text-xs text-pretty">
                              Please confirm your attendance and enter the names of all guests attending.
                            </p>
                          </div>

                          <div className="my-2 text-center">
                            <label className="block mb-1 text-[16px] text-[#6a4118] uppercase">
                              Guest Names
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="Search and select guests..."
                                value={searchInput}
                                onChange={handleSearchChange}
                                className="w-full rounded px-4 py-2 bg-amber-50 text-xs border-2 border-[#6a4118] text-[#6a4118]"
                              />
                              {filteredGuests.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-[#6a4118] rounded shadow-lg z-10">
                                  {filteredGuests.map((guest) => (
                                    <button
                                      key={guest}
                                      type="button"
                                      onClick={() => handleSelectGuest(guest)}
                                      className="w-full text-left px-4 py-2 text-xs text-[#6a4118] hover:bg-amber-100 transition"
                                    >
                                      {guest}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>

                            {selectedGuests.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-2 justify-center">
                                {selectedGuests.map((guest) => (
                                  <div
                                    key={guest}
                                    className="bg-[#6a4118] text-white text-xs px-3 py-1 rounded-full flex items-center gap-2"
                                  >
                                    {guest}
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveGuest(guest)}
                                      className="hover:opacity-80 transition"
                                    >
                                      <X size={14} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {selectedGuests.length > 0 && (
                            <div className="my-2 text-center">
                              <label className="block mb-1 text-[16px] text-[#6a4118] uppercase">
                                Will you be attending?
                              </label>
                              <select
                                name="attendance"
                                className="w-full rounded px-4 py-2 bg-amber-50 text-xs border-2 border-[#6a4118] text-[#6a4118]"
                              >
                                <option value="">Select an option</option>
                                <option value="yes">Yes, we'll be there</option>
                                <option value="no">No, we can't attend</option>
                              </select>
                            </div>
                          )}

                          <button
                            type="submit"
                            disabled={selectedGuests.length === 0}
                            className="w-full bg-[#6a4118] text-white py-2 rounded hover:bg-[#6a4118]/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Submit RSVP
                          </button>
                        </form>
                      </div>
                    </CarouselItem>

                    {/* Poster 11 */}
                    <CarouselItem>
                      <img src="/posters/11.png" alt="Poster 11" className="w-full" />
                    </CarouselItem>
                  </CarouselContent>

                  <div className="absolute mt-4 flex w-full justify-center bg-transparent gap-5">
                    <CarouselPrevious />
                    <CarouselNext />
                  </div>
                </Carousel>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
