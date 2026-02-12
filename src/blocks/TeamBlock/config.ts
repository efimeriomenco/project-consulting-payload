import type { Block } from 'payload'

export const TeamBlock: Block = {
  slug: 'teamBlock',
  interfaceName: 'TeamBlockType',
  labels: {
    singular: 'Team Block',
    plural: 'Team Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      localized: true,
      required: true,
      defaultValue: 'Echipa Noastră',
    },
    {
      name: 'members',
      type: 'array',
      label: 'Team Members',
      minRows: 1,
      fields: [
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Photo',
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Name',
          localized: true,
        },
        {
          name: 'role',
          type: 'text',
          required: true,
          label: 'Role',
          localized: true,
        },
      ],
    },
  ],
}
