import { useEffect } from "react";
import axios from 'axios';

function App() {


  const callApi=async()=>{
    const {data}= await axios.get("http://localhost:7500/")

    console.log('data',data);

  }

  useEffect(() => {

    callApi()
    
     
  }, [])


  return (
    <>
      <div>hello</div>
    </>
  );
}

export default App;
