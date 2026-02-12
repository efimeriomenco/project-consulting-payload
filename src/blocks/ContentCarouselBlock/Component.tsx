'use client'

import React, { useEffect, useState } from 'react'
import type { ContentCarouselBlockType, Post, Page } from '@/payload-types'
import { useParams } from 'next/navigation'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Props = Omit<ContentCarouselBlockType, 'blockType'> & {
  id?: string
}

type ContentItem = Post | Page

export const ContentCarouselBlockComponent: React.FC<Props> = ({
  title,
  contentType = 'posts',
  populateBy = 'collection',
  selectedItems,
  viewAllLink,
  readMoreLabel,
  itemsLimit = 12,
}) => {
  const { locale } = useParams()
  const [items, setItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [api, setApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const isSelectionMode = populateBy === 'selection'
  const effectiveLimit = Math.max(itemsLimit || 12, 6)

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }

    api.on('select', onSelect)
    api.on('reInit', onSelect)
    onSelect()

    return () => {
      api.off('select', onSelect)
      api.off('reInit', onSelect)
    }
  }, [api])

  useEffect(() => {
    // If using individual selection, use the selected items directly
    if (isSelectionMode && selectedItems) {
      const itemsArray = selectedItems
        .map((item) => {
          if (typeof item === 'object' && item !== null) {
            // Handle relationship format: { relationTo: 'posts' | 'pages', value: Post | Page }
            if ('value' in item && item.value) {
              // Only return if value is an object (Post or Page), not a number (ID)
              if (typeof item.value === 'object') {
                return item.value as ContentItem
              }
            }
          }
          return null
        })
        .filter((item): item is ContentItem => item !== null)
      setItems(itemsArray)
      setLoading(false)
      return
    }

    // Otherwise fetch from API
    const fetchItems = async () => {
      try {
        const collection = contentType === 'posts' ? 'posts' : 'pages'
        const res = await fetch(
          `/api/${collection}?limit=${effectiveLimit}&sort=-publishedAt&locale=${locale}&depth=1`
        )
        const data = await res.json()
        setItems(data.docs || [])
      } catch (error) {
        console.error(`Error fetching ${contentType}:`, error)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [effectiveLimit, locale, contentType, isSelectionMode, selectedItems])

  const scrollPrev = () => api?.scrollPrev()
  const scrollNext = () => api?.scrollNext()

  const getItemLink = (item: ContentItem): string => {
    if ('slug' in item) {
      return contentType === 'posts' ? `/posts/${item.slug}` : `/${item.slug}`
    }
    return '#'
  }

  const getItemTitle = (item: ContentItem): string => {
    if ('title' in item && typeof item.title === 'string') {
      return item.title
    }
    return ''
  }

  const getItemDescription = (item: ContentItem): string => {
    if (contentType === 'posts') {
      const post = item as Post
      return post.excerpt || post.meta?.description || ''
    } else {
      const page = item as Page
      return page.meta?.description || ''
    }
  }

  const getItemImage = (item: ContentItem) => {
    if (contentType === 'posts') {
      const post = item as Post
      return post.featuredImage || post.meta?.image
    } else {
      const page = item as Page
      // Check if hero exists and has backgroundImage, otherwise use meta image
      if (page.hero && 'backgroundImage' in page.hero && page.hero.backgroundImage) {
        return page.hero.backgroundImage
      }
      return page.meta?.image
    }
  }

  if (loading) {
    return (
      <section className="container mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
          <div className="flex gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-80">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        {/* Title */}
        <div className="inline-block border border-stone-100 rounded-full px-6 py-2 bg-stone-50">
          <span className="font-montserrat text-sm md:text-base font-medium text-gray-800">
            {title}
          </span>
        </div>

        {/* Navigation & View All */}
        <div className="flex items-center gap-4">
          {/* Arrows */}
          {items.length > 0 && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center transition-all cursor-pointer ${canScrollPrev
                    ? 'bg-white text-gray-300 hover:bg-[#152a61] hover:text-white hover:border-[#152a61]'
                    : 'border-gray-200 text-gray-200 cursor-not-allowed'
                  }`}
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollNext}
                disabled={!canScrollNext}
                className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center transition-all cursor-pointer ${canScrollNext
                    ? 'bg-white text-gray-300 hover:bg-[#152a61] hover:text-white hover:border-[#152a61]'
                    : 'border-gray-200 text-gray-200 cursor-not-allowed'
                  }`}
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* View All Link */}
          {viewAllLink?.link && (
            <CMSLink
              {...viewAllLink.link}
              className="group flex items-center gap-2 text-sm font-medium text-[#1A3275] hover:text-[#102a41] transition-colors cursor-pointer"
            >
              <span className="relative">
                {viewAllLink.label}
                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#1A3275] group-hover:w-full transition-all duration-300" />
              </span>
              <ArrowRight className="w-4 h-4" />
            </CMSLink>
          )}
        </div>
      </div>

      {/* Carousel */}
      {items.length > 0 ? (
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            loop: true,
            slidesToScroll: 1,
          }}
        >
          <CarouselContent className="-ml-4">
            {items.map((item) => {
              const itemImage = getItemImage(item)
              const itemLink = getItemLink(item)
              const itemTitle = getItemTitle(item)
              const itemDescription = getItemDescription(item)

              return (
                <CarouselItem
                  key={item.id}
                  className="pl-4 pb-4 basis-full sm:basis-1/2 lg:basis-1/3 h-auto"
                >
                  <div className="group h-full flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#1A3275]/20 transition-all duration-300">
                    {/* Image */}
                    <div className="relative h-48 md:h-56 bg-[#051229] overflow-hidden flex-shrink-0">
                      {itemImage && typeof itemImage === 'object' ? (
                        <Media
                          resource={itemImage}
                          imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          fill
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-white/50 text-sm">No image</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-montserrat text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#1A3275] transition-colors duration-300">
                        {itemTitle}
                      </h3>
                      <p className="font-montserrat text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                        {itemDescription}
                      </p>
                      <Link
                        href={itemLink}
                        className="inline-flex items-center gap-2 bg-[#051229] text-white text-sm font-medium pl-0.5 pr-3 py-0.5 rounded-full hover:bg-[#1A3275] transition-all duration-300 cursor-pointer mt-auto w-fit"
                      >
                        <ArrowRight className="bg-[#1A3275] group-hover:bg-white group-hover:text-[#1A3275] rounded-full p-1 w-8 h-8 transition-all duration-300" />
                        {readMoreLabel}
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p>No {contentType} available yet.</p>
        </div>
      )}
    </section>
  )
}
