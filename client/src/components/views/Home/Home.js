import React, {useEffect} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function Home(props) {
  useEffect(() => {
    axios.get('/api/home')
    .then(response => {
      console.log(response)
    });
  }, [])

  const onClickHandler = () => {
    axios.get('/api/users/logout')
    .then(response => {
      if (response.data.success) {
        props.history.push('/login');
      } else {
        console.log('Failed to logout: ', response.data);
        // alert('Failed to logout');
      }
    });
  };

  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      width: '100%', 
      height: '90vh'
    }}>
      <h1>Welcome!</h1>

      <button onClick={onClickHandler}>Logout</button>
    </div>
  );
}

export default withRouter(Home);
