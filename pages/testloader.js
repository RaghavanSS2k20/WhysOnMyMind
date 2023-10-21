import { useEffect, useState } from "react";
const [user, setUser] = useState("")
const testAuth = ()=>{
  useEffect(()=>{
    const getuser =  async ()=>{
        
    
    try{
      const resposne = await fetch("https://whyonm-api.onrender.com/getuser",{credentials:'include'});
      const data  = await resposne.json()
      setUser(data.user.email)
      
     

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