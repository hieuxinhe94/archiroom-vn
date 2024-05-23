import { SchemaTypeDefinition } from 'sanity'

import affliatePage from './affliate-page'
import blockContent from './blockContent'
import feature from './feature'
import featureBlock from './featureBlock'
import howitworks from './howitwork'
import howitworksBlock from './howitworksBlock'
import howToUseBlock from './howToUseBlock'
import howToUseStep from './howToUseStep'
import introBlock from './intro-block'
import partner from './partner'
import post from './post'
import pricing from './pricing'
import pricingBlock from './pricingBlock'
import affliateProduct from './product'
import settings from './settings'
import social from './social'
import testimonial from './testimonial'
import testimonialBlock from './testimonialBlock'
import twoColumnsBlock from './two-columns-block'

export const schemaTypes = [
  affliatePage,
  affliateProduct,
  post,
  blockContent,
  settings,
  introBlock,
  partner,
  twoColumnsBlock,
  pricing,
  social,
  pricingBlock,
  howToUseStep,
  howToUseBlock,
  testimonial,
  testimonialBlock,
  howitworks,
  howitworksBlock,
  feature,
  featureBlock
]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    affliatePage,
    affliateProduct,
    post,
    blockContent,
    settings,
    introBlock,
    partner,
    twoColumnsBlock,
    pricing,
    social,
    pricingBlock,
    howToUseStep,
    howToUseBlock,
    testimonial,
    testimonialBlock,
    howitworks,
    howitworksBlock,
    feature,
    featureBlock
  ],
}
