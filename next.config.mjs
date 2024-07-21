/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/ru/dashboards/dashboard',
        permanent: true,
        locale: false
      },
      {
        source: '/:lang(en|fr|ar|ru)',
        destination: '/:lang/dashboards/dashboard',
        permanent: true,
        locale: false
      },
      {
        source: '/((?!(?:en|fr|ar|ru|front-pages|favicon.ico)\\b)):path',
        destination: '/ru/:path',
        permanent: true,
        locale: false
      }
    ]
  }
}

export default nextConfig
