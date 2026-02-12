import type { CollectionConfig, TypedLocale } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { ServicesBlock } from '../../blocks/ServicesBlock/config'
import { PartnersBlock } from '../../blocks/PartnersBlock/config'
import { ReviewsBlock } from '../../blocks/ReviewsBlock/config'
import { ContactBannerBlock } from '../../blocks/ContactBanner/config'
import { ContentCarouselBlock } from '../../blocks/ContentCarouselBlock/config'
import { LatestNewsBlock } from '../../blocks/LatestNewsBlock/config' // Keep for backward compatibility
import { NewsGridBlock } from '../../blocks/NewsGridBlock/config'
import { TeamBlock } from '../../blocks/TeamBlock/config'
import { ValuesBlock } from '../../blocks/ValuesBlock/config'
import { AboutBlock } from '../../blocks/AboutBlock/config'
import { hero } from '@/heros/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, locale }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          locale: locale.code,
        })

        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
      },
    },
    preview: (data, { locale }) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        locale,
      })

      return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      localized: true,
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              localized: true,
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, ServicesBlock, PartnersBlock, ReviewsBlock, ContactBannerBlock, ContentCarouselBlock, LatestNewsBlock, NewsGridBlock, TeamBlock, ValuesBlock, AboutBlock],
              required: true,
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'showFooterContactForm',
      type: 'checkbox',
      label: 'Show Contact Form in Footer',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Enable to display the contact form in the footer on this page',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
}
