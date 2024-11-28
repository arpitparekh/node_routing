import React from "react";

function PassStyle({ myStyle, clicking }) {

  

  return (
    <div>
      <h1 style={myStyle}>PassStyle Component</h1>
      <button onClick={clicking}> Click Karo Khush Raho</button>
    </div>
  );
}

export default PassStyle;
