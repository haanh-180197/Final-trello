import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useData } from '../store/ListSlice'

const Login = (props) => {
  const { handleUpdateUser, allAccount, handleLogin } = props
  const setList = useData().setData
  const Account = allAccount
  const [hide, setHide] = useState(true)
  const [account, setAccount] = useState({
    name: '',
    password: ''
  });
  // Lay dl tu input
  const handleChangeLogin = (e) => {
    const { value, name } = e.target;
    setAccount({ ...account, [name]: value })
  }

  // Login-
  const handleSubmit = (e) => {
    e.preventDefault();
    // khoang trong
    if (!account.name || !account.password) return

    const checkNameAcc = Account.findIndex(acc => acc.name === account.name);
    const checkPassAcc = Account.findIndex(acc => acc.password === account.password && acc.name === account.name )
    // Da co tai khoan or sai mk
    if (checkNameAcc >=0 && checkNameAcc === checkPassAcc ) {
      alert("Dang Nhap Thanh Cong")
      handleLogin({ ...account })
      setHide(false)
      setAccount({
        name: '',
        password: ''
      })
      return
    } else if (checkNameAcc >= 0) {
      alert("Sai Password")
      setAccount({
        name: '',
        password: ''
      })
      return
    }
    const newAccount = {
      ...account,
      id: uuidv4(),
    }
    handleUpdateUser(newAccount)
    alert("Dang Ky Thanh Cong Account")
    setAccount({
      name: '',
      password: ''
    })
  }

  // out
  const handleOut = () => {
    handleLogin({
    })
    setList({
      tasks: {},
      columns: {},
      columnOrder: []
    })
    setHide(true)
  }

  const { name, password } = account
  return (
    <div className='login-container'>
      <div className='title'>
        log in
      </div>
      <div className='text'>
        email or username
      </div>
      <input className='login-input' type="text" placeholder='Email@...' value={name} name='name' onChange={handleChangeLogin} />
      <input className='login-input' type="password" placeholder='Password...' value={password} onChange={handleChangeLogin} name='password' />
      <button type='submit' className={`login-button  ${name && password && 'login-active'} ${hide ? '' : 'hide-button'}`} onClick={handleSubmit}>Login</button>
      <button type='submit' className={`login-button  ${name && password && 'login-active'} ${hide ? 'hide-button' : ''}`} onClick={handleOut}>Logout</button>
    </div>
  )
}

export default Login