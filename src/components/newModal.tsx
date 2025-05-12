import React, { ReactNode, useEffect } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  closeOnOutsideClick?: boolean;
};

const NewModal = ({
  isOpen,
  onClose,
  children,
  closeOnOutsideClick = true,
}: ModalProps) => {
  // Close modal when clicking outside
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-4"
    >
     
    <div
    className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50"
    onClick={handleOutsideClick}
    />
      
      {/* Modal container */}
      <div className="relative z-70 w-full max-w-md mx-auto">
        {/* Modal content */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default NewModal;