import React from 'react';

import Home from './home-v2/index';

function Index({ socketId }: { socketId: string }) {
  return <Home socketId={socketId} />;
}

export default Index;
