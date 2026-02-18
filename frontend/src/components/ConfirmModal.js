import React from "react";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            className="bg-button px-3 py-1 rounded-md text-black hover:bg-buttonHover transition"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-red px-3 py-1 rounded-md text-white hover:bg-redHover transition"
            onClick={onCancel}
          >
            No
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
