'use client'

import React, { useState, useEffect, useCallback } from 'react'
import type { ReviewsBlockType } from '@/payload-types'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { QuotesIcon } from './icons/QuotesIcon'
import { Separator } from '@/components/ui/separator'

type Props = ReviewsBlockType & {
  id?: string
}


const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= rating ? 'text-[#1A3275]' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export const ReviewsBlockComponent: React.FC<Props> = ({ subtitle, title, reviews }) => {
  const [api, setApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnapCount, setScrollSnapCount] = useState(0)

  const scrollTo = useCallback(
    (index: number) => api && api.scrollTo(index),
    [api]
  )

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap())
    }

    const onReInit = () => {
      setScrollSnapCount(api.scrollSnapList().length)
    }

    setScrollSnapCount(api.scrollSnapList().length)
    onSelect()

    api.on('select', onSelect)
    api.on('reInit', onReInit)

    return () => {
      api.off('select', onSelect)
      api.off('reInit', onReInit)
    }
  }, [api])

  // Auto-scroll
  useEffect(() => {
    if (!api) return

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0) // Go back to first slide
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [api])

  return (
    <section className="py-16 bg-[#E1E8F0] overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-12 container mx-auto">
        {subtitle && (
          <p className="font-montserrat text-xs md:text-sm text-[#1A3275] font-bold uppercase tracking-wider mb-2">
            {subtitle}
          </p>
        )}
        {title && (
          <h2 className="font-montserrat text-2xl md:text-4xl font-semibold text-black">
            {title}
          </h2>
        )}
      </div>

      {/* Reviews Carousel */}
      {reviews && reviews.length > 0 && (
        <>
          <Carousel
            setApi={setApi}
            opts={{
              align: 'center',
              loop: false,
            }}
            className="container mx-auto"
          >
            <CarouselContent className="-ml-3">
              {reviews.map((review, index) => {
                const isSelected = index === selectedIndex

                return (
                  <CarouselItem
                    key={index}
                    className="pl-4 basis-[80%] md:basis-[55%] lg:basis-[40%] transition-all duration-500 ease-out"
                    style={{
                      opacity: isSelected ? 1 : 0.5,
                      transform: isSelected ? 'scale(1)' : 'scale(0.92)',
                    }}
                  >
                    <div className="relative">
                      {/* Quote circle - positioned outside the card */}
                      <div className="absolute top-12 -left-4 z-10 w-14 h-14 bg-[#1A3275] rounded-full flex items-center justify-center border-2 border-white">
                        <QuotesIcon className="w-8 h-8" />
                      </div>
                      
                      {/* Card */}
                      <div
                        className="bg-white p-6 h-full flex flex-row transition-shadow duration-500 pt-12"
                        style={{
                          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 24px 100%, 0 calc(100% - 24px))',
                          boxShadow: isSelected ? '0 20px 40px rgba(0,0,0,0.15)' : 'none',
                        }}
                      >
                        <div className="w-14 h-14 bg-gray-500 rounded-full mr-5 flex-shrink-0"></div>
                        <div className="flex flex-col">
                        {/* Review Text */}
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {review.reviewText}
                        </p>
                        <Separator className="my-4" />
                        {/* Rating */}
                        <div className="mb-3 bg-[#E1E8F0] w-fit p-1 rounded-full">
                          <StarRating rating={review.rating || 5} />
                        </div>

                        {/* Client Info */}
                        <div>
                          <p className="font-montserrat font-semibold text-[#051229]">
                            {review.clientName}
                          </p>
                          {review.clientRole && (
                            <p className="font-montserrat text-xs text-gray-500">
                              {review.clientRole}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
          </Carousel>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: scrollSnapCount }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-colors ${index === selectedIndex
                    ? 'bg-white'
                    : 'bg-white/30 hover:bg-white/50'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
