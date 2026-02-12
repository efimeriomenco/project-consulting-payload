import type { Block } from 'payload'
import { link } from '@/fields/link'

export const ContentCarouselBlock: Block = {
  slug: 'contentCarouselBlock',
  interfaceName: 'ContentCarouselBlockType',
  dbName: 'ccb',
  labels: {
    singular: 'Content Carousel Block',
    plural: 'Content Carousel Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      localized: true,
      required: true,
      defaultValue: 'Ultimele noutăți',
    },
    {
      name: 'contentType',
      type: 'select',
      label: 'Content Type',
      defaultValue: 'posts',
      options: [
        {
          label: 'Posts',
          value: 'posts',
        },
        {
          label: 'Pages',
          value: 'pages',
        },
      ],
      admin: {
        description: 'Select whether to display posts or pages',
      },
    },
    {
      name: 'populateBy',
      type: 'select',
      label: 'Populate By',
      defaultValue: 'collection',
      options: [
        {
          label: 'All Items (Collection)',
          value: 'collection',
        },
        {
          label: 'Individual Selection',
          value: 'selection',
        },
      ],
    },
    {
      name: 'selectedItems',
      type: 'relationship',
      label: 'Select Items',
      relationTo: ['posts', 'pages'],
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
        description: 'Choose which items to display',
      },
    },
    {
      name: 'viewAllLink',
      type: 'group',
      label: 'View All Link',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Button Label',
          localized: true,
          defaultValue: 'Vezi mai mult',
        },
        (() => {
          const linkField = link({
            appearances: false,
            disableLabel: true,
          })
          // Type assertion since we know link() always returns a group field with fields
          const groupField = linkField as typeof linkField & { fields: any[] }
          return {
            ...groupField,
            dbName: 'lnk',
            fields: groupField.fields.map((field: any) => {
              if (field.type === 'row' && field.fields) {
                return {
                  ...field,
                  fields: field.fields.map((f: any) => {
                    if (f.name === 'type') {
                      return { ...f, dbName: 't' }
                    }
                    return f
                  }),
                }
              }
              return field
            }),
          }
        })(),
      ],
    },
    {
      name: 'readMoreLabel',
      type: 'text',
      label: 'Read More Button Label',
      localized: true,
      defaultValue: 'Citește mai mult',
    },
    {
      name: 'itemsLimit',
      type: 'number',
      label: 'Number of Items to Show',
      defaultValue: 12,
      min: 6,
      max: 20,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
    },
  ],
}
