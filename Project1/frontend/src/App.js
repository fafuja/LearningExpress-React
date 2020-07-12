import React from 'react';
import {Container} from "reactstrap";
import Routes from "./routes"
import './App.css';

function App() {
  return (
    <Container>
      <h1>Sport's App</h1>
        <Routes/>
          {/* <Login/> Component Login*/}
           {/* <Login/> = <Login></Login> */}
          {/*<Dashboard/>*/}
    </Container>
  );
}

export default App;
