import React, {useEffect} from 'react';
import axios from 'axios';

function Home() {
  useEffect(() => {
    axios.get('/api/hello')
    .then(response => {console.log(response)});
  }, [])

  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home
