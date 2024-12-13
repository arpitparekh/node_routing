import React from 'react'

export default function Myform() {

  const nameRef = React.useRef();
  const emailRef = React.useRef();

  function clickKaro(){
    console.log(nameRef.current.value);   // without casuing a rerender
    console.log(emailRef.current.value);
  }

  return (
    <div>
      <form>
        <input ref={nameRef} type="text" placeholder="name" />
        <input ref={emailRef} type="email" placeholder="email" />
        <button onClick={clickKaro}>submit</button>
      </form>
    </div>
  )
}
