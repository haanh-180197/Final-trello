import { useEffect, useState } from 'react'
import './App.css'
import Header from './component/Header'
import Body from './component/Body'
import ListSlice from './store/ListSlice'
import Sidebar from './component/SIdebar'

function App() {
  const [data, setData] = useState({
    tasks: {},
    columns: {},
    columnOrder: []
  })

  const [userAccount, setUserAccount] = useState({
    userId: [],
    dataId: {
    }
  })

  
  const [loginAccount, setLoginAccount] = useState({})
  console.log(data)
  console.log(userAccount)
  console.log(userAccount.userId)
  const handleLogin = (acc) => {
    setLoginAccount(acc);
  }
  const handleUpdateUser = (newUser) => {
    setUserAccount(({ userId }) => (
      {
        ...userAccount,
        userId: [...userAccount.userId, newUser]
      }
    ))
  }
  useEffect(() => {
    const getUser = userAccount.userId.find((acc) => acc.name === loginAccount.name && acc.password === loginAccount.password)
    if (getUser) {
      setUserAccount({
        ...userAccount,
        dataId:{
          ...userAccount.dataId,
          [getUser.id]: {...data}
        }
      })
    }
  }, [loginAccount, data])


  useEffect(() => {
    const downData = window.localStorage.getItem('trello');
    if (downData !== null) setUserAccount(JSON.parse(downData))
    const getUser = userAccount.userId.find((acc) => acc.name === loginAccount.name && acc.password === loginAccount.password)
    if (getUser){
      const selectData = userAccount.dataId[getUser.id];
      setData({ tasks: {},
        columns: {},
        columnOrder: [],
        ...selectData})
    }
  }, [loginAccount])


  useEffect(() => {
    window.localStorage.setItem('trello', JSON.stringify(userAccount))
  }, [data,userAccount])

  return (
    <ListSlice.Provider value={{ data, setData }}>
      <div>
        <Header />
        <div className='flex overflow-hidden'>
          <Sidebar handleUpdateUser={handleUpdateUser} allAccount={userAccount.userId} handleLogin={handleLogin}  />
          <Body />
        </div>
      </div>
    </ListSlice.Provider>
  )
}

export default App
