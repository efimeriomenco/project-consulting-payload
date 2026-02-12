import type { Block } from 'payload'

export const PartnersBlock: Block = {
  slug: 'partnersBlock',
  interfaceName: 'PartnersBlockType',
  labels: {
    singular: 'Partners Block',
    plural: 'Partners Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      localized: true,
      required: true,
      defaultValue: 'PARTENERII NOȘTRI',
    },
    {
      name: 'partners',
      type: 'array',
      label: 'Partners',
      minRows: 1,
      labels: {
        singular: 'Partner',
        plural: 'Partners',
      },
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'partnerName',
          type: 'text',
          label: 'Partner Name (for admin reference)',
          admin: {
            description: 'Used to identify this partner in the admin panel',
          },
        },
        {
          name: 'logo',
          type: 'upload',
          label: 'Partner Logo',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
