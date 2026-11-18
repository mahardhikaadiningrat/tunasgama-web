import { sanityClient } from 'sanity:client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

export async function getSiteSettings(lang: string) {
  return await sanityClient.fetch(
    `*[_type == "siteSettings" && language == $lang][0]{
      schoolName,
      logo,
      navLinks,
      contactInfo,
      copyrightText
    }`,
    { lang }
  );
}

export async function getPageBySlug(slug: string, lang: string) {
  return await sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug && language == $lang][0]{
      title,
      heroSubtitle,
      heroImage,
      sections[]{
        ...,
        _type == "founderMessage" => {
          ...,
          founderPhoto
        },
        _type == "gallerySection" => {
          ...,
          images[]
        },
        _type == "programList" => {
          ...,
          programs[]{
            ...,
            image
          }
        },
        _type == "featureCards" => {
          ...,
          cards[]{
            ...,
            icon
          }
        }
      }
    }`,
    { slug, lang }
  );
}