import React from 'react'
import Loading from './loading'
import {Modal} from 'react-bootstrap'
const loadingModal = (props) => {
  return (

      <Modal  show={props.show}>
       <Modal.Header>
         <Modal.Title>Your Request is being executed ..</Modal.Title>
       </Modal.Header>

       <Modal.Body className="modal_center">
           <Loading />

       </Modal.Body>

     </Modal>
  )
}

export default loadingModal
