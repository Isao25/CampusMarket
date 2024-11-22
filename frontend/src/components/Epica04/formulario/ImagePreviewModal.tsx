import * as React from "react";

interface ImagePreviewModalProps {
  imageUrl: string | null;
  onClose: () => void;
};

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Cierra el modal al hacer clic fuera
    >
      <div
        className="relative bg-white p-4 rounded-lg max-w-md w-full"
        onClick={(e) => e.stopPropagation()} // Previene que el clic dentro de la imagen cierre el modal
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
        <img src={imageUrl} alt="Preview" className="w-full h-auto rounded-lg" />
      </div>
    </div>
  );
};
