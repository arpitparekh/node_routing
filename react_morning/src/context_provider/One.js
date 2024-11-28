import React ,{ useState} from 'react';
import Two from './Two';

function One({ data }) {

  return (
    <div>
      <h1>First {data}</h1>
      <Two data={data} />
    </div>
  );
}

export default One;

