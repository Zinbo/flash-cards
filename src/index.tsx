import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Overview from './overview';
import Learn from './learn';
import CardStage from './learn/cardStage';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

ReactDOM.render(
    <Router>
        <Container fluid style={{backgroundColor: "#F1F1F1", paddingLeft: "0px", paddingRight: "0px"}}>
            <Navbar className="flash-header" bg="dark" variant="dark">
                <LinkContainer to="/">
                    <Navbar.Brand>Flash Cards</Navbar.Brand>
                </LinkContainer>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/overview">
                            <Nav.Link>Overview</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/learn">
                            <Nav.Link>Learn</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Route exact path="/" component={App} />
            <Route path="/overview" component={Overview} />
            <Route path="/learn" component={Learn} />
            <Route path="/cardstage" component={CardStage} />
        </Container>
    </Router>
    ,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
