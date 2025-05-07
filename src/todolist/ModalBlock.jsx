import React from 'react';

export default function ModalDeletes({ onDeleteConfirm, onDeleteCancel }) {
  return (
    <div className="overlay">
      <div className="modal-custom">
        <div className="modal-title">
          <h4>Cảnh báo</h4>
          <i className="fa-solid fa-xmark" onClick={onDeleteCancel} />
        </div>
        <div className="modal-body-custom">
          <span>Bạn có chắc chắn muốn xóa tài khoản này?</span>
        </div>
        <div className="modal-footer-custom">
          <button className="btn btn-light" onClick={onDeleteCancel}>
            Hủy
          </button>
          <button className="btn btn-danger" onClick={onDeleteConfirm}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
