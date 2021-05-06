import React from "react";
import "./_modal.scss";

export default function Modal(props) {
  return (
    <div className="modal">
      <div className="modal__wrapper">
        <h3 className="modal__title">
          Are you sure you want to delete the book "{props.title}"?
        </h3>
        <div className="modal__actions">
          <button
            className="button-success"
            onClick={() => props.deleteBook(props.id)}
          >
            Yes
          </button>
          <button className="button-success" onClick={props.handleNo}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
