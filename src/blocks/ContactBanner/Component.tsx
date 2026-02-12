'use client'

import React from 'react'
import type { ContactBannerBlockType } from '@/payload-types'
import { Media } from '@/components/Media'
import { PhoneCall, Mail, MapPin } from 'lucide-react'

type Props = ContactBannerBlockType & {
  id?: string
}

export const ContactBannerBlockComponent: React.FC<Props> = ({
  title,
  highlightedText,
  description,
  image,
  contactInfo,
}) => {
  return (
    <section>
      <div 
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0A1628 0%, #0E1F3A 25%, #0A1628 50%, #0E1F3A 75%, #0A1628 100%)',
        }}
      >
        {/* Gradient Overlay Effects */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at left top, rgba(0, 72, 200, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at right bottom, rgba(14, 61, 110, 0.2) 0%, transparent 50%),
              linear-gradient(135deg, transparent 0%, rgba(0, 72, 200, 0.05) 50%, transparent 100%)
            `,
          }}
        />
        
        <div className="relative z-10 py-12 px-8 md:px-12 lg:px-48">
          <div className="container mx-auto flex flex-col items-center text-center xl:text-left xl:flex-row xl:items-center lg:justify-between gap-8">
            {/* Left Content */}
            <div className="xl:max-w-xl">
              {/* Title */}
              {title && (
                <h2 className="font-montserrat text-3xl md:text-3xl lg:text-6xl font-normal text-white mb-1">
                  {title}
                </h2>
              )}
              {highlightedText && (
                <p className="font-montserrat text-3xl md:text-3xl lg:text-6xl font-normal text-[#0048C8] mb-6">
                  {highlightedText}
                </p>
              )}
              
              {/* Description */}
              {description && (
                <p className="font-montserrat text-sm md:text-base text-white/70 xl:max-w-md">
                  {description}
                </p>
              )}
            </div>

            {/* Right - Image */}
            {image && typeof image === 'object' && (
              <div className="rounded-xl p-6 lg:p-8">
                <Media
                  resource={image}
                  imgClassName="w-[660px] h-auto object-contain"
                />
              </div>
            )}
          </div>

          {/* Contact Info */}
          {contactInfo && (contactInfo.address || contactInfo.email || contactInfo.phone) && (
            <div className="flex flex-wrap md:flex-row md:items-center justify-center gap-6 md:gap-16 mt-10 pt-8 container mx-auto">
              {/* Address */}
              {contactInfo.address && (
                contactInfo.addressMapLink ? (
                  <a 
                    href={contactInfo.addressMapLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'linear-gradient(145deg, #1a1a1a 0%, #000000 50%, #0d0d0d 100%)',
                        boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.3)'
                      }}
                    >
                      <MapPin className="w-5 h-5 text-[#0E3D6E]" />
                    </div>
                    <span className="font-montserrat text-sm text-white">{contactInfo.address}</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'linear-gradient(145deg, #1a1a1a 0%, #000000 50%, #0d0d0d 100%)',
                        boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.3)'
                      }}
                    >
                      <MapPin className="w-5 h-5 text-[#0E3D6E]" />
                    </div>
                    <span className="font-montserrat text-sm text-white">{contactInfo.address}</span>
                  </div>
                )
              )}

              {/* Email */}
              {contactInfo.email && (
                <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(145deg, #1a1a1a 0%, #000000 50%, #0d0d0d 100%)',
                      boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    <Mail className="w-5 h-5 text-[#0E3D6E]" />
                  </div>
                  <span className="font-montserrat text-sm text-white">{contactInfo.email}</span>
                </a>
              )}

              {/* Phone */}
              {contactInfo.phone && (
                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(145deg, #1a1a1a 0%, #000000 50%, #0d0d0d 100%)',
                      boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    <PhoneCall className="w-5 h-5 text-[#0E3D6E]" />
                  </div>
                  <span className="font-montserrat text-sm text-white">{contactInfo.phone}</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
