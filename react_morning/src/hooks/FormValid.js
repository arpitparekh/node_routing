import React, { useRef } from 'react';

export default function FormValid() {
  const nameRef = useRef();
  const emailRef = useRef();

  const handleSubmit = () => {
    if (!nameRef.current.value) {
      nameRef.current.focus();
      alert('Name is required!');
    } else if (!emailRef.current.value) {
      emailRef.current.focus();
      alert('Email is required!');
    }
  };

  return (
    <div>
      <input ref={nameRef} type="text" placeholder="Name" />
      <input ref={emailRef} type="email" placeholder="Email" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
