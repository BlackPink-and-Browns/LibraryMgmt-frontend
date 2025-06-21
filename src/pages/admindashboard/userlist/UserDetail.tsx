import React from 'react'
import { useParams } from 'react-router-dom'
import UserProfileCard from '../../../components/UserProfilecard'
import { useGetAllUserQuery, useGetUserBorrowHistoryByAdminQuery } from '../../../api-service/user/user.api'
import LoadingSpinner from '../../../components/LoadingSpinner'

const UserDetail = () => {
  const { userId } = useParams()
  console.log("userid",userId)
  const { data: userBorrow, isLoading } = useGetUserBorrowHistoryByAdminQuery( userId )
  console.log("userBorrow",userBorrow)

  const { data: userdata = [] } = useGetAllUserQuery({})

  const user = userdata.find((obj) => obj.id === Number(userId))

  
  if (isLoading) return <LoadingSpinner message='Loadin User Details' />
  if (!user) return <div className="text-center mt-10 text-gray-500">User not found.</div>
  return (
    <div className='flex flex-col w-full items-center gap-5'>
      <div className='w-3/4'>
        <UserProfileCard {...user} />
      </div>

      <div className='w-1/2 mt-4'>
        <h2 className="text-xl font-semibold mb-4">Borrow History</h2>
        {userBorrow?.book_history?.length === 0 ? (
          <p className="text-gray-500">No borrow history found.</p>
        ) : (
          <div className="space-y-4">
            {userBorrow?.book_history?.map((entry, idx) => {
              const book = entry.bookCopy.book
              const shelf = entry.bookCopy.shelf
              return (
                <div
                  key={idx}
                  className="flex items-start gap-4 border p-3 rounded-lg shadow-sm bg-white"
                >
                  <img
                    src={book.cover_image}
                    alt={book.title}
                    className="w-16 h-20 object-cover rounded-md"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-semibold text-purple-700">{book.title}</h3>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Status:</span> {entry.status}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Borrowed At:</span>{" "}
                      {new Date(entry.createdAt).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Returned At:</span>{" "}
                      {entry.returned_at
                        ? new Date(entry.returned_at).toLocaleString()
                        : "Not yet returned"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Shelf:</span> {shelf.label}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDetail
