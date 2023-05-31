import React from 'react';
import Home from './home-v2/index';
import { server } from '../config';
import HeadSEO from '../components/v2/HeadSEO';

type MetaTags = {
  id?: number;
  title: string;
  description: string;
  imageUrl: string;
};

function Index({
  socketId,
  metaTags,
}: {
  socketId: string;
  metaTags: MetaTags;
}) {
  return (
    <>
      <HeadSEO
        id={metaTags.id}
        title={metaTags.title}
        description={metaTags.description}
        imageUrl={metaTags.imageUrl}
      />
      <Home socketId={socketId} />
    </>
  );
}

export async function getServerSideProps({ query }) {
  const defaultMetaTags = {
    id: null,
    title: 'Unleash Artistry: Hologram - Explore Generative AI',
    description:
      'Hologram: Companion that transforms idle moments into captivating AI-generated art experiences.' +
      ' Discover mesmerizing holographic images, share favorites on social media,' +
      ' and anticipate upcoming NFT integration. Rediscover the joy of AI art like never before!',
    imageUrl: `${server}/share/default.png`,
  };

  if (!query.v) {
    return {
      props: {
        metaTags: defaultMetaTags,
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
        metaTags: defaultMetaTags,
      },
    };
  } catch (error) {
    return {
      props: {
        metaTags: defaultMetaTags,
      },
    };
  }
}

export default Index;
