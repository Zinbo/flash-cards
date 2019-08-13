import React from 'react'
import { ButtonToolbar, Col, Row } from 'react-bootstrap'
import { RouteComponentProps } from 'react-router-dom'
import Loading from '../common/loading'
import './learn.css'

interface Category {
  _id: number
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

  public async componentDidMount(): Promise<void> {
    const response = await fetch('/api/categories')
    const categories: Category[] = await response.json()
    categories.forEach((category: Category) => {
      category.colour = this.getRandomButtonColour()
    })
    this.setState({
      loading: false,
      categories,
    })
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
                    onClick={() => this.props.history.push(`/cardstage?categoryId=${category._id}`)}
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
