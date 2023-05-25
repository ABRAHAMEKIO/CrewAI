import React from 'react';

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
  return <Home socketId={socketId} metaTags={metaTags} />;
}

export async function getServerSideProps({ query }) {
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
