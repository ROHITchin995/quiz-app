import React from 'react'
import { useGlobalContext } from './context'

export const Modal = () => {
    const {isModalOpen, closeModal, correct, questions} = useGlobalContext()
  return (
    <div className={`${isModalOpen? 'modal_container_isOpen' : 'modal_container'}`}>
        <div className='modal_content'>
            <h2>Congrats !</h2>
            <p>
                You answered {((correct / questions.length) * 100).toFixed(0)} % of
                questions correctly
            </p>
            <button className='close_button' onClick={closeModal}>
                Play Again
            </button>
        </div>
    </div>
  )
}
