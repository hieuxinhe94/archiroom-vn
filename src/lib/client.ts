import { createClient } from "next-sanity";

import {
    configQuery,
    getAll,
    getHowToUseBlock,
    getIntroBlock,
    getPartners,
    getPricing,
    getPricingBlock,
    getSocial,
    getTestimonialBlock,
    getTwoColumnsBlocks,
    homepage
  } from "./groq";
import { apiVersion, dataset, projectId, useCdn } from "./sanity.api";
 import { filterProducts } from "./sanity.queries";

if (!projectId) {
  console.error(
    "The Sanity Project ID is not set. Check your environment variables."
  );
}

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn })
  : null;

export const fetcher = async ([query, params]) => {
  return client ? client.fetch(query, params) : [];
};

(async () => {
  if (client) {
    const data = await client.fetch(getAll);
    if (!data || !data.length) {
      console.error(
        "Sanity returns empty array. Are you sure the dataset is public?"
      );
    }
  }
})();

export async function getIntroductionBlock() {
  if (client) {
    return (await client.fetch(getIntroBlock)) || [];
  }
  return [];
}

export async function getAllPartners() {
  if (client) {
    return (await client.fetch(getPartners)) || [];
  }
  return [];
}

export async function getAllTwoColumnBlocks() {
  if (client) {
    return (await client.fetch(getTwoColumnsBlocks)) || [];
  }
  return [];
}

export async function getAllPricing() {
  if (client) {
    return (await client.fetch(getPricing)) || [];
  }
  return [];
}


export async function getAllSocial() {
  if (client) {
    return (await client.fetch(getSocial)) || [];
  }
  return [];
}

export async function getPricingBlocks() {
  if (client) {
    return (await client.fetch(getPricingBlock)) || [];
  }
  return [];
}

export async function getHowToUseBlocks() {
  if (client) {
    return (await client.fetch(getHowToUseBlock)) || [];
  }
  return [];
}

export async function getTestimonialBlocks() {
  if (client) {
    return (await client.fetch(getTestimonialBlock)) || [];
  }
  return [];
}

export async function getSettings() {
  if (client) {
    return (await client.fetch(configQuery)) || [];
  }
  return [];
}

export async function getFilteredProducts(media, type) {
  if (client) {
    return (await client.fetch(filterProducts(media, type))) || [];
  }
  return [];
}

export async function getHomepageData() {
  if (client) {
    return (await client.fetch(homepage)) || [];
  }
  return [];
}