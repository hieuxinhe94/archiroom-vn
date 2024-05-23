import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

import { dataset, projectId } from '~/lib/sanity.api'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

// export const urlForImage = (source: Image) => {
//   // Ensure that source image contains a valid reference
//   if (!source?.asset?._ref) {
//     return undefined
//   }

//   return imageBuilder?.image(source).auto('format')
// }

export const urlForImage = source => {
  if (!source || !source.asset) return;
  const dimensions = source?.asset?._ref.split("-")[2];

  const [width, height] = dimensions
    .split("x")
    .map(num => parseInt(num, 10));

  const url = imageBuilder
    .image(source)
    .auto("format")
    .width(Math.min(width, 2000))
    .url();

  return {
    src: url,
    width: width,
    height: height
  };
};

export const urlForIFile = source => {
  if (!source || !source.asset) return "";

  const [_file, id, extension] = source.asset._ref.split('-');

  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${extension}?dl=${id}.${extension}`;
};

export const transformImageWithAI = source => {
  if (!source || !source.asset) return;
  const dimensions = source?.asset?._ref.split("-")[2];

  const [width, height] = dimensions
    .split("x")
    .map(num => parseInt(num, 10));

  const url = "../";

  return {
    src: null,
    width: width,
    height: height
  };
};