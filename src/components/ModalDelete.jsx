import React from 'react';

const ModalDelete = ({ onClose, onConfirm }) => {
  return (
    <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Xác nhận xóa</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">
            <p>Bạn có chắc chắn muốn xóa công việc này không?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Hủy
            </button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
