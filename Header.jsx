import React from 'react'

const Header = (props) => {
  const {loginAccount} = props
  return (
    <div className='App-header p-3 border bg-blue-100'>
        {!loginAccount.name ? `Chao Mung Ban Den Voi Trello Clone` : `Trello cua ban: ${loginAccount.name}`}
    </div>
  )
}

export default Header