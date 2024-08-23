import React, { useEffect } from "react";
import ProgressBar from "./ProgressBar";

const totalTime = 4000

function ConfirmDelete({ onClose, onConfirm }) {
  useEffect(() => {
    let timer = setTimeout(() => {
      onConfirm();
    }, totalTime);

    return () => {
      clearTimeout(timer);
    };
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button className="button-text" onClick={onClose}>
          No
        </button>
        <button className="button" onClick={onConfirm}>
          Yes
        </button>
      </div>
      <ProgressBar Timer={totalTime} />
    </div>
  );
}

export default ConfirmDelete;
