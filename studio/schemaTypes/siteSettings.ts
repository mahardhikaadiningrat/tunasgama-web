import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'schoolName',
      title: 'School Name',
      type: 'string',
      initialValue: 'Tunas Gama School',
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Menu',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Menu Label', type: 'string' },
            { name: 'url', title: 'URL Path (contoh: /about-us)', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { name: 'address', title: 'Address', type: 'text' },
        { name: 'phone', title: 'Phone / WhatsApp', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'googleMapsEmbed', title: 'Google Maps Embed URL', type: 'url' },
      ],
    }),
    defineField({
      name: 'copyrightText',
      title: 'Footer Copyright Text',
      type: 'string',
      initialValue: '© 2026 Tunas Gama School. All Rights Reserved.',
    }),
  ],
})