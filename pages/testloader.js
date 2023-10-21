import { useEffect, useState } from "react";

const testAuth = ()=>{
  const [user, setUser] = useState('')
  useEffect(()=>{
    const getuser =  async ()=>{
        
    
    try{
      const resposne = await fetch("https://whyonm-api.onrender.com/getuser",{credentials:'include'});
      const data  = await resposne.json()
      setUser(data.user.email || "poda punda")
      
     

    }catch(e){
      console.log('error in fetching data',e)
    }
  }
  getuser()
  },[])
  return(
    <>{user}</>
  )
}
export default testAuth