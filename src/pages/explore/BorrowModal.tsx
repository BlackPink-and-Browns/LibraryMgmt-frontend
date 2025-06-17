import React, { useState } from 'react';
import { Button } from '../../components';
type Combo = {
  id: number;
  office: string;
  shelf: string;
};

type BorrowModalProps = {
  isOpen: boolean;
  onClose: () => void;
  setBorrowed: React.Dispatch<React.SetStateAction<Combo[]>>;
};


// Dummy data for shelves and offices
const dummyCombos = [
  { id: 1, office: 'Office 101', shelf: 'Shelf A1' },
  { id: 2, office: 'Office 102', shelf: 'Shelf B2' },
  { id: 3, office: 'Office 103', shelf: 'Shelf C3' },
  { id: 4, office: 'Office 104', shelf: 'Shelf D4' },
];

export default function BorrowModal({ isOpen, onClose, setBorrowed } : BorrowModalProps) {
  const [availableCombos, setAvailableCombos] = useState(dummyCombos);
  const [selectedId, setSelectedId] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleSelect = (id:number) => {
    setSelectedId(id);
    setSuccessMessage('');
  };

  const handleBorrow = () => {
    const selectedCombo = availableCombos.find((combo) => combo.id === selectedId);
    if (selectedCombo) {
      setBorrowed((prev:Combo[]) => [...prev, selectedCombo]);
      setAvailableCombos((prev) => prev.filter((combo) => combo.id !== selectedId));
      setSuccessMessage(`Successfully borrowed from ${selectedCombo.office}, ${selectedCombo.shelf}`);
      setSelectedId(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.7)]">
      <div className="bg-theme-light rounded-lg shadow-lg w-11/12 max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Select Office -  Shelf to Borrow</h2>

        <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
          {availableCombos.map(({ id, office, shelf }) => (
            <button
              key={id}
              className={`w-full border rounded p-3 text-left ${
                selectedId === id ? 'bg-blue-100 border-blue-400' : 'hover:bg-gray-100'
              }`}
              onClick={() => handleSelect(id)}
            >
              <div className="font-medium">{office}</div>
              <div className="text-sm text-gray-600">{shelf}</div>
            </button>
          ))}
         
        </div>

        {successMessage && (
          <div className="text-green-600 text-sm font-medium mb-3">{successMessage}</div>
          
        )}

        <div className='layout-center'>
            <div className="flex space-x-3 w-1/2">
                <Button
                    onClick={onClose}
                    variant={{ color: 'secondary', size: 'small' }}
                    >
                    Confirm
                </Button>

                <Button
                    onClick={onClose}
                    variant={{ color: 'ternary', size: 'small' }}
                    >
                    Cancel
                </Button>
            </div>
        </div> 
        
      </div>
    </div>
  );
}
