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
    <Head>
      {id ? (
        <>
          <meta property="og:url" content={`${server}/?v=${id}`} />
          <meta name="twitter:url" content={`${server}/?v=${id}`} />
        </>
      ) : (
        <>
          <meta property="og:url" content={server} />
          <meta name="twitter:url" content={server} />
        </>
      )}
      {title && (
        <>
          <meta name="title" content={title} />
          <meta property="og:title" content={title} />
          <meta name="twitter:title" content={title} />
        </>
      )}
      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
      )}
      {imageUrl && (
        <>
          <meta property="og:image" content={imageUrl} />
          <meta name="twitter:image" content={imageUrl} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary" />
        </>
      )}
    </Head>
  );
}

export default HeadSEO;
