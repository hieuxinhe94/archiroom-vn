import Head from 'next/head'
import HomePage from '../Components/HomePage'
import HeadTag from '../Components/HeadTag'
import { getClient } from '../lib/sanity';
import { postfeaturesquery, postquery } from '../lib/groq';

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

  return {
    props: {
      postdata: post,
      // categories: categories,
      //siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}
