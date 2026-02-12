import type { Block } from 'payload'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      localized: true,
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      localized: true,
    },
    {
      name: 'primaryButton',
      type: 'group',
      label: 'Primary Button',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Button Text',
          localized: true,
          defaultValue: 'Programează consultație',
        },
        {
          name: 'form',
          type: 'relationship',
          relationTo: 'forms',
          label: 'Form (opens as popup)',
        },
      ],
    },
    {
      name: 'secondaryButton',
      type: 'group',
      label: 'Secondary Button',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Button Text',
          localized: true,
          defaultValue: 'Contactează-ne',
        },
        {
          name: 'form',
          type: 'relationship',
          relationTo: 'forms',
          label: 'Form (opens as popup)',
        },
      ],
    },
  ],
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
}
