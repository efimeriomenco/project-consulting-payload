import type { Block } from 'payload'

export const ServicesBlock: Block = {
  slug: 'servicesBlock',
  interfaceName: 'ServicesBlockType',
  labels: {
    singular: 'Services Block',
    plural: 'Services Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      localized: true,
      required: true,
      defaultValue: 'SERVICIILE NOASTRE',
    },
    {
      name: 'categories',
      type: 'array',
      label: 'Categories',
      admin: {
        description: 'Add categories with their services',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Category Name',
          localized: true,
          required: true,
        },
        {
          name: 'services',
          type: 'array',
          label: 'Services',
          minRows: 1,
          fields: [
            {
              name: 'backgroundImage',
              type: 'upload',
              label: 'Background Image',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              label: 'Service Title',
              localized: true,
              required: true,
            },
            {
              name: 'buttonText',
              type: 'text',
              label: 'Button Text',
              localized: true,
              defaultValue: 'Programează consultație',
            },
            {
              name: 'link',
              type: 'text',
              label: 'Button Link (optional)',
              admin: {
                description: 'URL to navigate to when button is clicked',
              },
            },
            {
              name: 'form',
              type: 'relationship',
              relationTo: 'forms',
              label: 'Contact Form (optional)',
              admin: {
                description: 'If set, clicking the button will open this form in a popup',
              },
            },
          ],
        },
      ],
    },
  ],
}
