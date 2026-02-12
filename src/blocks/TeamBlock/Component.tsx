'use client'

import React from 'react'
import type { TeamBlockType } from '@/payload-types'
import { Media } from '@/components/Media'

type Props = TeamBlockType & {
  id?: string
}

export const TeamBlockComponent: React.FC<Props> = ({ title, members }) => {
  if (!members || members.length === 0) return null

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        {title && (
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-center text-[#051229] mb-12">
            {title}
          </h2>
        )}

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg aspect-[4/5] cursor-pointer"
            >
              {/* Photo */}
              {member.photo && typeof member.photo === 'object' ? (
                <Media
                  resource={member.photo}
                  imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  fill
                />
              ) : (
                <div className="w-full h-full "                       style={{
                    background: 'linear-gradient(to top, #051229 10%, #051229 10%, transparent 140%)'
                  }} />
              )}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-montserrat text-xl font-semibold text-white mb-1">
                  {member.name}
                </h3>
                <p className="font-montserrat text-sm text-white/80">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
