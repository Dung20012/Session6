import React from 'react'

export default function ModalErrorr({ show, onClose, message }) {
    if (!show) return null  // không hiển thị nếu không cần

    return (
        <div className="overlay">
            <div className="modal-custom">
                <div className="modal-header-custom">
                    <h5>Cảnh báo</h5>
                    <i className="fas fa-xmark" onClick={onClose} />
                </div>
                <div className="modal-body-custom">
                    <p>{message}</p>
                </div>
                <div className="modal-footer-footer">
                    <button className="btn btn-light" onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    )
}
