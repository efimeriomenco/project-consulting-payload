'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useParams } from 'next/navigation'
import React, { useEffect, useState, useTransition } from 'react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'
import { useLocale } from 'next-intl'
import localization from '@/i18n/localization'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { TypedLocale } from 'payload'
import { usePathname, useRouter } from '@/i18n/routing'
import { Globe, Menu, X, ChevronRight, ChevronDown } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { Logo } from '@/components/Logo/Logo'
import { Button } from '@/components/ui/button'
import { CMSLink } from '@/components/Link'

interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [showFixedHeader, setShowFixedHeader] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  const NAVBAR_HEIGHT = 100

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Track scroll position to show/hide fixed header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setShowFixedHeader(currentScrollY > NAVBAR_HEIGHT)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const navItems = header?.navItems || []
  const logo = header?.logo
  const menuLabel = header?.menuLabel || 'Meniu'
  const button = header?.button

  // Desktop Header Content
  const desktopHeaderContent = (
    <div className="container hidden lg:flex items-center py-4 lg:py-0 relative h-full">
      {/* Left: Menu with Icon and Text */}
      <div className="flex items-center z-10 flex-1" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
        <HeaderNav navItems={navItems} menuLabel={menuLabel} />
      </div>

      {/* Center: Logo */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center"
        style={{ 
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          transform: 'translate3d(-50%, 0, 0)',
        }}
      >
        <Logo resource={logo} size="large" />
      </div>

      {/* Right: Button + Language Selector */}
      <div className="flex items-center gap-3 z-10" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
        {button?.link && (
          <Button
            asChild
            className="bg-accent-foreground hover:bg-primary/90 text-white font-montserrat px-8 py-3 rounded-lg"
          >
            <CMSLink {...button.link} />
          </Button>
        )}
        <LocaleSwitcher />
      </div>
    </div>
  )

  // Mobile Header Content
  const mobileHeaderContent = (
    <div className="container flex lg:hidden items-center justify-between py-4 relative h-full">
      {/* Left: Hamburger Menu */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 z-10"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[350px] sm:w-[350px] bg-[#051229] border-r-0 p-0">
          <SheetHeader className="p-6 border-b border-white/10">
            <SheetTitle className="text-white font-montserrat text-left">
              {menuLabel}
            </SheetTitle>
          </SheetHeader>
          
          {/* Mobile Navigation */}
          <nav className="flex flex-col p-4">
            {navItems && navItems.length > 0 && navItems.map((item, i) => {
              const { link, subItems } = item
              const hasSubItems = subItems && Array.isArray(subItems) && subItems.length > 0

              if (hasSubItems) {
                return (
                  <MobileNavItemWithSub key={i} item={item} onClose={() => setMobileMenuOpen(false)} />
                )
              }

              return (
                <div key={i} onClick={() => setMobileMenuOpen(false)}>
                  <CMSLink
                    {...link}
                    label={null}
                    className="flex items-center justify-between py-4 px-2 text-white font-montserrat text-lg border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <span>{link?.label}</span>
                    <ChevronRight className="h-5 w-5 text-white/50" />
                  </CMSLink>
                </div>
              )
            })}
          </nav>

          {/* Mobile CTA Button */}
          {button?.link && (
            <div className="p-6 mt-auto" onClick={() => setMobileMenuOpen(false)}>
              <Button
                asChild
                className="w-full bg-accent-foreground hover:bg-primary/90 text-white font-montserrat py-6"
              >
                <CMSLink {...button.link} />
              </Button>
            </div>
          )}

          {/* Mobile Language Selector */}
          <div className="p-6 border-t border-white/10">
            <MobileLocaleSwitcher />
          </div>
        </SheetContent>
      </Sheet>

      {/* Center: Logo */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10">
        <Logo resource={logo} size="medium" />
      </div>

      {/* Right: Language Selector */}
      <div className="z-10">
        <LocaleSwitcher />
      </div>
    </div>
  )

  return (
    <>
      {/* Sticky Header - always in document flow */}
      <header
        className="sticky top-0 left-0 right-0 z-40 w-full h-[70px] lg:h-[100px] text-white bg-black"
        style={{
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
        {...(theme ? { 'data-theme': theme } : {})}
      >
        {desktopHeaderContent}
        {mobileHeaderContent}
      </header>

      {/* Fixed Header - appears after scrolling past navbar height */}
      <header
        className="fixed top-0 left-0 right-0 z-50 w-full h-[70px] lg:h-[100px] text-white"
        style={{
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease, filter 0.5s ease',
          transform: showFixedHeader ? 'translateY(0)' : 'translateY(-100%)',
          opacity: showFixedHeader ? 1 : 0,
          filter: showFixedHeader ? 'blur(0px)' : 'blur(8px)',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          boxShadow: showFixedHeader ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none',
          backdropFilter: 'blur(10px)',
        }}
        {...(theme ? { 'data-theme': theme } : {})}
      >
        {desktopHeaderContent}
        {mobileHeaderContent}
      </header>
    </>
  )
}

// Mobile Nav Item with Subitems
function MobileNavItemWithSub({ 
  item, 
  onClose 
}: { 
  item: NonNullable<Header['navItems']>[number]
  onClose: () => void 
}) {
  const [isOpen, setIsOpen] = useState(false)
  const { link, subItems } = item

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 px-2 text-white font-montserrat text-lg hover:bg-white/5 transition-colors"
      >
        {link?.label}
        <ChevronRight 
          className={cn(
            "h-5 w-5 text-white/50 transition-transform duration-200",
            isOpen && "rotate-90"
          )} 
        />
      </button>
      
      {isOpen && subItems && (
        <div className="pl-4 pb-2">
          {subItems.map(({ link: subLink }, subIndex) => (
            <div key={subIndex} onClick={onClose}>
              <CMSLink
                {...subLink}
                label={null}
                className="flex items-center py-3 px-2 text-white/80 font-montserrat text-base hover:text-white hover:bg-white/5 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-accent-foreground mr-3" />
                <span>{subLink?.label}</span>
              </CMSLink>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function LocaleSwitcher() {
  // inspired by https://github.com/amannn/next-intl/blob/main/examples/example-app-router/src/components/LocaleSwitcherSelect.tsx
  const locale = useLocale()
  const router = useRouter()
  const [, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()
  const [isOpen, setIsOpen] = useState(false)

  function onSelectChange(value: TypedLocale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: value },
      )
    })
    setIsOpen(false)
  }

  return (
    <div className="group relative hidden lg:flex items-center gap-3 lg:gap-6">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-white hover:text-white hover:!bg-transparent focus:!bg-transparent active:!bg-transparent border-none focus:ring-0 focus:outline-none focus:ring-offset-0 [&[data-state=open]]:!bg-transparent [&[data-state=open]]:border-none px-0"
          >
            <Globe className="h-7 w-7 flex-shrink-0" />
            <ChevronDown 
              className={cn(
                "h-4 w-4 flex-shrink-0 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="min-w-[150px] bg-white text-black rounded-lg p-2 space-y-1 z-50"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {localization.locales
            .sort((a, b) => a.label.localeCompare(b.label))
            .map((loc) => (
              <DropdownMenuItem
                key={loc.code}
                onClick={() => onSelectChange(loc.code as TypedLocale)}
                className={cn(
                  "cursor-pointer font-medium hover:bg-accent-foreground hover:text-white focus:hover:bg-accent-foreground focus:text-white",
                  locale === loc.code && "bg-accent-foreground text-white"
                )}
              >
                {loc.label}
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function MobileLocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const [, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()

  function onSelectChange(value: TypedLocale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error
        { pathname, params },
        { locale: value },
      )
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-white/60 text-sm font-montserrat mb-2">Language</span>
      <div className="flex gap-2">
        {localization.locales
          .sort((a, b) => a.label.localeCompare(b.label))
          .map((loc) => (
            <button
              key={loc.code}
              onClick={() => onSelectChange(loc.code as TypedLocale)}
              className={cn(
                "px-4 py-2 rounded-lg font-montserrat text-sm transition-colors cursor-pointer",
                locale === loc.code
                  ? "bg-accent-foreground text-white"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
              )}
            >
              {loc.label}
            </button>
          ))}
      </div>
    </div>
  )
}





