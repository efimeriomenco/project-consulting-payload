import type { Block } from 'payload'

export const ValuesBlock: Block = {
  slug: 'valuesBlock',
  interfaceName: 'ValuesBlockType',
  labels: {
    singular: 'Values Block',
    plural: 'Values Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      localized: true,
      required: true,
      defaultValue: 'Valorile Noastre',
    },
    {
      name: 'values',
      type: 'array',
      label: 'Values',
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Icon',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
          localized: true,
        },
      ],
    },
  ],
}
