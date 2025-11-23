"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const BANNERS = [
  {
    id: 1,
    title: "Summer Business Travel Special",
    description: "Get 20% cashback on all international flight bookings this month.",
    image: "bg-gradient-to-r from-blue-600 to-cyan-500",
    cta: "Book Now",
  },
  {
    id: 2,
    title: "Premium Hotel Partners",
    description: "Earn 2x reward points at Hyatt and Marriott properties.",
    image: "bg-gradient-to-r from-emerald-600 to-teal-500",
    cta: "View Hotels",
  },
  {
    id: 3,
    title: "New Expense Management Tools",
    description: "Streamline your reporting with our new AI-powered receipt scanner.",
    image: "bg-gradient-to-r from-orange-500 to-amber-500",
    cta: "Try It Out",
  },
]

export function PromotionalBanners() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isPaused])

  const handleBannerClick = (banner: (typeof BANNERS)[0]) => {
    console.log(`Banner clicked: ${banner.title}`)
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl shadow-lg group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out h-[200px]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {BANNERS.map((banner) => (
          <div
            key={banner.id}
            className={cn("min-w-full h-full flex items-center p-8 text-white cursor-pointer", banner.image)}
            onClick={() => handleBannerClick(banner)}
          >
            <div className="max-w-xl space-y-4">
              <h2 className="text-3xl font-bold font-serif">{banner.title}</h2>
              <p className="text-lg opacity-90">{banner.description}</p>
              <Button variant="secondary" className="mt-2 font-semibold">
                {banner.cta} <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {BANNERS.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/80",
            )}
            onClick={(e) => {
              e.stopPropagation()
              setCurrentIndex(index)
            }}
          />
        ))}
      </div>
    </div>
  )
}
