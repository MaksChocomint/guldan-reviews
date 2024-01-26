// DeleteConfirmationModal.js
import React from "react";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[10000] cursor-default">
      {/* Backdrop with dark overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-60 z-[9999]"></div>

      {/* Modal */}
      <div className="bg-white text-lg p-4 rounded shadow-md z-[10000]">
        <p className="mb-4">Вы точно хотите удалить рецензию?</p>
        <div className="flex justify-end">
          <button
            onClick={onConfirm}
            className="cursor-pointer mr-2 border-2 rounded-md py-1 px-2 w-10 bg-green-400"
          >
            <FaCheck />
          </button>
          <button
            className="cursor-pointer border-2 rounded-md px-2 py-1 w-10 bg-red-400"
            onClick={onCancel}
          >
            <FaXmark size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
