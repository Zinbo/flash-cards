import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { Col, Row, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
const Categories: React.FC = () => {
    //TODO: Add modal for adding categories
    //TODO: Add edit modal
    //TODO Add delete modal
    return (
        <div>
            <Row className="justify-content-md-center" style={{ paddingTop: "20px" }}>
                <Col xs lg="10">
                    <InputGroup>
                        <FormControl
                            placeholder="Add Category..."
                            aria-label="Category" />
                    </InputGroup>
                </Col>
            </Row>
            <Row className="justify-content-md-center" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                <Col xs lg="10">
                    <ListGroup>
                        <ListGroup.Item>
                            <Row>
                                <Col lg="6">Data Structures</Col>
                                <Col className="ml-auto text-right" lg="1">
                                    <FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: "10px" }} />
                                    <FontAwesomeIcon icon={faTrash} />
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col lg="6">Algorithms</Col>
                                <Col className="ml-auto text-right" lg="1">
                                    <FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: "10px" }} />
                                    <FontAwesomeIcon icon={faTrash} />
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div >
    );
}

export default Categories;