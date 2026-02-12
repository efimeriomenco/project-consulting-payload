import React from 'react'

import type { Page } from '@/payload-types'

import { WithImage } from '@/heros/WithImage'
import { BannerSlider } from '@/heros/BannerSlider'
import { PageHeader } from '@/heros/PageHeader'

const heroes = {
  withImage: WithImage,
  bannerSlider: BannerSlider,
  pageHeader: PageHeader,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type as keyof typeof heroes]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
