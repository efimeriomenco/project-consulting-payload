import type { Block } from 'payload'

export const ContactBannerBlock: Block = {
  slug: 'contactBanner',
  interfaceName: 'ContactBannerBlockType',
  labels: {
    singular: 'Contact Banner',
    plural: 'Contact Banners',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      localized: true,
      required: true,
      defaultValue: 'Contactează echipa',
    },
    {
      name: 'highlightedText',
      type: 'text',
      label: 'Highlighted Text (colored)',
      localized: true,
      defaultValue: 'Project Consulting',
      admin: {
        description: 'This text will be displayed in a different color below the title',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Image',
      relationTo: 'media',
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'address',
          type: 'text',
          label: 'Address',
          localized: true,
        },
        {
          name: 'addressMapLink',
          type: 'text',
          label: 'Google Maps Link',
          admin: {
            description: 'Paste a Google Maps link here. When users click on the address, it will open this link in a new window.',
          },
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
        },
      ],
    },
  ],
}
