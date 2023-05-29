import React from 'react';
import Home from './home-v2/index';
import { server } from '../config';
import HeadSEO from '../components/v2/HeadSEO';

type MetaTags = {
  id: number;
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
