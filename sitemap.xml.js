import { config } from "./lib/config";

const EXTERNAL_DATA_URL = config.backendApi + `phones/getAll`;
const CURRENT_DOMAIN_URL = config.domain;


function generateSiteMap(phones) {
    console.log(phones);
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${phones
       .map(number => {
         return `
       <url>
           <loc>${`${CURRENT_DOMAIN_URL}/contact/${number}`}</loc>
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
  const allContacts = await fetch(EXTERNAL_DATA_URL);
  const phones = await allContacts.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(phones);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;