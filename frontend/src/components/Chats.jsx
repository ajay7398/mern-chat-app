import React, { useEffect } from 'react'
import UserList from './UserList'

function Chats() {
  return (
   <div className='w-full flex flex-col gap-1 p-2 h-dvh  overflow-y-auto chat'>
<UserList/>

      </div>
  )
}

export default Chats
