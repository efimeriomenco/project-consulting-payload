import type { Block } from 'payload'

export const ReviewsBlock: Block = {
  slug: 'reviewsBlock',
  interfaceName: 'ReviewsBlockType',
  labels: {
    singular: 'Reviews Block',
    plural: 'Reviews Blocks',
  },
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      localized: true,
      defaultValue: 'CLIENȚI FEEDBACK',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      localized: true,
      required: true,
      defaultValue: 'Recenziile clienților',
    },
    {
      name: 'reviews',
      type: 'array',
      label: 'Reviews',
      minRows: 1,
      labels: {
        singular: 'Review',
        plural: 'Reviews',
      },
      fields: [
        {
          name: 'reviewText',
          type: 'textarea',
          label: 'Review Text',
          localized: true,
          required: true,
        },
        {
          name: 'rating',
          type: 'number',
          label: 'Rating (1-5 stars)',
          min: 1,
          max: 5,
          defaultValue: 5,
          required: true,
        },
        {
          name: 'clientName',
          type: 'text',
          label: 'Client Name',
          required: true,
        },
        {
          name: 'clientRole',
          type: 'text',
          label: 'Client Role/Position',
          localized: true,
        },
      ],
    },
  ],
}
