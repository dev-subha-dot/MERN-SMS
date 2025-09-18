import React from "react";

export default function ConfirmDeleteModal({ onClose, onConfirm }) {
    return (
        <div
            className={`modal fade show d-block`}
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content text-center p-4">
                    {/* Icon */}
                    <i className="bi bi-trash" style={{ fontSize: "3rem", color: "dodgerblue" }}></i>

                    {/* Text */}
                    <p className="mt-3 fs-5">Are you sure you want to Delete?</p>

                    {/* Buttons */}
                    <div className="d-flex justify-content-center gap-3 mt-3">
                        <button className="btn btn-danger px-4" onClick={onClose}>
                            Cancel
                        </button>
                        <button className="btn btn-primary px-4" onClick={onConfirm}>
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
