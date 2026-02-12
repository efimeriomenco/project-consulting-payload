'use client'

import React, { useState, useRef, useCallback } from 'react'
import { Link } from '@/i18n/routing'
import { usePathname } from '@/i18n/routing'
import { ChevronDown } from 'lucide-react'

import type { Header as HeaderType } from '@/payload-types'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

type NavItems = HeaderType['navItems']

const MenuIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 46 38" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M20.4541 24.5536C20.4541 23.5068 19.957 22.5034 19.0711 21.7644C18.1869 21.024 16.9864 20.6085 15.734 20.6085C12.6092 20.6085 7.84495 20.6085 4.72019 20.6085C3.46776 20.6085 2.26726 21.024 1.38301 21.7644C0.49719 22.5034 0 23.5068 0 24.5536V33.7589C0 34.8057 0.49719 35.8091 1.38301 36.5482C2.26726 37.2885 3.46776 37.7041 4.72019 37.7041H15.734C16.9864 37.7041 18.1869 37.2885 19.0711 36.5482C19.957 35.8091 20.4541 34.8057 20.4541 33.7589V24.5536ZM44.0551 24.5536C44.0551 23.5068 43.5579 22.5034 42.6721 21.7644C41.7878 21.024 40.5873 20.6085 39.3349 20.6085C36.2101 20.6085 31.4459 20.6085 28.3211 20.6085C27.0687 20.6085 25.8682 21.024 24.984 21.7644C24.0981 22.5034 23.6009 23.5068 23.6009 24.5536V33.7589C23.6009 34.8057 24.0981 35.8091 24.984 36.5482C25.8682 37.2885 27.0687 37.7041 28.3211 37.7041H39.3349C40.5873 37.7041 41.7878 37.2885 42.6721 36.5482C43.5579 35.8091 44.0551 34.8057 44.0551 33.7589V24.5536ZM17.3074 24.5536V33.7589C17.3074 34.1074 17.1422 34.4428 16.8464 34.6887C16.5521 34.9359 16.1509 35.074 15.734 35.074H4.72019C4.30324 35.074 3.90202 34.9359 3.6078 34.6887C3.312 34.4428 3.14679 34.1074 3.14679 33.7589V24.5536C3.14679 24.2051 3.312 23.8698 3.6078 23.6239C3.90202 23.3766 4.30324 23.2386 4.72019 23.2386H15.734C16.1509 23.2386 16.5521 23.3766 16.8464 23.6239C17.1422 23.8698 17.3074 24.2051 17.3074 24.5536ZM40.9083 24.5536V33.7589C40.9083 34.1074 40.7431 34.4428 40.4473 34.6887C40.1531 34.9359 39.7519 35.074 39.3349 35.074H28.3211C27.9042 35.074 27.503 34.9359 27.2087 34.6887C26.9129 34.4428 26.7477 34.1074 26.7477 33.7589V24.5536C26.7477 24.2051 26.9129 23.8698 27.2087 23.6239C27.503 23.3766 27.9042 23.2386 28.3211 23.2386H39.3349C39.7519 23.2386 40.1531 23.3766 40.4473 23.6239C40.7431 23.8698 40.9083 24.2051 40.9083 24.5536ZM37.1652 17.7061L43.7294 12.2198C45.5718 10.6798 45.5718 8.18124 43.7294 6.64132L37.1652 1.15494C35.3227 -0.384981 32.3333 -0.384981 30.4908 1.15494L23.9266 6.64132C22.0842 8.18124 22.0842 10.6798 23.9266 12.2198L30.4908 17.7061C32.3333 19.2461 35.3227 19.2461 37.1652 17.7061ZM20.4541 4.82787C20.4541 3.78109 19.957 2.77771 19.0711 2.03865C18.1869 1.29828 16.9864 0.882726 15.734 0.882726C12.6092 0.882726 7.84495 0.882726 4.72019 0.882726C3.46776 0.882726 2.26726 1.29828 1.38301 2.03865C0.49719 2.77771 0 3.78109 0 4.82787V14.0332C0 15.08 0.49719 16.0834 1.38301 16.8224C2.26726 17.5628 3.46776 17.9784 4.72019 17.9784H15.734C16.9864 17.9784 18.1869 17.5628 19.0711 16.8224C19.957 16.0834 20.4541 15.08 20.4541 14.0332V4.82787ZM41.5046 10.3603L34.9404 15.8467C34.3268 16.3595 33.3292 16.3595 32.7156 15.8467L26.1514 10.3603C25.5378 9.84741 25.5378 9.01367 26.1514 8.5008L32.7156 3.01442C33.3292 2.50155 34.3268 2.50155 34.9404 3.01442L41.5046 8.5008C42.1182 9.01367 42.1182 9.84741 41.5046 10.3603ZM17.3074 4.82787V14.0332C17.3074 14.3817 17.1422 14.717 16.8464 14.963C16.5521 15.2102 16.1509 15.3483 15.734 15.3483H4.72019C4.30324 15.3483 3.90202 15.2102 3.6078 14.963C3.312 14.717 3.14679 14.3817 3.14679 14.0332V4.82787C3.14679 4.47938 3.312 4.14405 3.6078 3.89813C3.90202 3.6509 4.30324 3.51282 4.72019 3.51282H15.734C16.1509 3.51282 16.5521 3.6509 16.8464 3.89813C17.1422 4.14405 17.3074 4.47938 17.3074 4.82787Z" fill="#F7F7F7" />
  </svg>
)

// Helper to get the href from a link object
function getLinkHref(link: NonNullable<NavItems>[number]['link']): string {
  if (!link) return '#'

  if (link.type === 'reference' && link.reference) {
    const { relationTo, value } = link.reference
    if (typeof value === 'object' && value?.slug) {
      return relationTo === 'pages' ? `/${value.slug}` : `/${relationTo}/${value.slug}`
    }
  }

  if (link.type === 'custom' && link.url) {
    return link.url
  }

  if (link.type === 'phone' && link.phone) {
    return `tel:${link.phone.replace(/\s+/g, '').replace(/[^\d+]/g, '')}`
  }

  return '#'
}

// Expandable menu item with subitems (accordion style)
const ExpandableMenuItem: React.FC<{
  link: NonNullable<NavItems>[number]['link']
  subItems: NonNullable<NavItems>[number]['subItems']
  isParentActive: boolean
  isLinkActive: (href: string) => boolean
}> = ({ link, subItems, isParentActive, isLinkActive }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div>
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex items-center justify-start gap-2 w-full px-2 py-1.5 text-sm rounded-lg cursor-pointer font-medium bg-white text-black hover:bg-accent-foreground hover:text-white transition-colors",
          (isExpanded || isParentActive) && "bg-accent-foreground text-white"
        )}
      >
        <ChevronDown
          className={cn(
            "h-4 w-4 flex-shrink-0 transition-transform duration-200",
            isExpanded && "-rotate-180"
          )}
        />
        <span>{link?.label}</span>
      </Button>

      {/* Subitems - expands inside container */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-200 rounded-lg",
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="pl-8 pt-1 space-y-1">
          {subItems?.map(({ link: subLink }, subIndex) => {
            const subHref = getLinkHref(subLink)
            const isSubActive = isLinkActive(subHref)
            return (
              <Link
                key={subIndex}
                href={subHref}
                className={cn(
                  "block px-2 py-1.5 text-sm rounded-lg cursor-pointer hover:bg-accent-foreground hover:text-white transition-colors",
                  isSubActive && "bg-accent-foreground text-white"
                )}
              >
                {subLink?.label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const HeaderNav: React.FC<{ navItems?: NavItems; menuLabel?: string | null }> = ({
  navItems = [],
  menuLabel = 'Meniu'
}) => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsOpen(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 100)
  }, [])

  if (navItems && navItems.length === 0) {
    return null
  }

  // Check if a link is active
  const isLinkActive = (href: string): boolean => {
    if (href === '#') return false
    // Handle home page
    if (href === '/' && pathname === '/') return true
    // For other pages, check if pathname starts with href (but not just /)
    if (href !== '/' && pathname.startsWith(href)) return true
    return false
  }

  // Check if any subitem is active (to highlight parent)
  const hasActiveSubItem = (subItems: NonNullable<NavItems>[number]['subItems']): boolean => {
    if (!subItems) return false
    return subItems.some(({ link: subLink }) => isLinkActive(getLinkHref(subLink)))
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-flex items-center gap-4 group cursor-pointer"
      >
        <MenuIcon className="h-10 w-10 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
        <DropdownMenuTrigger asChild>
          <Button
            className="flex items-start text-white hover:text-white hover:!bg-transparent focus:!bg-transparent active:!bg-transparent relative overflow-visible border-none focus:ring-0 focus:outline-none focus:ring-offset-0 [&[data-state=open]]:!bg-transparent [&[data-state=open]]:border-none px-0"
            variant="ghost"
          >
            <span className="text-xl font-semibold leading-tight relative">
              {menuLabel}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-[width] duration-300 ease-out group-hover:w-full"></span>
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="min-w-[200px] bg-white text-black rounded-lg p-2 space-y-1"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {navItems && navItems.length > 0 && navItems.map((item, i) => {
            const { link, subItems } = item
            const hasSubItems = subItems && Array.isArray(subItems) && subItems.length > 0
            const itemHref = getLinkHref(link)
            const isActive = isLinkActive(itemHref)
            const isParentActive = hasSubItems && hasActiveSubItem(subItems)

            if (hasSubItems) {
              return (
                <ExpandableMenuItem
                  key={i}
                  link={link}
                  subItems={subItems}
                  isParentActive={!!isParentActive}
                  isLinkActive={isLinkActive}
                />
              )
            }

            return (
              <DropdownMenuItem
                key={i}
                asChild
                className={cn(
                  "cursor-pointer font-medium hover:bg-accent-foreground hover:text-white focus:hover:bg-accent-foreground focus:text-white",
                  isActive && "hover:bg-accent-foreground text-black"
                )}
              >
                <Link href={itemHref} className="w-full">
                  {link?.label}
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  )
}
