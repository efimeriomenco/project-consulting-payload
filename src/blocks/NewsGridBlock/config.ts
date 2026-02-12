import type { Block } from 'payload'

export const NewsGridBlock: Block = {
  slug: 'newsGridBlock',
  interfaceName: 'NewsGridBlockType',
  labels: {
    singular: 'News Grid Block',
    plural: 'News Grid Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title (optional)',
      localized: true,
    },
    {
      name: 'readMoreLabel',
      type: 'text',
      label: 'Read More Button Label',
      localized: true,
      defaultValue: 'Citește mai mult',
    },
    {
      name: 'populateBy',
      type: 'select',
      label: 'Populate By',
      defaultValue: 'collection',
      options: [
        {
          label: 'All Posts (Collection)',
          value: 'collection',
        },
        {
          label: 'Individual Selection',
          value: 'selection',
        },
      ],
    },
    {
      name: 'selectedPosts',
      type: 'relationship',
      label: 'Select Posts',
      relationTo: 'posts',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
        description: 'Choose which posts to display in this grid',
      },
    },
    {
      name: 'postsPerPage',
      type: 'number',
      label: 'Posts Per Page',
      defaultValue: 6,
      min: 2,
      max: 24,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
    },
    {
      name: 'columns',
      type: 'select',
      label: 'Grid Columns',
      defaultValue: '2',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
    {
      name: 'showPagination',
      type: 'checkbox',
      label: 'Show Pagination',
      defaultValue: true,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
    },
  ],
}
