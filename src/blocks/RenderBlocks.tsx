import { cn } from '@/utilities/ui'
import React, { Fragment, Suspense } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ServicesBlockComponent } from '@/blocks/ServicesBlock/Component'
import { PartnersBlockComponent } from '@/blocks/PartnersBlock/Component'
import { ReviewsBlockComponent } from '@/blocks/ReviewsBlock/Component'
import { ContactBannerBlockComponent } from '@/blocks/ContactBanner/Component'
import { ContentCarouselBlockComponent } from '@/blocks/ContentCarouselBlock/Component'
import { NewsGridBlockComponent } from '@/blocks/NewsGridBlock/Component'
import { TeamBlockComponent } from '@/blocks/TeamBlock/Component'
import { ValuesBlockComponent } from '@/blocks/ValuesBlock/Component'
import { AboutBlockComponent } from '@/blocks/AboutBlock/Component'
import { TypedLocale } from 'payload'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  servicesBlock: ServicesBlockComponent,
  partnersBlock: PartnersBlockComponent,
  reviewsBlock: ReviewsBlockComponent,
  contactBanner: ContactBannerBlockComponent,
  contentCarouselBlock: ContentCarouselBlockComponent,
  latestNewsBlock: ContentCarouselBlockComponent, // Keep for backward compatibility
  newsGridBlock: NewsGridBlockComponent,
  teamBlock: TeamBlockComponent,
  valuesBlock: ValuesBlockComponent,
  aboutBlock: AboutBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  locale: TypedLocale
}> = (props) => {
  const { blocks, locale } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              // Wrap NewsGridBlock in Suspense since it uses useSearchParams()
              if (blockType === 'newsGridBlock') {
                return (
                  <div className="my-16" key={index}>
                    <Suspense fallback={<div className="container mx-auto">Loading...</div>}>
                      {/* @ts-expect-error */}
                      <Block {...block} locale={locale} />
                    </Suspense>
                  </div>
                )
              }

              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error */}
                  <Block {...block} locale={locale} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
