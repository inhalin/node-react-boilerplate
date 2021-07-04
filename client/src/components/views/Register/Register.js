import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

function Register(props) {
  const dispath = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("")
  const [Name, setName] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if(Password !== ConfirmPassword) {
      return alert('비밀번호가 일치하지 않습니다.')
    }

    let body = {
      email: Email,
      password: Password,
      name: Name,
    }

    dispath(registerUser(body))
    .then(response => {
      if(response.payload.success) {
        props.history.push('/login');
      } else {
        alert('회원가입 실패: ', response.payload);
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

        <label>Confirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

        <hr style={{ borderTop: '3px', width: "100%"}}/>

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
