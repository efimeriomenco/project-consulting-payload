import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      admin: {
        description: 'Upload the logo image for the header',
      },
    },
    {
      name: 'tabIcon',
      type: 'upload',
      relationTo: 'media',
      label: 'Tab Icon',
      admin: {
        description: 'Upload the tab icon (favicon) that appears in browser tabs. Recommended size: 32x32px or 16x16px.',
      },
    },
    {
      name: 'menuLabel',
      type: 'text',
      label: 'Menu Label',
      localized: true,
      defaultValue: 'Meniu',
      admin: {
        description: 'The text displayed on the menu button (e.g., "Meniu", "Menu", "Меню")',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Menu Items',
      defaultValue: [],
      admin: {
        description: 'Add navigation items with optional submenu items. Select "Internal link" to choose an existing page, or "Custom URL" for external links. The "Label" field allows you to set a custom menu name independent of the page title.',
        initCollapsed: false,
        components: {
          RowLabel: '@/globals/Header/NavItemRowLabel',
        },
      },
      fields: [
        link({
          appearances: false,
          disableLabel: false,
          overrides: {
            admin: {
              description: 'Choose link type: "Internal link" to select an existing page, "Custom URL" for external links, or "Phone" for phone numbers. The Label field sets the display text in the menu (can be different from page title).',
            },
          },
        }),
        {
          name: 'subItems',
          type: 'array',
          label: 'Sub Menu Items (Dropdown)',
          admin: {
            description: 'Add submenu items that appear in a dropdown. Each item can link to a page with a custom label.',
            initCollapsed: true,
            components: {
              RowLabel: '@/globals/Header/NavItemRowLabel',
            },
          },
          fields: [
            link({
              appearances: false,
              disableLabel: false,
              overrides: {
                admin: {
                  description: 'Select a page or enter a custom URL. The Label field sets the display text (can differ from page title).',
                },
              },
            }),
          ],
        },
      ],
      maxRows: 15,
    },
    {
      name: 'button',
      type: 'group',
      label: 'CTA Button',
      admin: {
        description: 'Call-to-action button displayed on the right side of the header (e.g., "SUNĂ ACUM!", "CALL NOW!")',
      },
      fields: [
        link({
          appearances: false,
          disableLabel: false,
        }),
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
