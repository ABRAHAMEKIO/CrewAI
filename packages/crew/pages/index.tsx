import React from 'react';

import Head from 'next/head';
import { useSSR } from '@nextui-org/react';
import Home from './home-v2/index';
import { server } from '../config';

interface MetaTags {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

function Index({
  socketId,
  metaTags,
}: {
  socketId: string;
  metaTags: MetaTags;
}) {
  return (
    <div>
      {Object.keys(metaTags).length > 0 && (
        <Head>
          {/* Primary Meta Tags */}
          <meta name="title" content={metaTags.title} />
          <meta name="description" content={metaTags.description} />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${server}/?v=${metaTags.id}`} />
          <meta property="og:title" content={metaTags.title} />
          <meta property="og:description" content={metaTags.description} />
          <meta property="og:image" content={metaTags.imageUrl} />

          {/* Twitter */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content={`${server}/?v=${metaTags.id}`} />
          <meta name="twitter:title" content={metaTags.title} />
          <meta name="twitter:description" content={metaTags.description} />
          <meta name="twitter:image" content={metaTags.imageUrl} />
        </Head>
      )}
      <Home socketId={socketId} />
    </div>
  );
}

export async function getServerSideProps({ query }) {
  if (!query.v) {
    return {
      props: {
        metaTags: {},
      },
    };
  }
  try {
    const fetchUser = await fetch(`${server}/api/prompt/find?v=${query.v}`);
    const { metaTags } = await fetchUser.json();
    if (metaTags) {
      return {
        props: {
          metaTags,
        },
      };
    }
    return {
      props: {
        metaTags: {},
      },
    };
  } catch (error) {
    return {
      props: {
        metaTags: {},
      },
    };
  }
}

export default Index;
