import { defineField, defineType } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: async (slug, context) => {
          const { document, getClient } = context;
          if (!document?.language) return true;
          const client = getClient({ apiVersion: '2024-01-01' });
          const id = document._id.replace(/^drafts\./, '');
          const params = {
            draft: `drafts.${id}`,
            published: id,
            language: document.language,
            slug,
          };
          const query = `!defined(*[_type == "page" && language == $language && slug.current == $slug && !(_id in [$draft, $published])][0]._id)`;
          return await client.fetch(query, params);
        },
      },
      description: 'Gunakan "home" untuk halaman beranda, "about-us", "programs", "health-and-safety", "contacts".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero / Welcome Message',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Banner Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'sections',
      title: 'Page Content Sections',
      type: 'array',
      of: [
        // 1. Blok Sambutan Pendiri (About Us)
        {
          type: 'object',
          name: 'founderMessage',
          title: 'Founder Message',
          fields: [
            { name: 'founderName', title: 'Founder Name & Title', type: 'string' },
            { name: 'founderRole', title: 'Subtitle / Foundation', type: 'string' },
            { name: 'founderPhoto', title: 'Founder Photo', type: 'image', options: { hotspot: true } },
            { name: 'message', title: 'Message Body', type: 'array', of: [{ type: 'block' }] },
          ],
        },
        // 2. Blok Visi, Misi & Nilai Inti (About Us)
        {
          type: 'object',
          name: 'missionAndValues',
          title: 'Mission & Core Values',
          fields: [
            { name: 'missionTitle', title: 'Mission Heading', type: 'string' },
            { name: 'missionText', title: 'Mission Statement', type: 'text' },
            {
              name: 'values',
              title: 'Core Values List',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'title', title: 'Value Title', type: 'string' },
                    { name: 'description', title: 'Description', type: 'text' },
                  ],
                },
              ],
            },
          ],
        },
        // 3. Blok Galeri Fasilitas (About Us)
        {
          type: 'object',
          name: 'gallerySection',
          title: 'Facility Gallery',
          fields: [
            { name: 'heading', title: 'Gallery Heading', type: 'string' },
            {
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [{ type: 'image', options: { hotspot: true } }],
            },
          ],
        },
        // 4. Blok Kurikulum / Program (Programs)
        {
          type: 'object',
          name: 'programList',
          title: 'Curriculum & Programs',
          fields: [
            {
              name: 'programs',
              title: 'Programs',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'levelName', title: 'Level (Playgroup / Kindergarten / Primary)', type: 'string' },
                    { name: 'overview', title: 'Overview', type: 'text' },
                    { name: 'image', title: 'Program Image', type: 'image', options: { hotspot: true } },
                    {
                      name: 'components',
                      title: 'Key Components',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            { name: 'name', title: 'Component Name', type: 'string' },
                            { name: 'detail', title: 'Component Detail', type: 'text' },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        // 5. Blok Kebijakan Health & Safety (2 Kolom)
        {
          type: 'object',
          name: 'policyColumns',
          title: 'Health & Safety Policies',
          fields: [
            {
              name: 'leftColumn',
              title: 'Left Column (Health & Well-being)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'policyTitle', title: 'Policy Title', type: 'string' },
                    { name: 'points', title: 'Bullet Points', type: 'array', of: [{ type: 'text' }] },
                  ],
                },
              ],
            },
            {
              name: 'rightColumn',
              title: 'Right Column (Safety & Security)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'policyTitle', title: 'Policy Title', type: 'string' },
                    { name: 'points', title: 'Bullet Points', type: 'array', of: [{ type: 'text' }] },
                  ],
                },
              ],
            },
          ],
        },
        // 6. Blok Highlight 3 Kolom (Home)
        {
          type: 'object',
          name: 'featureCards',
          title: '3-Column Highlights',
          fields: [
            {
              name: 'cards',
              title: 'Cards',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'title', title: 'Card Title', type: 'string' },
                    { name: 'description', title: 'Card Description', type: 'text' },
                    { name: 'icon', title: 'Card Image/Icon', type: 'image' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
    },
    prepare({ title, language }) {
      return {
        title: title,
        subtitle: language ? `Language: ${language.toUpperCase()}` : 'No language set',
      }
    },
  },
})