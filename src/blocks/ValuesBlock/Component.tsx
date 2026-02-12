'use client'

import React from 'react'
import type { ValuesBlockType } from '@/payload-types'
import { Media } from '@/components/Media'

type Props = ValuesBlockType & {
  id?: string
}

export const ValuesBlockComponent: React.FC<Props> = ({ title, values }) => {
  if (!values || values.length === 0) return null

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        {title && (
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-center text-[#051229] mb-12">
            {title}
          </h2>
        )}

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center p-6 border border-dashed border-gray-300 rounded-lg hover:border-[#1A3275] hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              {value.icon && typeof value.icon === 'object' && (
                <div className="w-20 h-20 mb-6 relative">
                  <Media
                    resource={value.icon}
                    imgClassName="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Title */}
              <h3 className="font-montserrat text-lg font-bold text-[#051229] mb-3">
                {value.title}
              </h3>

              {/* Description */}
              <p className="font-montserrat text-sm text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
