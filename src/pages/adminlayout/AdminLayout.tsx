

import { Button, Header } from "../../components";

import { Outlet, useNavigate } from 'react-router-dom'
import "./AdminLayout.css"

const AdminLayout = () => {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-purple-50 '>
      {/* Sticky Header */}
    
      <Header heading='Admin Dashboard' description='Welcome'>
        <Button
          type="button"
          variant={{ color: "primary", size: 'md' }}
          onClick={() => navigate('/admin')}
        >
          Back to Dashboard
        </Button>
      </Header>

      {/* Scrollable Content */}
      <div className='flex-1 overflow-y-auto px-50 py-6'>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
