'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useState } from 'react'

import type { Page } from '@/payload-types'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { Media } from '@/components/Media'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FormBlock } from '@/blocks/Form/Component'
import { ArrowLeftIcon } from './icon/ArrowLeftIcon'
import { ArrowRightIcon } from './icon/ArrowRightIcon'

export const BannerSlider: React.FC<Page['hero']> = ({ banners }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedForm, setSelectedForm] = useState<FormType | null>(null)

  useEffect(() => {
    setHeaderTheme('dark')
  })

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  // Auto-play functionality (pauses on hover)
  useEffect(() => {
    if (!api || !banners || banners.length <= 1 || isPaused) {
      return
    }

    const interval = setInterval(() => {
      api.scrollNext()
    }, 5000) // Auto-advance every 5 seconds

    return () => {
      clearInterval(interval)
    }
  }, [api, banners, isPaused])

  if (!banners || !Array.isArray(banners) || banners.length === 0) {
    return null
  }

  return (
    <div
      className="relative -mt-[10.4rem] flex items-end text-white h-full"
      data-theme="dark"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full min-h-[640px] md:min-h-[740px] xl:min-h-[940px]"
      >
        <CarouselContent className="-ml-0 h-full">
          {banners.map((banner, index) => {
            const { backgroundImage, title, description, buttonText, form } = banner

            const handleOpenForm = () => {
              if (form && typeof form === 'object') {
                setSelectedForm(form as unknown as FormType)
                setIsFormOpen(true)
              }
            }

            return (
              <CarouselItem key={index} className="pl-0 min-h-[640px] md:min-h-[740px] xl:min-h-[940px]">
                <div className="relative flex items-end select-none min-h-[640px] md:min-h-[740px] xl:min-h-[940px]">
                  {/* Background Image */}
                  {backgroundImage && typeof backgroundImage === 'object' && (
                    <React.Fragment>
                      <Media fill imgClassName="-z-10 object-cover" priority={index === 0} resource={backgroundImage} />
                      {/* Left to right gradient */}
                      <div className="absolute pointer-events-none left-0 top-0 w-full h-full bg-gradient-to-r from-black via-black/50 to-transparent" />
                      {/* Bottom to top gradient */}
                      <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
                    </React.Fragment>
                  )}

                  {/* Content - centered on the banner */}
                  <div className="container w-full mx-auto absolute inset-0 flex items-center z-10">
                    <div className="flex flex-col md:gap-4 xl:gap-6 max-w-4xl px-4">
                      {title && (
                        <h1 className="font-montserrat text-3xl md:text-4xl lg:text-4xl font-semibold mb-4 leading-tight">
                          {title}
                        </h1>
                      )}
                      {description && (
                        <p className="font-montserrat text-base md:text-2xl text-white/90 leading-relaxed max-w-4xl">
                          {description}
                        </p>
                      )}
                      {buttonText && form && (
                        <Button
                          onClick={handleOpenForm}
                          className="mt-6 w-fit bg-accent-foreground hover:bg-primary/90 text-white font-montserrat px-8 py-3 cursor-pointer"
                          size="lg"
                        >
                          {buttonText}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>



        {/* Progress Bar with Navigation - inside container */}
        {banners.length > 1 && (
          <div className="absolute bottom-20 left-0 right-0 z-20">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-3">
                {/* Previous Button */}
                <button
                  onClick={() => api?.scrollPrev()}
                  className="text-white hover:text-white/80 transition-colors cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ArrowLeftIcon className="w-3 h-3" />
                </button>

                {/* Current Slide Number */}
                <span className="text-white text-sm font-mono min-w-[2rem]">
                  {String(current + 1).padStart(2, '0')}
                </span>

                {/* Progress Bar */}
                <div className="relative w-32 h-0.5 bg-white/10">
                  <div
                    className="absolute left-0 top-0 h-full bg-white transition-all duration-300"
                    style={{
                      width: `${((current + 1) / banners.length) * 100}%`,
                    }}
                  />
                </div>

                {/* Total Slides */}
                <span className="text-white text-sm font-mono min-w-[2rem]">
                  {String(banners.length).padStart(2, '0')}
                </span>

                {/* Next Button */}
                <button
                  onClick={() => api?.scrollNext()}
                  className="text-white hover:text-white/80 transition-colors cursor-pointer"
                  aria-label="Next slide"
                >
                  <ArrowRightIcon className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}
      </Carousel>

      {/* Contact Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-montserrat text-2xl">
              {selectedForm?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedForm && (
            <FormBlock
              blockType="formBlock"
              enableIntro={false}
              form={selectedForm}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
