import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, name, type }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href="https://clann-zu.com/" />
      <meta property="og:site_name" content="Clann Zú fan-site" />
      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <script type="application/ld+json">
        {`
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Clann Zú fan-site",
        "url": "https://www.clann-zu.com"
      }
    `}
      </script>
    </Helmet>
  );
}
