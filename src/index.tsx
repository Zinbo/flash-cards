import React from 'react'
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import './index.css'
import Learn from './learn'
import CardStage from './learn/card-stage'
import Overview from './overview'
import CardsByCategory from './overview/cards-overview'
import * as serviceWorker from './serviceWorker'
ReactDOM.render(
  // TODO: Slide out menu: https://www.kirupa.com/react/smooth_sliding_menu_react_motion.htm
  <Router>
    <Container
      fluid={true}
      style={{ backgroundColor: '#F1F1F1', paddingLeft: '0px', paddingRight: '0px' }}
    >
      <Navbar className="flash-header" bg="dark" variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand>Flash Cards</Navbar.Brand>
        </LinkContainer>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/learn">
              <Nav.Link>Learn</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Route exact={true} path="/" component={Overview} />
      <Route path="/cards" component={CardsByCategory} />
      <Route path="/learn" component={Learn} />
      <Route path="/cardstage" component={CardStage} />
    </Container>
  </Router>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
