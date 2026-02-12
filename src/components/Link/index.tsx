import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { Link as i18nLink } from '@/i18n/routing'
import React from 'react'

import type { Page, Post } from '@/payload-types'
import NextLink from 'next/link'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  phone?: string | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | 'phone' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    phone,
    reference,
    size: sizeFromProps,
    url,
  } = props

  let href: string | null = null

  if (type === 'phone' && phone) {
    // Format phone number as tel: link
    href = `tel:${phone.replace(/\s+/g, '').replace(/[^\d+]/g, '')}`
  } else if (type === 'reference' && typeof reference?.value === 'object' && reference.value.slug) {
    href = `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
  } else if (type === 'custom' && url) {
    // If custom URL is already a tel: or mailto: link, use it as-is
    // Otherwise, treat it as a regular URL
    href = url
  } else if (url) {
    // Fallback for backward compatibility
    href = url
  }

  if (!href) return null

  // Check if it's a protocol link (tel:, mailto:, http:, https:)
  const isProtocolLink = /^(tel:|mailto:|http:|https:)/i.test(href)
  const isAdminLink = href.startsWith('/admin')

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  // For protocol links (tel:, mailto:) or admin links, use regular <a> tag
  if (isProtocolLink || isAdminLink) {
    if (appearance === 'inline') {
      return (
        <a className={cn(className)} href={href} {...newTabProps}>
          {label && label}
          {children && children}
        </a>
      )
    }

    return (
      <Button asChild className={className} size={size} variant={appearance}>
        <a className={cn(className)} href={href} {...newTabProps}>
          {label && label}
          {children && children}
        </a>
      </Button>
    )
  }

  // For internal links, use Next.js Link
  const Link = isAdminLink ? NextLink : i18nLink

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
