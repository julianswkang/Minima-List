import React from 'react';

const Modal = props => {
  return (
    <div className='modal'>
      <div className='modal-content'>
        Content
      </div>
      <div className='modalButton'>
        <button className='closeModal'>Close</button>
      </div>
    </div>
  )
}

export default Modal;