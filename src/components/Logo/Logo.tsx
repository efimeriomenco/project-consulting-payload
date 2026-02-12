import React from 'react'
import { Media } from '@/components/Media'
import Link from 'next/link'
import type { Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'

interface LogoProps {
  resource?: MediaType | string | number | null
  href?: string
  className?: string
  size?: 'small' | 'medium' | 'large' | 'xl' | '2xl'
}

const sizeClasses = {
  small: 'h-[32px] sm:h-[40px]',
  medium: 'h-[40px] sm:h-[48px] md:h-[56px]',
  large: 'h-[48px] sm:h-[56px] md:h-[64px] lg:h-[70px]',
  xl: 'h-[56px] sm:h-[64px] md:h-[80px] lg:h-[96px]',
  '2xl': 'h-[72px] sm:h-[80px] md:h-[96px] lg:h-[112px]',
}

export const Logo: React.FC<LogoProps> = ({ 
  resource, 
  href = '/', 
  className = '',
  size = 'large' 
}) => {
  const logoContent = resource && typeof resource === 'object' ? (
    <div className={cn('flex items-center', sizeClasses[size], className)}>
      <Media 
        resource={resource} 
        className="h-full w-auto"
        imgClassName="h-full w-auto object-contain"
      />
    </div>
  ) : (
    <div className={cn('text-white font-bold flex flex-col justify-center', sizeClasses[size], className)}>
    </div>
  )

  return (
    <Link 
      href={href} 
      className="block"
      style={{
        imageRendering: '-webkit-optimize-contrast',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
      }}
    >
      {logoContent}
    </Link>
  )
}
