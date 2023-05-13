import React from 'react';

import Homepage from './home/index';

function Index({ socketId }: { socketId: string }) {
  return <Homepage socketId={socketId} />;
}

export default Index;
