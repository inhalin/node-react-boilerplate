import React from 'react'

function Navbar() {
  return (
    <div>
      <ul>
        <li style={{ display: 'inline-block', paddingRight: '10px' }}><a href="/">홈</a></li>
        <li style={{ display: 'inline-block', paddingRight: '10px' }}><a href="/login">로그인</a></li>
        <li style={{ display: 'inline-block', paddingRight: '10px' }}><a href="/register">회원가입</a></li>
      </ul>
    </div>
  )
}

export default Navbar
