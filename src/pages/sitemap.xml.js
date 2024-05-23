import { TryOnViewModel, vtoService } from '~/services/VTOService';

const EXTERNAL_DATA_URL = 'https://tryonhub.ai/affiliate-product';
async function getAffiliateProducts() {
  const res = await vtoService.getAffiliateProducts("000");
  if (res.status !== 200) {
    throw new Error('Failed to fetch data')
  }
  return res.data
}

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
    <loc>https://tryonhub.ai/default</loc>
  </url>
  <url>
  <loc>https://tryonhub.ai/try-on-shop</loc>
  </url>
  <url>
  <loc>https://tryonhub.ai/contact</loc>
  </url>
     ${posts
      .map((product) => {
        return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${product.id}`}</loc>
       </url>
     `;
      })
      .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const dataProducts = await getAffiliateProducts();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(dataProducts);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;