import React from 'react';
import { Container } from "reactstrap";
import Routes from "./routes"
import './App.css';

function App() {
  return (
    <Container>
      <h1>Sport's App</h1>
      <div className="content ">
        <Routes />
      </div>
      {/* <Login/> Component Login*/}
      {/* <Login/> = <Login></Login> */}
      {/*<Dashboard/>*/}
    </Container>
  );
}

export default App;
