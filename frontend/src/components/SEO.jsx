import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords }) {
  const siteName = 'TrialShopy';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Smart AR Shopping Platform`;
  const defaultDesc = 'TrialShopy is an AI-powered Smart AR Shopping Platform that lets you virtually try on clothes via Smart AR Displays installed in public spaces.';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
}
