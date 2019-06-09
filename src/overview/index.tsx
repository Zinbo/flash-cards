import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'
import { Col, ListGroup, Row } from 'react-bootstrap'
import { RouteComponentProps } from 'react-router-dom'
import toastr from 'toastr'
import 'toastr/build/toastr.css'
import DeleteModal from '../common/delete-modal'
import './overview.css'

interface Category {
  id: number
  name: string
}

interface MyState {
  categories: Category[]
  showModal: boolean
  categoryToDelete?: Category
  newCategoryName: string
}

class Categories extends React.Component<RouteComponentProps, MyState> {
  public state: MyState = {
    categories: [],
    showModal: false,
    categoryToDelete: undefined,
    newCategoryName: '',
  }

  constructor(props: RouteComponentProps) {
    super(props)
    this.deleteFromModal = this.deleteFromModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.addCategory = this.addCategory.bind(this)
  }

  public componentDidMount() {
    const categories = this.getCategories()
    this.setState({
      categories,
    })
  }

  public deleteFromModal() {
    // TODO: delete category
    if (this.state.categoryToDelete === undefined) {
      return
    }
    const categoryToDelete = this.state.categoryToDelete
    const id = categoryToDelete.id
    const indexOfElementToDelete: number = this.state.categories.findIndex(category => {
      return category.id === id
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

  public getCategories() {
    // TODO: Load Categories
    const categories = [
      {
        id: 1,
        name: 'Data Structures',
      },
      {
        id: 2,
        name: 'Algorithms',
      },
      {
        id: 3,
        name: 'C++',
      },
    ]

    return categories
  }

  public closeModal() {
    this.setState({
      showModal: false,
    })
  }

  public addCategory = (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter' || !this.state.newCategoryName) {
      return
    }
    // TODO save category with category name and get id!
    // TODO get categories again?
    const categories = [...this.state.categories]
    const id = Math.floor(Math.random() * 1000)
    categories.push({ id, name: this.state.newCategoryName })
    this.setState({
      newCategoryName: '',
      categories,
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
        <DeleteModal
          onClose={this.closeModal}
          show={this.state.showModal}
          onDelete={this.deleteFromModal}
        >
          {this.state.categoryToDelete &&
            `Are you sure you want to delete ${this.state.categoryToDelete.name}?`}
        </DeleteModal>
        <Row className="justify-content-md-center" style={{ paddingTop: '20px' }}>
          <Col xs={true} lg="10">
            <InputGroup>
              <FormControl
                placeholder="Add Category..."
                aria-label="Category"
                value={this.state.newCategoryName}
                onKeyPress={this.addCategory}
                onChange={this.updateCategoryName}
              />
            </InputGroup>
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
                          this.props.history.push(`/cards?categoryId=${category.id}`)
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
