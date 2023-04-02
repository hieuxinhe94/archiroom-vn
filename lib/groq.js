import { groq } from "next-sanity";

export const postfeaturesquery = groq `
*[_type == "post" && featured == true]  | order(publishedAt desc, _createdAt desc)  {
  ...,
  author->{name, image},
  categories[]->
}[0..6]
`;


export const postquery = groq `
*[_type == "post"] | order(publishedAt desc, _createdAt desc)  {
  ...,
  author->{name, image},
  categories[]->
}[0..6]
`;

export const configQuery = groq `
*[_type == "siteconfig"][0] {
  ...,
  features[]->,
  highlight_feature[]->,
  navigations[]->,
  pricing-> {..., plans[]->},
  download->,
  questionBlock->{..., questions[]-> },
}
`;

export const singlequery = groq `
*[_type == "post" && slug.current == $slug][0] {
  ...,
  author->,
  categories[]->,
  "estReadingTime": round(length(pt::text(body)) / 5 / 180 )
}
`;

export const pathquery = groq `
*[_type == "post"] {
  'slug': slug.current,
}
`;

export const authorsquery = groq `
*[_type == "author"] {
 ...
}
`;

// test below
// to delete later

export const listquery = groq `
*[_type == "listing"] | order(_createdAt desc) [$start..$end] {
  ...,
  category->
 }
`;

export const productquery = groq `
*[_type == "listing" && slug.current == $slug][0] {
  ...,
  category-> {
    ...,
    enqform->,
    vendorform->
  }
 }
`;