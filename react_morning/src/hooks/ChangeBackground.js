import React, { useRef,useState } from 'react';

export default function ChangeBackground() {

  const divRef = useRef();
  const style = {
    height: '100px',
    width: '100px',
  };

  const changeColor = () => {

    divRef.current.style.backgroundColor = 'red';  //  prefent render
    divRef.current.style.height = '200px';

  };

  return (
    <div>
      <div
        ref = {divRef}
        style={style}></div>
      <button onClick={changeColor}>Change Background</button>
    </div>
  );
}
