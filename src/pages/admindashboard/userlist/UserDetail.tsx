import React from 'react'
import { useParams } from 'react-router-dom'
import UserProfileCard from '../../../components/UserProfilecard'
import { borrowHistoryDb, userDb } from '../../../data'
import { BorrowHistory } from '../../../components'

const UserDetail = () => {
  const history=borrowHistoryDb
  const {userId}=useParams()
  const users=userDb
  const user=users.find((obj)=>obj.id===Number(userId))
  return (
    <div className='flex flex-col w-full  items-center gap-5'>
        <div className='w-3/4'>
          <UserProfileCard {...user}></UserProfileCard>
        </div>
        <div className='w-1/2  '>
          <BorrowHistory history={history} type={"admin"}/>
        </div>
      
      
    </div>
    
  )
}

export default UserDetail
