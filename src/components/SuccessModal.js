import React from "react";

function Modal({ show, title, message, onClose }) {
  if (!show) return null;
  return (
    <div className="modal-bg">
      <div className="modal">
        <h3>{title}</h3>
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

export default Modal;