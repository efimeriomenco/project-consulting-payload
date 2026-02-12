'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'

export const WithImage: React.FC<Page['hero']> = ({ title, description, backgroundImage }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div 
      className="relative -mt-[10.4rem] flex items-end text-white min-h-[80vh]" 
      data-theme="dark"
    >
      {/* Background Image */}
      {backgroundImage && typeof backgroundImage === 'object' && (
        <React.Fragment>
          <Media fill imgClassName="-z-10 object-cover" priority resource={backgroundImage} />
          {/* Left to right gradient */}
          <div className="absolute pointer-events-none left-0 top-0 w-full h-full bg-gradient-to-r from-black via-black/50 to-transparent" />
          {/* Bottom to top gradient */}
          <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
        </React.Fragment>
      )}

      {/* Content Overlay */}
      <div className="container mb-8 z-10 relative">
        <div className="max-w-[34rem]">
          {title && (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-lg md:text-xl text-white/90">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
