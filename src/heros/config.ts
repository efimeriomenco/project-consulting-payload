import type { Field } from 'payload'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'withImage',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'With Image',
          value: 'withImage',
        },
        {
          label: 'Banner Slider',
          value: 'bannerSlider',
        },
        {
          label: 'Page Header',
          value: 'pageHeader',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
      ],
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      localized: true,
      required: true,
      admin: {
        condition: (_, { type } = {}) => type === 'withImage',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'withImage',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      label: 'Background Image',
      relationTo: 'media',
      admin: {
        condition: (_, { type } = {}) => type === 'withImage',
      },
    },
    // Banner Slider fields
    {
      name: 'banners',
      type: 'array',
      label: 'Banners',
      minRows: 1,
      maxRows: 10,
      admin: {
        condition: (_, { type } = {}) => type === 'bannerSlider',
        description: 'Add banners for the slider. Each banner has a background image, title, and description.',
      },
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
          name: 'buttonText',
          type: 'text',
          label: 'Button Text',
          localized: true,
          admin: {
            description: 'Text for the CTA button (e.g., "Programează o consultanță")',
          },
        },
        {
          name: 'form',
          type: 'relationship',
          relationTo: 'forms',
          label: 'Contact Form',
          admin: {
            description: 'Select the form to display when button is clicked',
          },
        },
      ],
    },
    // Page Header fields
    {
      name: 'pageHeaderTitle',
      type: 'text',
      label: 'Page Title',
      localized: true,
      required: true,
      admin: {
        condition: (_, { type } = {}) => type === 'pageHeader',
        description: 'The main title displayed in the page header',
      },
    },
  ],
  label: false,
}
