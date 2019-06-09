import React from 'react'
import { ButtonToolbar, Col, Row } from 'react-bootstrap'
import { RouteComponentProps } from 'react-router-dom'
import Loading from '../common/loading'
import './learn.css'

interface Category {
  id: number
  name: string
  colour: string
}

interface LearnState {
  categories: Category[]
  loading: boolean
}

const buttonColours = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'dark']

class ShowCategories extends React.Component<RouteComponentProps, LearnState> {
  public state: LearnState = {
    loading: true,
    categories: [],
  }

  public getRandomButtonColour() {
    return buttonColours[Math.floor(Math.random() * buttonColours.length)]
  }

  public componentDidMount() {
    // TODO: Load categories
    const categories: Category[] = [
      {
        id: 1,
        name: 'Data Structures',
        colour: this.getRandomButtonColour(),
      },
      {
        id: 2,
        name: 'Algorithms',
        colour: this.getRandomButtonColour(),
      },
      {
        id: 3,
        name: 'Java',
        colour: this.getRandomButtonColour(),
      },
      {
        id: 4,
        name: 'C++',
        colour: this.getRandomButtonColour(),
      },
    ]

    window.setTimeout(() => {
      this.setState({
        loading: false,
        categories,
      })
    }, 2000)
  }

  public render() {
    if (this.state.loading) {
      return <Loading />
    }

    return (
      <div>
        <Row style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
          <Col style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <ButtonToolbar>
              {this.state.categories.map(category => {
                return (
                  <button
                    className={`btn btn-${category.colour} btn-lg`}
                    style={{ marginRight: '10px' }}
                    onClick={() => this.props.history.push(`/cardstage?categoryId=${category.id}`)}
                  >
                    {category.name}
                  </button>
                )
              })}
            </ButtonToolbar>
          </Col>
        </Row>
      </div>
    )
  }
}
export default ShowCategories
