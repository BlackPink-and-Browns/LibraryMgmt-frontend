
import Button from '../../components/button/Button'
import Header from '../../components/Header'
import { Outlet, useNavigate } from 'react-router-dom'

const AdminLayout = () => {
    const navigate=useNavigate()
  return (
    <div>
      <div>
            <Header heading='Admin Dashboard' description='Welcome' >
                <Button
                type="button" 
                variant ={{ color : "primary", size : 'md'}}
                onClick={()=> navigate('/')}
            >
                Back to Home
            </Button>
            </Header>
      </div>
      <div>
            <Outlet></Outlet>
      </div>
    </div>
  )
}

export default AdminLayout
