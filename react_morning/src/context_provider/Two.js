import React from 'react';
import Three from './Three';

function Two({data}) {
  return (
    <div>
      <h1>Two {data}</h1>
      <Three data={data} />
    </div>
  );
}

export default Two;
