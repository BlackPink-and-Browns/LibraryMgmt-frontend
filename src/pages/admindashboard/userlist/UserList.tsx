import React from 'react'
import AdminItemTile from '../../../components/AdminItemTile'
import { userDb } from '../../../data'
import { useNavigate } from 'react-router-dom'
import { useGetAllUserQuery } from '../../../api-service/user/user.api'
import LoadingSpinner from '../../../components/LoadingSpinner'

const UserList = () => {
  const navigate=useNavigate()
  const{data:userDate,isLoading}=useGetAllUserQuery({})
  if (isLoading) return <LoadingSpinner message="Fetching users..." />;
  console.log("userdata",userDate)
  
  return (
     <div className="max-w-4xl mx-auto mt-10 space-y-4 bg-white p-5 shadow-md rounded-xl">
       <h2 className="text-2xl font-semibold mb-6 "> UserList</h2>
          {userDate?.map((user, index) => (
            <AdminItemTile item={user} type="user" onClick={() => navigate(`/admin/users/${user.id}`)} />

    
          ))}
    </div>
  )
}

export default UserList
