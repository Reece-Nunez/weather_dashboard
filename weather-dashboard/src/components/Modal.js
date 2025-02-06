// src/components/Modal.js
import React from "react";
import "./Modal.css";

const Modal = ({ show, onClose, message }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Error</h2>
        <p>{message}</p>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default Modal;
