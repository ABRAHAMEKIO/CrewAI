import Head from 'next/head';
import React from 'react';
import { server } from '../../config';

interface MetaTags {
  id?: number;
  title?: string;
  description?: string;
  imageUrl?: string;
}

function HeadSEO(metaTags: MetaTags) {
  const { id, title, description, imageUrl } = metaTags;
  return (
    <div>
      {Object.keys(metaTags).length > 0 && (
        <Head>
          {/* Primary Meta Tags */}
          <meta name="title" content={title} />
          <meta name="description" content={description} />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${server}/?v=${id}`} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={imageUrl} />

          {/* Twitter */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content={`${server}/?v=${id}`} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={imageUrl} />
        </Head>
      )}
    </div>
  );
}

export default HeadSEO;
