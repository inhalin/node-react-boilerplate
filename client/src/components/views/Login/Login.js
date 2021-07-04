import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';

function Login(props) {
  const dispatch = useDispatch();

  // email을 위한 state
  const [Email, setEmail] = useState("");

  // password를 위한 state
  const [Password, setPassword] = useState("");

  // email의 state 변경
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  // password의 state 변경
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  // form의 state 변경
  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
    .then(response => {
      if(response.payload.loginSuccess) {
        props.history.push('/')
      } else {
        alert(response.payload);
      }
    })

  };

  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      width: '100%', 
      height: '90vh'
    }}>
      <form 
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
