import React from 'react'
import type { Page } from '@/payload-types'

type Props = Page['hero']

export const PageHeader: React.FC<Props> = ({ pageHeaderTitle }) => {
  if (!pageHeaderTitle) return null

  return (
    <section 
      className="w-full py-16 md:py-24 lg:py-32 flex items-center justify-center bg-[#202f4a]"
    >
      <div className="container mx-auto px-8 md:px-16 lg:px-24 text-center">
        <h1 className="font-montserrat text-4xl md:text-5xl lg:text-5xl font-semibold text-white">
          {pageHeaderTitle}
        </h1>
      </div>
    </section>
  )
}
