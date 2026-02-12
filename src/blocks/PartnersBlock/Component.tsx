'use client'

import React from 'react'
import type { PartnersBlockType } from '@/payload-types'
import { Media } from '@/components/Media'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import AutoScroll from 'embla-carousel-auto-scroll'

type Props = PartnersBlockType & {
  id?: string
}

export const PartnersBlockComponent: React.FC<Props> = ({ title, partners }) => {
  if (!partners || partners.length === 0) {
    return null
  }

  // Duplicate partners for seamless looping
  const allPartners = [...partners, ...partners, ...partners]

  return (
    <section className="container mx-auto overflow-hidden py-20">
      <div className="px-4">
        {/* Section Title */}
        {title && (
          <div className="flex items-center justify-center mb-12">
            <div className="flex-1 h-px bg-[#E1E8F0]" />
            <h2 className="font-montserrat text-sm md:text-base font-semibold text-[#051229] px-20 mx-5 py-1 bg-[#E1E8F0] rounded-lg">
              {title}
            </h2>
            <div className="flex-1 h-px bg-[#E1E8F0]" />
          </div>
        )}
      </div>

      {/* Partners Logos - Auto Scroll Carousel */}
      <div 
        className="relative"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      >
        <Carousel
          opts={{
            loop: true,
            align: 'start',
            dragFree: true,
          }}
          plugins={[
            AutoScroll({
              speed: 1,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
        >
          <CarouselContent className="-ml-6 md:-ml-8">
            {allPartners.map((partner, index) => (
              <CarouselItem 
                key={index} 
                className="pl-6 md:pl-8 basis-auto"
              >
                <div className="flex h-20 w-48 md:h-24 md:w-60 bg-[#E1E8F0] rounded-lg justify-center items-center px-6 py-4">
                {partner.logo && typeof partner.logo === 'object' && (
                  <Media
                    resource={partner.logo}
                    imgClassName="max-h-full max-w-full object-contain"
                  />
                )}
              </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        </div>
    </section>
  )
}
