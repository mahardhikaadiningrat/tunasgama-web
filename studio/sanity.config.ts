import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { documentInternationalization } from '@sanity/document-internationalization'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Tunas Gama School',

  projectId: 'ddo37q5h',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    documentInternationalization({
      supportedLanguages: [
        { id: 'en', title: 'English' },
        { id: 'id', title: 'Indonesian' },
      ],
      schemaTypes: ['page', 'siteSettings'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})