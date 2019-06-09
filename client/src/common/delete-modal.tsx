import React from 'react'
import { Button, Modal } from 'react-bootstrap'

interface DeleteProps {
  onDelete: () => void
  show: boolean
  onClose: () => void
}

const deleteModal: React.FC<DeleteProps> = props => {
  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton={true} />
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
        <Button variant="danger" onClick={props.onDelete}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default deleteModal
