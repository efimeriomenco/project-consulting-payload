'use client'

import React, { useState, useEffect, useCallback } from 'react'
import type { ServicesBlockType } from '@/payload-types'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FormBlock } from '@/blocks/Form/Component'
import { cn } from '@/utilities/ui'

type Props = ServicesBlockType & {
  id?: string
}

type Service = NonNullable<NonNullable<ServicesBlockType['categories']>[number]['services']>[number]

export const ServicesBlockComponent: React.FC<Props> = ({
  title,
  categories,
}) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedForm, setSelectedForm] = useState<FormType | null>(null)
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

  // Get services based on active category
  const getDisplayedServices = () => {
    if (!categories || categories.length === 0) return []

    if (activeCategoryIndex !== null) {
      return categories[activeCategoryIndex]?.services || []
    }

    // Show all services from all categories when no filter is active
    return categories.flatMap((cat) => cat.services || [])
  }

  const displayedServices = getDisplayedServices()

  const handleOpenForm = (form: any) => {
    if (form && typeof form === 'object') {
      setSelectedForm(form as FormType)
      setIsFormOpen(true)
    }
  }

  const handleServiceClick = (service: Service) => {
    if (service.form && typeof service.form === 'object') {
      handleOpenForm(service.form)
    } else if (service.link) {
      window.location.href = service.link
    }
  }

  return (
    <section className="container mx-auto">
      <div className="flex flex-col">
        {categories && categories.length > 0 && (
          <div className="flex flex-col gap-4">
            {title && (
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-black">
                {title}
              </h2>
            )}
            <div className="flex flex-wrap gap-4 mb-8 text-left">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={activeCategoryIndex === index ? 'default' : 'outline'}
                className={cn(
                  'font-montserrat min-w-24 md:min-w-52 pl-6 pr-6 py-7 rounded-sm justify-start text-left font-bold',
                  activeCategoryIndex === index
                    ? 'bg-primary/90 text-white'
                    : 'bg-white text-foreground border-border hover:bg-accent-foreground hover:text-white',
                )}
                onClick={() =>
                  setActiveCategoryIndex(
                    activeCategoryIndex === index ? null : index,
                  )
                }
              >
                {category.name.toUpperCase()}
              </Button>
            ))}
            </div>
          </div>
        )}
      </div>

      {/* Services Carousel */}
      {displayedServices && displayedServices.length > 0 && (
          <>
            <Carousel
              setApi={setApi}
              opts={{
                align: 'start',
                loop: false,
                containScroll: 'trimSnaps',
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {displayedServices.map((service, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 xl:basis-1/4"
                  >
                    <div className="relative group h-[400px] md:h-[430px] overflow-hidden rounded-lg">
                      {/* Background Image */}
                      {service.backgroundImage &&
                        typeof service.backgroundImage === 'object' && (
                          <Media
                            fill
                            imgClassName="object-cover transition-transform duration-500 group-hover:scale-110"
                            resource={service.backgroundImage}
                          />
                        )}

                      {/* Overlay Gradient */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(to top, #051229 12%, #051229 10%, transparent 60%)'
                        }}
                      />

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-end items-center p-4">
                        {service.title && (
                          <h3 className="font-montserrat text-lg md:text-2xl font-normal text-white mb-3">
                            {service.title}
                          </h3>
                        )}
                        {service.buttonText && (
                          <Button
                            onClick={() => handleServiceClick(service)}
                            className="w-fit bg-accent-foreground hover:bg-primary/90 text-white text-base font-montserrat px-4 py-2"
                            size="sm"
                          >
                            {service.buttonText}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Pagination Dots */}
            {scrollSnapCount > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: scrollSnapCount }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
                      index === selectedIndex
                        ? 'bg-[#1A3275]'
                        : 'bg-[#1A3275]/30 hover:bg-[#1A3275]/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </>
      )}

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
    </section>
  )
}
