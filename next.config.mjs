/** @type {import('next').NextConfig} */
const config = {
  //output: 'export',
  images: { unoptimized: true, remotePatterns: [{ hostname: 'cdn.sanity.io' }] },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/try-on-shop',
  //       permanent: true,
  //     },

  //   ]
  // },
  resolve: { fallback: { fs: false } }

}

export default config

