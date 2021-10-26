import React from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';


export default function Modal({ hideCommentModal, hideReplyModal, onClose, title, children }) {
    if (hideCommentModal) {
        return null;
    }

    if (hideReplyModal) {
        return null;
    }



    return createPortal(
        <div className="modal_outmost_container" onClick={onClose} >
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                <div className="modal_header" >
                    <h3 className="modal_title"> {title} </h3>
                </div>
                <div className="modal body">
                    {children}
                </div>
            </div>
        </div>,
        document.getElementById('root')
    )
}