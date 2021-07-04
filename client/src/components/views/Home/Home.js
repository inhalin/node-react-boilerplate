import React, {useEffect} from 'react';
import axios from 'axios';

function Home() {
  useEffect(() => {
    axios.get('/api/hello')
    .then(response => {console.log(response)});
  }, [])

  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      width: '100%', 
      height: '90vh'
    }}>
      <h1>Welcome!</h1>
    </div>
  )
}

export default Home
