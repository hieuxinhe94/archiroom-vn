import { postfeaturesquery, prebuildproductListquery } from "../lib/groq";
import { getClient } from "../lib/sanity";
const CURRENT_DOMAIN_URL = "https://simplifydx.com";

function generateSiteMap(posts, products) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${posts
       .map((post) => {
         return `
       <url>
           <loc>${`${CURRENT_DOMAIN_URL}/post/${post.slug.current}`}</loc>
       </url>
     `;
       })
       .join("")}
       ${products
         .map((product) => {
           return `
        <url>
            <loc>${`${CURRENT_DOMAIN_URL}/post/${product.slug.current}`}</loc>
        </url>
      `;
         })
         .join("")}

         <url><loc>${`${CURRENT_DOMAIN_URL}/chatbots`}</loc></url>
         <url><loc>${`${CURRENT_DOMAIN_URL}/ocr-service`}</loc></url>
         <url><loc>${`${CURRENT_DOMAIN_URL}/digital-consultant`}</loc></url>
         <url><loc>${`${CURRENT_DOMAIN_URL}/contact`}</loc></url>
         <url><loc>${`${CURRENT_DOMAIN_URL}/`}</loc></url>
         
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const posts = await getClient(false).fetch(postfeaturesquery);
  const lastestProducts = await getClient(false).fetch(
    prebuildproductListquery
  );

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts, lastestProducts);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
