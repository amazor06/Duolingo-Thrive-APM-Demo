import React from "react";

export default function Modal({ open, title, children, onClose, footer }) {
  if (!open) return null;

  return (
    <div className="modalOverlay" role="dialog" aria-modal="true" aria-label={title}>
      <div className="modalCard">
        <div className="modalHeader">
          <div className="modalTitle">{title}</div>
          <button className="modalX" type="button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="modalBody">{children}</div>

        {footer ? <div className="modalFooter">{footer}</div> : null}
      </div>
    </div>
  );
}
