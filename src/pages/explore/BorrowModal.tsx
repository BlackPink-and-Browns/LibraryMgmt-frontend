import React, { useState } from 'react';
import { Button } from '../../components';
import type { BorrowModalProps } from '../../types/propTypes';
import { useGetBooksCopyListQuery } from '../../api-service/bookcopy/bookcopy.api';
import type { ShelfType } from '../../types/dataTypes';
import { useGetShelfDetailsQuery } from '../../api-service/shelf/shelf.api';
import { useCreateBorrowMutation } from '../../api-service/book/borrow.api';


export default function BorrowModal({ isOpen, onClose, copies } : BorrowModalProps) {
  if (!isOpen) return null;
  
  const [selectedId, setSelectedId] = useState<number>(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [borrow, {isLoading}] = useCreateBorrowMutation({})

  const availableCopies =copies.filter((copy) => copy.is_available);
  console.log('Available Copies: ', availableCopies)

  const userId = Number(localStorage.getItem('userId'))
  console.log('User id : ', userId)

  const copyShelfIds : {shelfId: number, copyId : number}[] = availableCopies?.map((copy) => {
    const {data : bookCopy, isLoading} = useGetBooksCopyListQuery(copy?.id)
    isLoading ? console.log('Loading BookCopy details') : <></>
    return ({
      shelfId : bookCopy?.shelf?.id,
      copyId : copy?.id
    })
  })
  console.log('Shelf Details : ' , copyShelfIds)

  const shelves : ShelfType[] = copyShelfIds.map((shelf) => {
    const {data : bookShelf, isLoading} = useGetShelfDetailsQuery(shelf?.shelfId)
    isLoading ? console.log('Loading Book Shelf details') : <></>
    return ({
      id : shelf?.copyId,
      label : bookShelf?.label, 
      office : bookShelf?.office?.name
    })
  })
  console.log('Shelves :', shelves )

  const handleSelect = (id:number) => {
    setSelectedId(id);
    setSuccessMessage('');
  };

  const handleBorrow = async () => {
     const payload = {
      employeeId : userId,
      bookCopyId : selectedId
     }
     
     borrow(payload).unwrap()
     .then((response) => {
       console.log("Successfully borrowed :", response)
       onClose()
     }).catch((error) => {
        console.error(error)
     })

  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.7)]">
      <div className="bg-theme-light rounded-lg shadow-lg w-11/12 max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Select Office -  Shelf to Borrow</h2>

        <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
          {shelves.map(({ id, office, label }) => (
            <button
              key={id}
              className={`w-full border rounded p-3 text-left ${
                selectedId === id ? 'bg-blue-100 border-blue-400' : 'hover:bg-gray-100'
              }`}
              onClick={() => handleSelect(id)}
            >
              <div className="font-medium">{office}</div>
              <div className="text-sm text-gray-600">{label}</div>
            </button>
          ))}
         
        </div>

        {successMessage && (
          <div className="text-green-600 text-sm font-medium mb-3">{successMessage}</div>
          
        )}

        <div className='layout-center'>
            <div className="flex space-x-3 w-1/2">
                <Button
                    onClick={handleBorrow}
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
