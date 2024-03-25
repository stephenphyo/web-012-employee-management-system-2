import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

/*** CSS Imports ***/
import './SPModal.css';

const Modal = ({ children, showModal, setShowModal }) => {

    /* useState */
    const [readyDom, setReadyDom] = useState(false);

    /* useEffect */
    useEffect(() => {
        setReadyDom(true);
    }, []);

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('sp-modal-overlay')) {
            setShowModal(false);
        }
    }

    return readyDom && showModal
        ? ReactDOM.createPortal(
            <div className='sp-modal-overlay'
                onClick={handleOverlayClick}>
                <div className='sp-modal'>
                    {children}
                </div>
            </div>,
            document.getElementById('root')
        )
        : null;
};

export default Modal;