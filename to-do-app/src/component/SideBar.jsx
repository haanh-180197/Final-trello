import React from 'react'
import Login from './Login'

const Sidebar = (props) => {
  const {handleUpdateUser, allAccount, handleLogin} =props;
  return (
    <div className='p-3 w-[300px] border bg-slate-200 siderbar '>
        
      <Login handleUpdateUser={handleUpdateUser} allAccount={allAccount} handleLogin={handleLogin} />
      
      </div>
  )
}

export default Sidebar