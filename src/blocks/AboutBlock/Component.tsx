'use client'

import React from 'react'
import type { AboutBlockType } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

type Props = AboutBlockType & {
  id?: string
}

export const AboutBlockComponent: React.FC<Props> = ({
  title,
  content,
  image,
  imagePosition = 'right',
}) => {
  const isBottomLayout = imagePosition === 'bottom'

  return (
    <section className="">
      <div className="container mx-auto px-4">
        <div className={`flex gap-12 ${isBottomLayout ? 'flex-col items-center' : 'flex-col lg:flex-row items-start'}`}>
          {/* Content */}
          <div className={isBottomLayout ? 'w-full max-w-4xl' : 'flex-1'}>
            {title && (
              <h2 className="font-montserrat text-2xl md:text-4xl font-bold text-[#1A3275] mb-6">
                {title}
              </h2>
            )}
            {content && (
              <div className="prose prose-lg max-w-none">
                <RichText
                  content={content}
                  enableGutter={false}
                  enableProse={false}
                  className="font-montserrat text-gray-700 leading-relaxed [&_p]:mb-4 [&_p]:text-base"
                />
              </div>
            )}
          </div>

          {/* Image / Logo */}
          {image && typeof image === 'object' && (
            <div className={isBottomLayout ? 'w-full max-w-4xl' : 'flex-1 w-full h-full'}>
              <Media
                resource={image}
                imgClassName="w-full h-full object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
