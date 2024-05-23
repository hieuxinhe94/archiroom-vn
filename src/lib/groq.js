import { groq } from "next-sanity";

// get everything from sanity
// to test connection
export const getAll = groq`*[]`;

// Get Introduction Block Info
export const getIntroBlock = groq`
*[_type == "intro-block"]
`;


// Get All active Partners
export const getPartners = groq`
*[_type == "partner"  && isActive == true] | order(_createdAt asc)
`;

// Get All active Partners
export const getTwoColumnsBlocks = groq`
*[_type == "two-columns-block"] | order(_createdAt asc)
`;

// Get All Pricing
export const getPricing = groq`
*[_type == "pricing"]
`;

// Get All social
export const getSocial = groq`
*[_type == "social"  && active == true]
`;

// Get pricing Block
export const getPricingBlock = groq`
*[_type == "pricingBlock"] {
  _id,
  title,
  prices[]-> | order(_createdAt asc),
}
`;

// Get pricing Block
export const getHowToUseBlock = groq`
*[_type == "howToUseBlock"] {
  _id,
  title,
  video,
  buttonActionTitle,
  howToUseSteps[]-> | order(_createdAt asc),
}
`;

// Get testimonial Block
export const getTestimonialBlock = groq`
*[_type == "testimonialBlock"] {
  _id,
  title,
  testimonials[]-> | order(_createdAt desc),
}
`;

// Get Site Config
export const configQuery = groq`
*[_type == "settings"][0] {
  ...,
}
`;

export const homepage = groq`{
  "settings": *[_type == "settings"][0] {
    ...,
  },
  "intro": *[_type == "intro-block"],
  "partners": *[_type == "partner"  && isActive == true] | order(_createdAt asc),
  "twoColumnsBlocks": *[_type == "two-columns-block"] | order(_createdAt asc),
  "pricingBlock": *[_type == "pricingBlock"] {
    _id,
    title,
    prices[]-> | order(_createdAt asc),
  },
  "howToUseBlock": *[_type == "howToUseBlock"] {
    _id,
    title,
    video,
    buttonActionTitle,
    howToUseSteps[]-> | order(_createdAt asc),
  },
  "testimonialBlock": *[_type == "testimonialBlock"] {
    _id,
    title,
    testimonials[]-> | order(_createdAt desc),
  },
  "howItWorksBlock": *[_type == "howItWorkBlock"] {
    _id,
    title,
    description,
    howitworksitems[]-> | order(_createdAt asc),
  },
  "featureBlock": *[_type == "featureBlock"] {
    _id,
    title,
    description,
    features[]-> | order(_createdAt asc),
  },
}`;