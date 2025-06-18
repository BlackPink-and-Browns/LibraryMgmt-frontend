import { CirclePlus, List } from "lucide-react"
import StatCard from "../../../components/statcard"
import { Outlet, useNavigate } from "react-router-dom"
import { useGetShelfCountQuery } from "../../../api-service/shelf/shelf.api"

const Shelf = () => {
  const navigate=useNavigate()

  return (
    <div className='flex flex-col gap-2 overflow-auto '>
      <div className='flex  sticky top-0 z-50  justify-center gap-10'>
          <StatCard title='List Shelves' value={""} icon={List} onClick={()=>navigate("/admin/shelf/shelf-list")}></StatCard>
          <StatCard title='Add Shelves' value={""} icon={CirclePlus} onClick={()=>navigate("/admin/shelf/add-shelf")}></StatCard>          
      </div>
      <div>
          <Outlet></Outlet>
      </div>
    </div>
  )
}

export default Shelf
