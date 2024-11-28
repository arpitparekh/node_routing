// src/App.js
import React, { useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import One from './context_provider/One';
import PassStyle from './PassStyle';

const Home = () => <h1>Home Page</h1>;
const About = () => <h1>About Page</h1>;
const NotFound = () => <h1>404 - Page Not Found</h1>;

/////////////////////////////////////////////////////////////////////

function Component2({ user }) {
  return (
    <>
      <h1>Component 2</h1>
      <Component3 user={user} />
    </>
  );
}

function Component3({ user }) {
  return (
    <>
      <h1>Component 3</h1>
      <Component4 user={user} />
    </>
  );
}

function Component4({ user }) {
  return (
    <>
      <h1>Component 4</h1>
      <Component5 user={user} />
    </>
  );
}

function Component5({ user }) {
  return (
    <>
      <h1>Component 5</h1>
      <h2>{`Hello ${user} again!`}</h2>
    </>
  );
}


//////////////////////////////////////////////////////////////////


function App() {
  // statevariable
  const [myStyle, setMyStyle] = useState({});

  const [data, setData] = useState("");

  useEffect(() => {
    console.log("Called");
  }, [myStyle]); // <- add empty brackets here

  function handleClick() {
    setMyStyle({
      color: 'red',
      backgroundColor: 'black',
    });
  }

  const [user, setUser] = useState('Jesse Hall');

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <PassStyle clicking={handleClick} myStyle={myStyle} />
        {/* <h1>I've rendered {count} times!</h1> */}
        <One data={data} />
        <button onClick={() => setData("Kem Cho")}> Click Karde Bhai</button>

        <h1>{`Hello ${data}!`}</h1>
        <Component2 user={data} />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
