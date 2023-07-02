import Head from 'next/head'
import HomePage from '../Components/HomePage'
import HeadTag from '../Components/HeadTag'
import { getClient } from '../lib/sanity';
import { postfeaturesquery, postquery, prebuildproductListquery } from '../lib/groq';

export default function Home(props) {

  return (
    <div>
      <HeadTag page='Home'/>
      <HomePage {...props} />
    </div>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(postfeaturesquery);
  //const config = await getClient(preview).fetch(configQuery);
  // const categories = (await client.fetch(catquery)) || null;
  const lastestProduct = await getClient(preview).fetch(prebuildproductListquery);
  return {
    props: {
      postdata: post,
      products: lastestProduct,
      //siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}
