import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const modalElement = document.querySelector('#modal');

function Modal({ children }) {
  const modalRef = useRef();
  if (!modalRef.current) {
    modalRef.current = document.createElement('div');
  }

  useEffect(() => {
    modalElement.appendChild(modalRef.current);

    return () => modalElement.removeChild(modalRef.current);
  }, []);

  return ReactDOM.createPortal(children, modalRef.current);
}

export default Modal;
