import React from 'react';

export default function ModalDeletes({ onCancel, onConfirm }) {
  return (
    <>
      <div className="overlay">
        <div className="modal-custom">
          <div className="modal-title">
            <h4>Cảnh báo</h4>
            <i className="fa-solid fa-xmark" onClick={onCancel} />
          </div>
          <div className="modal-body-custom">
            <span>Bạn có chắc chắn muốn xóa tài khoản này?</span>
          </div>
          <div className="modal-footer-custom">
            <button className="btn btn-light" onClick={onCancel}>Hủy</button>
            <button className="btn btn-danger" onClick={onConfirm}>Xác nhận</button>
          </div>
        </div>
      </div>
    </>
  );
}
