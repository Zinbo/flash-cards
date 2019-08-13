import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, FormControl, InputGroup, Spinner } from 'react-bootstrap'
import { Col, ListGroup, Row } from 'react-bootstrap'
import { RouteComponentProps } from 'react-router-dom'
import toastr from 'toastr'
import 'toastr/build/toastr.css'
import DeleteModal from '../common/delete-modal'
import './overview.css'

interface Category {
  _id: number
  name: string
}

interface MyState {
  categories: Category[]
  showModal: boolean
  categoryToDelete?: Category
  newCategoryName: string
  response: any
  addingCategory: boolean
}

class Categories extends React.Component<RouteComponentProps, MyState> {
  public state: MyState = {
    categories: [],
    showModal: false,
    categoryToDelete: undefined,
    newCategoryName: '',
    response: '',
    addingCategory: false,
  }

  constructor(props: RouteComponentProps) {
    super(props)
    this.deleteFromModal = this.deleteFromModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.addCategory = this.addCategory.bind(this)
  }

  public async componentDidMount() {
    const categories = await this.getCategories()
    this.setState({
      categories,
    })
  }

  public deleteFromModal() {
    if (this.state.categoryToDelete === undefined) {
      return
    }
    const categoryToDelete = this.state.categoryToDelete
    const id = categoryToDelete._id
    fetch(`/api/categories/${id}`, {
      method: 'DELETE',
    })
    const indexOfElementToDelete: number = this.state.categories.findIndex(category => {
      return category._id === id
    })
    const categories = [...this.state.categories]
    categories.splice(indexOfElementToDelete, 1)
    this.setState({
      categories,
      showModal: false,
      categoryToDelete: undefined,
    })
    toastr.success(`Category "${categoryToDelete.name}" deleted`)
  }

  public handleCloseModal() {
    this.setState({
      showModal: false,
      categoryToDelete: undefined,
    })
  }

  public async getCategories() {
    const response = await fetch('/api/categories')
    const body = await response.json()
    // TODO: how to handle this error?
    if (response.status !== 200) { throw Error(body.message) }
    return body
  }

  public closeModal() {
    this.setState({
      showModal: false,
    })
  }

  public addCategory = async () => {
    if (!this.state.newCategoryName) {
      return
    }
    const categories = [...this.state.categories]
    this.setState({
      addingCategory: true,
    })
    const response = await fetch('/api/categories', {
      method: 'POST',
      body: JSON.stringify({ name: this.state.newCategoryName }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const newCategory: Category = await response.json()
    categories.push(newCategory)
    this.setState({
      newCategoryName: '',
      categories,
      addingCategory: false,
    })
  }

  public updateCategoryName = (event: any) => {
    this.setState({
      newCategoryName: event.target.value,
    })
  }

  public render() {
    return (
      <div>
        <h1>{this.state.response}</h1>
        <DeleteModal
          onClose={this.closeModal}
          show={this.state.showModal}
          onDelete={this.deleteFromModal}
        >
          {this.state.categoryToDelete &&
            `Are you sure you want to delete ${this.state.categoryToDelete.name}?`}
        </DeleteModal>
        <Row className="justify-content-md-center" style={{ paddingTop: '20px' }}>
          <Col xs={true} lg="9">
            <InputGroup>
              <FormControl
                placeholder="Add Category..."
                aria-label="Category"
                value={this.state.newCategoryName}
                onChange={this.updateCategoryName}
                disabled={this.state.addingCategory}
              />
            </InputGroup>
          </Col>
          <Col lg="1">
            {this.state.addingCategory ? (
              <Button variant="primary" disabled={true}>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                <span className="sr-only">Loading...</span>
              </Button>
            ) : (
              <Button variant="primary" onClick={this.addCategory}>
                Submit
              </Button>
            )}
          </Col>
        </Row>
        <Row
          className="justify-content-md-center"
          style={{ paddingTop: '20px', paddingBottom: '20px' }}
        >
          <Col xs={true} lg="10">
            <ListGroup>
              {this.state.categories.map(category => {
                return (
                  <ListGroup.Item>
                    <Row>
                      <Col
                        lg="6"
                        className="category-row"
                        onClick={() => {
                          this.props.history.push(`/cards?categoryId=${category._id}`)
                        }}
                      >
                        {category.name}
                      </Col>
                      <Col className="ml-auto text-right" lg="1">
                        <FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: '10px' }} />
                        <span
                          className="delete-icon"
                          onClick={() =>
                            this.setState({
                              categoryToDelete: category,
                              showModal: true,
                            })
                          }
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Categories
