import React from 'react';
import logo from './logo.svg';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './App.css';

const App: React.FC = () => {
  return (
    <section className="app-page">
    <Row className="maxheight">
      <Col>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </Col>
      </Row>
    </section>
  );
}

export default App;
